import React from 'react';
import { Header, Card, Dimmer, Loader, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import {img} from '../assets/placeholder.json'

function Listings(props) {

  const { loading, data } = useQuery(FETCH_INVENTORY_QUERY);

  const categorySelected = props.location.state ? props.location.state.category : 'All Inventory';

  return (
    <div>
      <Header>{categorySelected}</Header>
      {!data ? (
        <Loader active/>
      ) : 
      <Card.Group itemsPerRow={window.innerWidth >= 650 ? '4':'2'}>
      {data.getInventory.filter((item) => {
          if(categorySelected == 'All Inventory') {
            return item == item;
          } else {
            return item.category == categorySelected;
          }
        }).map((item, i) => {
          return (
            <Card
              as={Link}
              to={{
                pathname: '/rentalpage',
                state: {
                  item: item.item
                }
              }}
              key={i}
            >
              <Image size='medium' src={img}/>
              <Card.Content>
                <Card.Header>{item.item}</Card.Header>
                <Card.Description>
                  Tier {item.level} item
                </Card.Description>
              </Card.Content>
            </Card>
          );
        })
      }
      </Card.Group>
    }
    </div>
  );
}

const FETCH_INVENTORY_QUERY = gql`
  {
    getInventory{
      item
      quantity
      level
      description
      link
      category
    }
  }
`

export default Listings;