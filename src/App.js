import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/layout/NavBar';
import Loading from './components/common/Loading';
const Dashboard = lazy(() => import('./components/layout/Dashboard'));
const Pokemon = lazy(() => import('./components/pokemon/Pokemon'));
const Group = lazy(() => import('./components/pokemon/Group'));
const PathNotFound = lazy(() => import('./components/layout/PathNotFound'));


class App extends Component {
  render() {
    return (
      <div className="App bg-dark min-vh-100 h-100">
        <div className="container">
        <Router>
        <NavBar />
          <Suspense fallback={
            <Loading textItem="Loading..." />
          }>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
              <Route path="/group/:groupName" component={Group} />
              <Route path="/*" component={PathNotFound} />
            </Switch>
          </Suspense>
        </Router>
        </div>
      </div>
    );
  }
}

export default App;
