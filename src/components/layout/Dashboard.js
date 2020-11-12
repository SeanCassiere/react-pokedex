import React, { Component } from 'react';

import { Helmet } from 'react-helmet';

import PokemonList from '../pokemon/PokemonList'/* webpackChunkName: "pokemonList" */;

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
