import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import Home from './Pages/Home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/recetas' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
