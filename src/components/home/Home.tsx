/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import './Home.scss';
import { RestaurantSection } from '../restaurant-section/RestaurantSection';
import { IRestaurant, IRestaurantGrade } from '../../@types/restaurant';
import { LookupRestaurantsArgs } from '../../@types/RealmMethods';
import { Form } from 'react-bootstrap';

export default function Home() {
  const [restaurants, setrestaurants] = useState<IRestaurant[] | null>(null);
  const [grade, setGrade] = useState<IRestaurantGrade | null>(null);
  const [user, setUser] = useState<Realm.User | null>(null);
  const realmApp = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID });

  useEffect(() => {
    async function getData() {
      try {
        let realmUser :Realm.User | null = null;
        if(!user){
          realmUser = await realmApp.logIn(Realm.Credentials.anonymous());
          setUser(realmUser);
        }

        const projection: LookupRestaurantsArgs["projection"] = {
          _id: 1,
          name: 1,
          borough: 1,
          cuisine: 1,
          address: 1,
          grades: grade ? {$elemMatch: {grade: grade}} : 1
        };

        const results: IRestaurant[] = await (user||realmUser)?.functions.lookupRestaurants({
          projection,
          grade,
          limit: 25,
          asJSON: true
        } as LookupRestaurantsArgs);
        setrestaurants(results)
      }
      catch (err) {
        console.error(err);
      }
    }
    getData();
  }, [grade])

  return (
    <div className="container">
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Find Restaurants</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-3">Select Restraunt grade to filter by</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <div className="col-lg-4 col-sm-12">
              <Form.Select className="text-center" onChange={(e) =>{
                setrestaurants(null);
                setGrade(e.target.value as unknown as IRestaurantGrade|| null)
              }}>
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

      <RestaurantSection restaurants={restaurants}/>
    </div>
  );
}
