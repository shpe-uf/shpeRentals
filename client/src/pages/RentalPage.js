import React, { useState } from 'react';
import { Grid, Divider, Container, Statistic, Input, Button, Header, Loader } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {img} from '../assets/placeholder.json'

import RentalModal from '../components/RentalModal'

function RentalPage(props) {

  const [ rentAmount, setRentAmount ] = useState(0);
  const [ canRent, setCanRent ] = useState(false);
  const [ rentWindowActive, setRentWindowActive ] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_ITEM, { variables: {item:props.location.state.item}});

  function quantityChanged(e) {
    if(e.target.value <= data.getItem.quantity - data.getItem.renters.length && e.target.value > 0) {
      setRentAmount(e.target.value);
      setCanRent(true);
    } else {
      setCanRent(false);
    }
  }

  return (
    !data ? <Loader active/> :
    <div style={styles.itemPageContainer}>
      <div style={styles.imgContainer}>
        <img src={img}/>
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.tierLabel}>
          Tier {' ' + data.getItem.level}
        </div>
        <Header>
          {data.getItem.item}
        </Header>
        <p>
          {data.getItem.description}
        </p>
        <div>
          <Statistic
            value={data.getItem.quantity - data.getItem.renters.length}
            label='In Stock'
          />
          <Input 
            label='Number to rent' 
            placeholder='0'
            onChange={quantityChanged}/>
          <Button primary disabled={!canRent} onClick={() => setRentWindowActive(true)}>
            Rent
          </Button>
        </div>
      </div>
      <RentalModal numberOfItems={rentAmount} renting={rentWindowActive} itemData={data.getItem} doneRenting={() => {refetch(); setRentWindowActive(false);}}/>
    </div>
  );
}

const styles = {
  itemPageContainer : {
    display: 'flex',
    flexDirection: 'row'
  },
  imgContainer: {

  },
  contentContainer: {

  },
  tierLabel: {

  }
}

const GET_ITEM = gql`
  query getItem(
    $item: String!
  ){
    getItem(
      item: $item
    ){
      item
      quantity
      level
      description
      link
      renters
    }
  }
`;

const CHECK_OUT_INVENTORY = gql`
  mutation checkOut(
    $item: String!
    $username: String!
    $numberOfItems: Int!
  ) {
    checkOut(
      item: $item
      username: $username
      numberOfItems: $numberOfItems
    ) {
      username,
      item,
      dateOpened
    }
  }
`;

export default RentalPage;