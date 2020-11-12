import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FaAngleLeft } from 'react-icons/fa';
import PokemonCard from './PokemonCard'/* webpackChunkName: "pokemonCard" */;
import Loading from '../layout/Loading'/* webpackChunkName: "loading" */;

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
    const groupName = this.props.eggGroupName;
    const { from } = this.props.searchParams;
    
    if ((this.isEmpty(from) === false) && (this.isEmpty(from) === false)) {
      this.setState({ prevPage: true, prevPageId: from });
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
            <Helmet>
            <title>
              Pokedex: Egg Group -&nbsp;
              {this.state.groupName
                .toLowerCase()
                .split(' ')
                .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                .join(' ')}
            </title>
            </Helmet>
            {this.state.prevPage ? (
              <>
              <div className="col-3 col-md-2">
                <Link
                  to={`/pokemon/${this.state.prevPageId}`}
                  type="button"
                  className="badge badge-primary p-3"
                  style={{fontSize: '1.2rem'}}
                >
                  <FaAngleLeft /><span className="d-none d-md-inline-block">Back</span>
                </Link>
              </div>
              <div className="col-9 col-md-10">
                <p className="badge badge-warning p-3 float-right" style={{fontSize: '1.3rem'}}>Egg Group:&nbsp;
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
              </>
            ) : (
              <>
              <div className="col-12 col-md-12">
                <p className="badge badge-warning p-3 float-right" style={{fontSize: '1.3rem'}}>Egg Group:&nbsp;
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
              </>
            )}
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
            <div>
              <Helmet>
              <title>
                Pokedex: Egg Group - Searching
              </title>
              </Helmet>
              <Loading textItem="Searching..." titleText="Loading" />
            </div>
        ) : (
            <div className="row" style={{paddingTop: '30vh'}}>
              <Helmet>
              <title>
                Pokedex: Egg Group - Could not find
              </title>
              </Helmet>
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
