import React, { Component } from 'react';

import axios from 'axios';

import PokemonCard from './PokemonCard';

export default class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/",
      nextUrl: '',
      prevUrl: '',
      pokemon: null
    }
  }

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({
      pokemon: res.data['results'],
      prevUrl: res.data.previous,
      nextUrl: res.data.next
    });
  }

  /*
  nextPage(nextUrl) {
    this.setState({ url: nextUrl });
  }
  */
//onClick={this.nextPage(this.state.nextUrl)}
  render() {

    return (
      <>
        { this.state.pokemon ? (
          <div className="row">
            { this.state.pokemon.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            )) }
            <button>Next</button>
            
          </div>
        ) : (
          <h1>Loading Pokemon</h1>
        ) }
      </>
    )
  }
}
