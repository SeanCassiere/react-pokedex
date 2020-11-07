import React, { Component } from 'react';

import axios from 'axios';

import PokemonCard from '../pokemon/PokemonCard';

export default class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/",
      groupName: '',
      pokemonSpecies: [],
      foundGroup: false
    }
  }

  async componentDidMount() {
    const { groupName } = this.props.match.params;
    const res = await axios.get(`https://pokeapi.co/api/v2/egg-group/${groupName.toLowerCase()}`);
    const pokemonSpecies = res.data['pokemon_species'];
    if ((res.status === 200)) {
      this.setState({
        groupName,
        pokemonSpecies,
        foundGroup: true
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.foundGroup ? (
          <>
          <div className="row">
            <h1 className="col-12">{this.state.groupName}</h1>
          </div>
          <div className="row">
            { this.state.pokemonSpecies.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            )) }
          </div>
          </>
        ) : (
          <h1>This group does not exist.</h1>
        )}
      </div>
    )
  }
}
