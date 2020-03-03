import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function RentalPage(props) {

  console.log('name',props.location.state.item)
  //const { loading, data } = useQuery(GET_ITEM, variables: {"item":props.location.state.item});

  //console.log(data);

  return (
    <div>
      <h1>test</h1>
    </div>
  );
}

const GET_ITEM = gql`
  query getItem(
    $item: String!
  ){
    getItem(
      item: $name
    ){
      item
      quantity
      level
      description
      link
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