/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import { RestaurantSection } from '../restaurant-section/RestaurantSection';
import { IRestaurant, IRestaurantGrade } from '../../@types/restaurant';
import { LookupRestaurantsArgs } from '../../realm/@types/RealmMethods';
import { Form } from 'react-bootstrap';
import { debounce } from 'lodash';
import { lookupRestaurants, searchRestaraunts } from '../../realm/methods';

export default function Home() {
    const [restaurants, setRestaurants] = useState<IRestaurant[] | null>(null);
    const [grade, setGrade] = useState<IRestaurantGrade | "">("");
    const [user, setUser] = useState<Realm.User | null>(null);
    const [search, setSearch] = useState<string>("");

    const realmApp = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID });
    const projection: LookupRestaurantsArgs["projection"] = {
        _id: 1,
        name: 1,
        borough: 1,
        cuisine: 1,
        address: 1,
        grades: grade ? { $elemMatch: { grade: grade } } : 1
    };

    const debouncedSave = useCallback(
        debounce(async value => {
            const results = await searchRestaraunts(user, value);
            return setRestaurants(results);
        }, 1000),
        [user],
    );

    const handleInput = (e: any) => {
        const { value } = e.target;
        if(value){
            setSearch(value);
            setRestaurants(null);
            setGrade("");
            debouncedSave(value);
        } else {
            setSearch("");
        }
    }
    
    useEffect(() => {
        async function getData() {
            try {
                let realmUser: Realm.User;
                if (!user) {
                    realmUser = await realmApp.logIn(Realm.Credentials.anonymous());
                    setUser(realmUser);
                } else {
                    const results = await lookupRestaurants({ user: user, projection, grade });
                    setRestaurants(results);
                }
            } catch (err) {
                console.error(err);
            }
        }
        getData();
    }, [grade, user, (search === "")])

    return (
        <div className="container">
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-5 fw-bold">Find Restaurants</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-3">Either search restaurants by name or filter by grade</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <div className="col-lg-8 col-sm-12">
                            <Form.Control type="text" placeholder="Search for a restaurant by name..." onChange={handleInput} value={search} />
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <Form.Select className="text-center" onChange={(e) => {
                                setRestaurants(null);
                                setGrade(e.target.value as unknown as IRestaurantGrade || null)
                                setSearch("");
                            }} value={grade as string}>
                                <option value="">Show All Grades</option>
                                <option value="A">A Grades</option>
                                <option value="B">B Grades</option>
                                <option value="C">C Grades</option>
                                <option value="D">D Grades</option>
                                <option value="F">F Grades</option>
                            </Form.Select>
                        </div>
                    </div>
                </div>
            </div>

            <RestaurantSection restaurants={restaurants} />
        </div>
    );
}
