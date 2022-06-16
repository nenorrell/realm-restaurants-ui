import React, { FC, useEffect, useRef, useState } from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

export const Dashboard: FC = () => {
    const sdk = new ChartsEmbedSDK({ baseUrl: 'https://charts.mongodb.com/charts-testing-grounds-nddfk' });
    const dashboardRef = useRef<HTMLElement>(null);
    const [rendered, setRendered] = useState(false);
    const [mongoDashboard] = useState(sdk.createDashboard({
        dashboardId: 'c8fb9593-3d7d-4e4e-8613-a344968ffc1a',
        heightMode: "scale",
        widthMode: "scale",
        background: "#ffffff"
    }));

    useEffect(() => {
        if(dashboardRef.current){
            mongoDashboard.render(dashboardRef.current)
            .then(() => setRendered(true))
            .catch(err => console.log("Error during Charts rendering.", err));
        }
      }, [mongoDashboard]);

    return (
        <div className='container'>
            <div style={{"height": "100vh"}} className="my-5" ref={dashboardRef as React.RefObject<HTMLDivElement>}>
            </div>
        </div>
    );
}