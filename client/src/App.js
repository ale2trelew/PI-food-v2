import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import Home from './Pages/Home/Home';
import Details from './Components/Details/Details';
import { RecipeCreate } from './Components/Form/Form';
import { NavBar } from './Components/NavBar/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/recetas' component={Home} />
        <Route path='/create' component={RecipeCreate} />
        <Route exact path='/recetas/:id' component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
