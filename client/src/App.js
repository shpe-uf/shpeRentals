import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './pages/Home';
import Listings from './pages/Listings';
import RentalPage from './pages/RentalPage';
import Header from './components/Header';
import Pathing from './components/Pathing';

function App() {

  const {crumbs, setCrumbs } = useState([]);

  function breadCrumbAdd() {

  }

  function breadCrumbSet() {

  }

  return (
    <Router>
      <Container>
        <Header/>
        <Divider/>
        <Pathing crumbs={crumbs}/>
        <Route exact path='/' component={Home}/>
        <Route path='/listings' component={Listings}/>
        <Route path='/rentalpage' component={RentalPage} />
      </Container>
    </Router>
  );
}

export default App;
