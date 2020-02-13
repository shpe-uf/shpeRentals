import React from 'react';
import { Menu, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function CategoryList(props) {
  return (
    <Menu vertical fluid>
      {props.categories.map((category, i) => {
        return (
          <Menu.Item
            name={category.name}
            as={Link}
            to="/listings"
            key={i}
          >
            <Header>{category.name}</Header>
            <p>{category.description}</p>
          </Menu.Item>
        )
      })}
    </Menu>
  );
}

export default CategoryList;