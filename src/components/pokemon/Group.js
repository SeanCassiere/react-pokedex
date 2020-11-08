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
    //console.log(groupName)
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/egg-group/${groupName.toLowerCase()}`);
      const pokemonSpecies = res.data['pokemon_species'];
      if ((res.status === 200)) {
        this.setState({
          foundGroup: true,
          groupName,
          pokemonSpecies
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>

        {/*}
        {this.state.foundGroup ? (
          <>
          
          
          <div className="row">
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
        ) : (
          <div className="row">
            <div className="col">
              <h3 className="text-muted">We had trouble finding the group.</h3>
            </div>
          </div>
        )}
        */}
      </div>
    )
  }
}
