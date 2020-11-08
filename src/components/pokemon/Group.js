import React, { Component } from 'react';

import axios from 'axios';

import PokemonCard from './PokemonCard';

export default class PokemonList extends Component {  
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
      //console.log(res.status)
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
      <>
        {!this.state.loading ? (
          <div className="row">
            <div className="col-12">
              {/* 
              <h3 className="badge badge-warning p-3">Egg Group:&nbsp;
                {
                  this.state.groupName
                    .toLowerCase()
                    .split(' ')
                    .map(
                      letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                    ).join(' ')
                }
              </h3>
              */}
              
            </div>
            <div className="row">
              <div className="col-12">
                <div className="row"  style={{marginTop: '2rem'}}>
                  {this.state.pokemonSpecies.map(pokemon => (
                    <PokemonCard
                      key={pokemon.name}
                      name={pokemon.name}
                      url={pokemon.url}
                    />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        ) : this.state.foundGroup ? (
            <div className="row" style={{paddingTop: '35vh'}}>
              <div className="col-12 text-center">
                <h3 className="text-muted">Searching...</h3>
              </div>
            </div>
        ) : (
            <div className="row" style={{paddingTop: '35vh'}}>
              <div className="col-12 text-center">
                <h3 className="text-muted">Sorry, we couldn't find an Egg Group called "{this.state.groupName}".</h3>
                <hr />
                <h5 className="text-muted">Please make sure you search for a valid Egg Group.</h5>
              </div>
            </div>
          )
        }
      </>
    )
  }
}
