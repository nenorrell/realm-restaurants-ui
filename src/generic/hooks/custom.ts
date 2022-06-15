import { debounce, throttle } from "lodash";
import { useCallback, useEffect, useRef } from "react";

export function useThrottle(cb: Function, delay: number) {
    const cbRef = useRef(cb);

    // use mutable ref to make useCallback/throttle not depend on `cb` dep
    useEffect(() => { cbRef.current = cb; });
    return useCallback(
        throttle((...args) => cbRef.current(...args), delay, {
            leading: true,
            trailing: false
        }), [delay]
    );
}

export function useIsMounted() {
    const isMountedRef = useRef(true);
    useEffect(() => {
      return () => {
        isMountedRef.current = false;
      };
    }, []);
    return () => isMountedRef.current;
  }

export function useDebounce(cb :Function, delay :number) {
    const isMounted = useIsMounted();
    const inputsRef = useRef({ cb, delay }); // mutable ref like with useThrottle
    useEffect(() => { inputsRef.current = { cb, delay }; }); //also track cur. delay
    return useCallback(
        debounce((...args) => {
            if (inputsRef.current.delay === delay && isMounted())
                inputsRef.current.cb(...args);
        }, delay, {
            leading: false,
            trailing: true
        }),
        [delay, debounce]
    );
}