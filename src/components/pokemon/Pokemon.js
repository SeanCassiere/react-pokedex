/* eslint-disable jsx-a11y/aria-role */
import React, { Component } from 'react'

import { Link } from 'react-router-dom';

import axios from 'axios';

import { FaAngleLeft } from 'react-icons/fa';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};
export default class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pokemonIndex: '',
      imageUrl: '',
      types: [],
      description: '',
      stats: {
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        specialAttack: '',
        specialDefense: ''
      },
      height: '',
      weight: '',
      eggGroups: '',
      abilities: '',
      genderRatioMale: '',
      genderRatioFemale: '',
      evs: '',
      hatchSteps: ''
    }
  }

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    //URLS for Pokemon Information
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
  
    //Get Pokemon Information
    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
        default:
          break;
      }
      return false;
    });

    //Convert decimeters to feet .... The  + 0.0001 * 100 / 100 is for rounding to 2 decimal places
    const height = Math.round((pokemonRes.data.height * 0.32804 + 0.0001) * 100) / 100;
    
    // Convert Hectograms to KG
    const weight = Math.round((pokemonRes.data.weight * 0.1 + 0.0001) * 100) / 100;
    
    const types = pokemonRes.data.types.map(type => type.type.name);

    const abilities = pokemonRes.data.abilities.map(ability => {
      return ability.ability.name
        .toLowerCase()
        .split('-')
        .map(
          s => s.charAt(0).toUpperCase() + s.substring(1)
        ).join(' ');
    })

    const evs = pokemonRes.data.stats.filter(stat => {
      if (stat.effort > 0) {
        return true;
      }
      return false;
    }).map(stat => {
      return `${stat.effort} ${stat.stat.name
        .toLowerCase()
        .split('-')
        .map(
          s => s.charAt(0).toUpperCase() + s.substring(1)
        ).join(' ')}`
    })
    .join(', ');


    // Get Pokemon Description, Catch Rate, EggGroups, Gender Ration, Hatch Steps

    await axios.get(pokemonSpeciesUrl).then(res => {
      let description = '';
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === 'en') {
          description = flavor.flavor_text
            .split(`\f`)
            .join(' ');
          return true;
        }
        return false;
      });

      const femaleRate = res.data['gender_rate'];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * ( 8 - femaleRate ) ;

      const catchRate = Math.round((100/255) * res.data['capture_rate']);

      const eggGroups = res.data['egg_groups'].map(group => {
        return group.name
          .toLowerCase()
          .split('-')
          .map(
            s => s.charAt(0).toUpperCase() + s.substring(1)
          ).join(' ');
      }).join(', ')

      const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps
      });
    });
    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      height,
      weight,
      abilities,
      evs,
      types
    });
  }

  render() {
    return (
      <>
      <div className="row"> 
        <div className="col">
          
        </div>
      </div>
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-md-2 col-sm-4">
              <Link
                to="/"
                className="btn btn-primary btn-smd font-weight-bold"
              >
                <FaAngleLeft /><span> PokeDex</span>
              </Link>
              </div>
              <div className="col-md-4 col-sm-4">
                <h4 className="mt-1">{this.state.pokemonIndex}</h4>
              </div>
              <div className="col-md-6 col-sm-4">
                <div className="float-right">
                  {this.state.types.map(type => {
                    return (
                      <span
                        key={type}
                        className="badge badge-pill mr-1 mt-1"
                        style={{
                          backgroundColor: `#${TYPE_COLORS[type]}`, 
                          color: 'white',
                          padding: '0.6rem'
                        }}
                      >
                        {type}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img
                  src={this.state.imageUrl}
                  alt={this.state.name}
                  className="card-img-top rounded mx-auto- mt-2"
                />
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">
                  {this.state.name
                    .toLowerCase()
                    .split(' ')
                    .map(
                      letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                    ).join(' ')
                  }
                </h4>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    HP
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${this.state.stats.hp}%`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ><small>{this.state.stats.hp}</small></div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Attack
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${this.state.stats.attack}%`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ><small>{this.state.stats.attack}</small></div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Defense
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${this.state.stats.defense}%`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ><small>{this.state.stats.defense}</small></div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Speed
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${this.state.stats.speed}%`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ><small>{this.state.stats.speed}</small></div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Special Attack
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${this.state.stats.specialAttack}%`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ><small>{this.state.stats.specialAttack}</small></div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Special Defense
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${this.state.stats.specialDefense}%`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ><small>{this.state.stats.specialDefense}</small></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col">
                  <p className="p-2">{this.state.description}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <h5 className="card-title text-center">
              Profile
            </h5>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="float-right">Height:</h6>
                  </div>
                  <div className="col-md-6">
                      <h6 className="float-left">{this.state.height} ft.</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="float-right">Weight:</h6>
                  </div>
                  <div className="col-md-6">
                      <h6 className="float-left">{this.state.weight} Kg.</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="float-right">Catch Rate:</h6>
                  </div>
                  <div className="col-md-6">
                      <h6 className="float-left">{this.state.catchRate}%</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="float-right">Gender Ratio:</h6>
                  </div>
                  <div className="col-md-6">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${this.state.genderRatioFemale}%`,
                          backgroundColor: '#C21853'
                        }}
                        aria-valuenow="15"
                        aria valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.genderRatioFemale}%</small>
                      </div>
                      <div
                        className="progress-bar"
                        role="progressBar"
                        style={{
                          width: `${this.state.genderRatioMale}%`,
                          backgroundColor: '#1976D2'
                        }}
                        aria-valuenow="15"
                        aria valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.genderRatioMale}%</small>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="float-right">Egg Groups:</h6>
                  </div>
                  <div className="col-md-6">
                      { /*<h6 className="float-left">{this.state.eggGroups}</h6> */ }
                      <h6 className="float-left">
                        {this.state.eggGroups.split(', ').map(group => {
                          return (
                            <Link
                              to={`/group/${group}`}
                              style={{
                                marginRight: '0.3rem',
                                textDecoration: 'none'
                              }}
                            >{group}</Link>
                          );
                        })}
                      </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="float-right">Hatch Steps:</h6>
                  </div>
                  <div className="col-md-6">
                      <h6 className="float-left">{this.state.hatchSteps}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="float-right">Abilities:</h6>
                  </div>
                  <div className="col-md-6">
                      <h6 className="float-left">
                        {this.state.abilities}
                      </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="float-right">EVs:</h6>
                  </div>
                  <div className="col-md-6">
                    <h6 className="float-left">
                      {this.state.evs}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            Data from 
              <a
                href="https://pokeapi.co/"
                rel="no-follow"
                className="card-link"
              > PokeApi</a>
          </div>
        </div>
      </div>
      </>
    )
  }
}
