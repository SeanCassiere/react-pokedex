import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/layout/NavBar';
const Dashboard = lazy(() => import('./components/layout/Dashboard'));
const Pokemon = lazy(() => import('./components/pokemon/Pokemon'));
const Group = lazy(() => import('./components/pokemon/Group'));


class App extends Component {
  render() {
    return (
      <div className="App bg-dark">
        <NavBar />
        <div className="container">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
              <Route exact path="/group/:groupName" component={Group} />
            </Switch>
          </Suspense>
        </Router>
        </div>
      </div>
    );
  }
}

export default App;
