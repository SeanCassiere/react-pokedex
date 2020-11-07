import React, { Component } from 'react'

import axios from 'axios';

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
    const imageUrl = pokemonRes.data.sprites.front_shiny;

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
    const weight = Math.round((pokemonRes.data.height * 0.1 + 0.0001) * 100) / 100;
    
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
      return `${stat.effort} ${stat.name}`
        .toLowerCase()
        .split('-')
        .map(
          s => s.charAt(0).toUpperCase() + s.substring(1)
        ).join(' ');
    }).join(', ');


    // Get Pokemon Description, Catch Rate, EggGroups, Gender Ration, Hatch Steps

    await axios.get(pokemonSpeciesUrl).then(res => {
      let description = '';
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === 'en') {
          description = flavor.flavor_text;
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
      <div>
        {this.state.name}
      </div>
    )
  }
}
