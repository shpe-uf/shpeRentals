import React from 'react';
import { Grid } from 'semantic-ui-react';
import CategoryList from '../components/CategoryList';

import categories from '../assets/categories.json'

function Home() {

  return (
    <div>
      <Grid columns={2} divided>
        <Grid.Column>
          <CategoryList categories={categories.categories}/>
        </Grid.Column>
        <Grid.Column>
          
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Home;