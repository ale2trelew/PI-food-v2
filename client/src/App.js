import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;
