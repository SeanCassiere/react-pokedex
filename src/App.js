import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/layout/NavBar';
import Dashboard from './components/layout/Dashboard';
const Pokemon = React.lazy(() => import('./components/pokemon/Pokemon'));
const Group = React.lazy(() => import('./components/pokemon/Group'));


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
                <Route exact path="/group/:groupName" component={Group} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
