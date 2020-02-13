import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function RentalPage() {

  const { loading, data } = useQuery(FETCH_INVENTORY_QUERY);

  const itemIndex = window.location.pathname.split("/").pop();
  var rentalItem = {};

  if(data) {
    rentalItem = data.getInventory[itemIndex];
  }

  return (
    <div>
      <h1>{rentalItem.item}</h1>
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

export default RentalPage;