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
      loading: true,
      foundGroup: true
    }
  }

  async componentDidMount() {
    const { groupName } = this.props.match.params;
    this.setState({ groupName });
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/egg-group/${groupName.toLowerCase()}`);
      console.log(res.status)
      const pokemonSpecies = res.data['pokemon_species'];
      
      if ((res.status === 200)) {
        this.setState({
          loading: false,
          //groupName,
          pokemonSpecies
        });
      }
    } catch (error) {
      const e = error;
      if (e.response.status === 404) {
        this.setState ({
          foundGroup: false
        });
      }
    }
  }

  render() {
    return (
      <div className="row">
        <div className="group-results">
          {!this.state.loading ? (
            <>
              <div className="col-12 badge badge-warning">
                <h1>
                  {
                    this.state.groupName
                      .toLowerCase()
                      .split(' ')
                      .map(
                        letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                      ).join(' ')
                  }
                </h1>
              </div>
              <div className="row" style={{marginTop: '2rem'}}>
                { this.state.pokemonSpecies.map(pokemon => (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                  />
                )) }
              </div>
            </>
          ) :  this.state.foundGroup ? (
            <div className="row">
              <div className="col">
                <h3 className="text-muted">Loading...</h3>
              </div>
            </div>
            ) : (
            <div className="row">
              <div className="col">
                <h3 className="text-muted">Sorry, we couldn't find " {this.state.groupName} ".</h3>
              </div>
            </div>
            )
          }
        </div>
      </div>
    )
  }
}
