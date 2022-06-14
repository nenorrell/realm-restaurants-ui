import React, { FC } from 'react';
import { Card, Image } from 'react-bootstrap';
import { IRestaurant } from '../../@types/restaurant';
import { Restaurant } from '../restaurant/Restaurant';
import RestaurantIcon from './restaurant-icon.svg';

export const RestaurantSection: FC<{ restaurants: IRestaurant[] | null }> = ({ restaurants }) => {
  return (
    <div className="row">
      {
        restaurants ?
          restaurants.length ?
            restaurants.map((restaurant, i) => <Restaurant key={i} restaurant={restaurant} />)
            :
            <Card>
              <Card.Body className="text-center my-3">
                <h3 className="my-0">No restaurants were found</h3>
                <Image src={RestaurantIcon} alt="Restaurant icon" className="img-fluid" width="300px" />
              </Card.Body>
            </Card>
          :
          [...Array(25).keys() as any].map((r, i) => <Restaurant key={i} />)
      }
    </div>
  );
}