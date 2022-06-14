import { Digit } from "./util"

interface IRestaurantAddress {
    building :`${number}`
    coord :[number, number]
    street :string
    zipcode :string
}

export interface IRestaurantGrade {
    date: "2014-10-06T00:00:00.000Z"
    grade :"A" | "B" | "C" | "D" | "F"
    score :Digit
}

export interface IRestaurant {
    _id :string,
    address :IRestaurantAddress
    borough :string
    cuisine :string
    name :string
    grades ?:IRestaurantGrade[]
}