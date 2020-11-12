import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/layout/NavBar' /* webpackChunkName: "navbar" */;
import Loading from './components/layout/Loading'  /* webpackChunkName: "loadingBadge" */;
const Dashboard = lazy(() => import('./components/layout/Dashboard' /* webpackChunkName: "dashboard" */));
const PokemonProfile = lazy(() => import('./components/pokemon/PokemonProfile' /* webpackChunkName: "pokemonProfile" */));
//const Group = lazy(() => import('./components/pokemon/Group' /* webpackChunkName: "groupSearch" */));
const EggGroup = lazy(() => import('./components/layout/EggGroup' /* webpackChunkName: "EggGroup" */));
const PathNotFound = lazy(() => import('./components/layout/PathNotFound' /* webpackChunkName: "err404" */));


class App extends Component {
  // <Route path="/group/:groupName" component={Group} />
  render() {
    return (
      <div className="App bg-dark min-vh-100 h-100">
        <div className="container">
        <Router>
        <NavBar />
          <Suspense fallback={
            <Loading textItem="Loading..." titleText="Loading Pokedex" />
          }>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemon/:pokemonIndex" component={PokemonProfile} />
              <Route path="/group/:eggGroupName" component={EggGroup} />
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
