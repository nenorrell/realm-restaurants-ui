import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { IRestaurant } from '../../@types/restaurant';
import { Restaurant } from '../restaurant/Restaurant';

export const RestaurantSection: FC<{ restaurants: IRestaurant[] | null }> = ({ restaurants }) => {
  return (
    <div className="row">
      {
        restaurants ?
          restaurants.length ?
            restaurants.map((restaurant, i) => <Restaurant key={i} restaurant={restaurant} />)
            :
            <Card>
              <Card.Body className='text-center'>
                <p>No Restraunts were found</p>
              </Card.Body>
            </Card>
          :
          [...Array(25).keys() as any].map((r, i) => <Restaurant key={i} />)
      }
    </div>
  );
}