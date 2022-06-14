export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface ObjectOfAnything{
    [key :string] :any
}

export type QueryProjection<T> = Partial<Record<keyof T, 0|1|ObjectOfAnything>>