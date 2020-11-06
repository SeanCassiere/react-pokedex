import React, { Component } from 'react';

import axios from 'axios';

import PokemonCard from './PokemonCard';

export default class PokemonList extends Component {
  state = {
    url: '',
    nextUrl: '',
    prevUrl: '',
    pokemon: null
  }
  
  constructor(props) {
    super(props);
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/",
      nextUrl: '',
      prevUrl: '',
      pokemon: null
    }
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({
      pokemon: res.data['results'],
      prevUrl: res.data.previous,
      nextUrl: res.data.next
    });
  }

  async handleNextPageClick() {
    if (this.state.nextUrl !== null) {
      const res = await axios.get(this.state.nextUrl);
      this.setState({
        pokemon: res.data['results'],
        prevUrl: res.data.previous,
        nextUrl: res.data.next
      });
    }
  }

  async handlePrevPageClick() {
    if (this.state.prevUrl !== null) {
      const res = await axios.get(this.state.prevUrl);
      this.setState({
        pokemon: res.data['results'],
        prevUrl: res.data.previous,
        nextUrl: res.data.next
      });
    }
  }

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
            <button onClick={() => {this.handlePrevPageClick()}}>Back</button>
            <button onClick={() => {this.handleNextPageClick()}}>Next</button>
            
          </div>
        ) : (
          <h1>Loading Pokemon</h1>
        ) }
      </>
    )
  }
}
