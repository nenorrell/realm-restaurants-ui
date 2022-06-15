import { LookupRestaurantsArgs, SearchRestarauntsArgs } from "./@types/RealmMethods";
import { IRestaurant } from "../@types/restaurant";

export async function searchRestaraunts(user: Realm.User | null, value: string) :Promise<IRestaurant[]> {
    try {
        return await user?.functions.searchRestaurants({
            limit: 25,
            asJSON: true,
            searchTerm: value
        } as SearchRestarauntsArgs);
    }
    catch(err) {
        console.error(err);
        throw err
    }
}

interface ILookupRestaurants extends LookupRestaurantsArgs { user :Realm.User }
export async function lookupRestaurants({user, grade, projection}:ILookupRestaurants) :Promise<IRestaurant[]>{
    try {
        return await user.functions.lookupRestaurants({
            projection,
            grade,
            limit: 25,
            asJSON: true
        } as LookupRestaurantsArgs);
    }
    catch(err) {
        throw err;
    }

}