import { IRestaurantGrade, IRestaurant } from "../../@types/restaurant";
import { QueryProjection } from "../../@types/util";

export interface LookupRestaurantsArgs{
    projection ?:QueryProjection<IRestaurant>
    grade ?:IRestaurantGrade | ""
    limit ?:number
    asJson ?:boolean
}

export interface SearchRestarauntsArgs{
    searchTerm :string
    limit ?:number
    asJson ?:boolean
}