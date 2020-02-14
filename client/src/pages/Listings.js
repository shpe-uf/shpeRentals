import React from 'react';
import { Header, Card, Dimmer, Loader, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import {img} from '../assets/placeholder.json'

function Listings(props) {

  const { loading, data } = useQuery(FETCH_INVENTORY_QUERY);

  function itemSelect(e){
    // localStorage.setItem('inventory', JSON.stringify(data));
    console.log(e.item);
  };

  return (
    <div>
      <Header>Category</Header>
      <Card.Group>
          {loading ? (
            <div></div>
          ) : (
            data.getInventory.map((item, i) => {
              return (
                <Card
                  as={Link}
                  to={"/rentalpage/"+ i}
                  key={i}
                >
                  <img src={img}/>
                  <Card.Content>
                    <Card.Header>{item.item}</Card.Header>
                    <Card.Description>
                      Tier {item.level} item
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })
          )}
          
      </Card.Group>
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
    }
  }
`

export default Listings;