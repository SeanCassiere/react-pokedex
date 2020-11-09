import React, { Component } from 'react';

import axios from 'axios';

import queryString from 'query-string'

import PokemonCard from './PokemonCard';

export default class PokemonList extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/",
      groupName: '',
      pokemonSpecies: [],
      loading: true,
      foundGroup: true,
      prevPage: false,
      prevPageId: ''
    }
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  async componentDidMount() {
    const { groupName } = this.props.match.params;
    const searchParams = queryString.parse(this.props.location.search);
    if (this.isEmpty(searchParams) === false) {
      //console.log(this.isEmpty(searchParams))
    }
    
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
          <div className="row" style={{paddingBottom: '2rem'}}>
            <div className="col-12">
              <p className="badge badge-warning p-3" style={{fontSize: '1.6rem'}}>Egg Group:&nbsp;
                {
                  this.state.groupName
                    .toLowerCase()
                    .split(' ')
                    .map(
                      letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                    ).join(' ')
                }
              </p>
            </div>
              <div className="col-12">
                <div className="row"  style={{marginTop: '0.5rem'}}>
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
        ) : this.state.foundGroup ? (
            <div className="row" style={{paddingTop: '35vh'}}>
              <div className="col-12 text-center">
                <p className="badge badge-warning p-3" style={{fontSize: '1.6rem'}}>Searching...</p>
              </div>
            </div>
        ) : (
            <div className="row" style={{paddingTop: '30vh'}}>
              <div className="col-12 text-center">
                <p className="p-3 font-weight-bold text-muted" style={{fontSize: '1.6rem', marginBottom: '0.5rem'}}>Sorry, we couldn't find an Egg Group called&nbsp;
                  <span className="badge badge-warning" style={{fontSize: '1.5rem'}}>{this.state.groupName}</span>.
                </p>
                <hr />
                <p className="font-weight-bold text-muted" style={{fontSize: '1.1rem',marginTop: '1rem'}}>Please make sure you search for an egg group that exists.</p>
              </div>
            </div>
          )
        }
      </>
    )
  }
}
