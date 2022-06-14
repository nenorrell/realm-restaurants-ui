import { IRestaurantGrade, IRestaurant } from "./restaurant";
import { QueryProjection } from "./util";

export interface LookupRestaurantsArgs{
    projection ?:QueryProjection<IRestaurant>,
    grade ?:IRestaurantGrade,
    limit ?:number,
    asJson ?:boolean
}