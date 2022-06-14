import React, { FC } from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import { IRestaurant } from '../../@types/restaurant';
import './Restaurant.scss';

export const Restaurant :FC<{restaurant ?:IRestaurant}> = ({restaurant}) => {
  const randomNum :number = Math.round((Math.floor(Math.random() * 999999) + 1) / 10) * 10;
  
  return (
      <div className="col-lg-3 col-sm-12 mb-5">
        <Card>
          <Card.Body>
            {
              restaurant ? 
                <Card.Img className="mb-3" variant="top" src={`https://picsum.photos/200?random=${randomNum}`} />
              :
              <Placeholder animation="glow">
                <Placeholder lg={12} className="card-img-top mb-3 placeholder-image" />
              </Placeholder>
            }
            <Card.Text>
                <p>{restaurant?.name || <Placeholder animation="glow"><Placeholder lg={8}/></Placeholder>}</p>
                <p>{
                  restaurant?.grades?.[0].grade ? `Grade: ${restaurant?.grades?.[0].grade}`
                  :
                  <Placeholder animation="glow"><Placeholder lg={6}/></Placeholder>
                }</p>
                {
                  restaurant ?
                    <>
                      <p className="mb-0">{`${restaurant?.address.building} ${restaurant?.address.street}`}</p>
                      <p>{`${restaurant?.borough}, NY ${restaurant?.address.zipcode}`}</p>
                    </>
                    :
                    <>
                    <p className="mb-0"><Placeholder animation="glow"><Placeholder lg={6}/></Placeholder></p>
                    <p><Placeholder animation="glow"><Placeholder lg={4}/></Placeholder></p>
                    </>
                }
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
  );
}