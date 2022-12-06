import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import Home from './Pages/Home/Home';
import Details from './Components/Details/Details';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/recetas' component={Home} />
        <Route exact path='/recetas/:id' component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
