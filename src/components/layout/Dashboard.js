import React, { Component } from 'react';
import PokemonList from '../pokemon/PokemonList';
import { Helmet } from 'react-helmet';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <Helmet>
          <title>React Pokedex</title>
        </Helmet>
        <div className="col">
          <PokemonList />
        </div>
      </div>
    )
  }
}
