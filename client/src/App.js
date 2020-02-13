import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Divider } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './pages/Home';
import Listings from './pages/Listings';
import RentalPage from './pages/RentalPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Container>
        <Header/>
        <Divider/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/listings' component={Listings}/>
        <Route path='/rentalpage' component={RentalPage} />
      </Container>
    </Router>
  );
}

export default App;
