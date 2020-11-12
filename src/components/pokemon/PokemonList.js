import React, { Component } from 'react';
import axios from 'axios';

import Loading from '../layout/Loading'/* webpackChunkName: "loading" */;
import PokemonCard from './PokemonCard'/* webpackChunkName: "pokemonCard" */;

export default class PokemonList extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/",
      nextUrl: '',
      prevUrl: '',
      prevDisabled: true,
      nextDisabled: false,
      pokemon: null,
      offset: 0,
      limit: 18
    }
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
  }

  async componentDidMount() {
    const searchUrl = this.state.url+"?offset="+this.state.offset+"&limit="+this.state.limit;
    //const res = await axios.get(this.state.url);
    const res = await axios.get(searchUrl);
    this.setState({
      pokemon: res.data['results'],
      prevUrl: res.data.previous,
      nextUrl: res.data.next
    });
  }

  async handleNextPageClick() {
    if (this.state.nextUrl !== null) {
      const newOffset = this.state.offset+this.state.limit;
      const searchUrl = this.state.url+"?offset="+newOffset+"&limit="+this.state.limit;
      const res = await axios.get(searchUrl);
      this.setState({
        pokemon: res.data['results'],
        offset: newOffset,
        prevUrl: res.data.previous,
        nextUrl: res.data.next,
        prevDisabled: false
      });
    }
    if (this.state.nextUrl == null ) {
      this.setState({
        nextDisabled: true
      });
    }
  }

  async handlePrevPageClick() {
    if (this.state.prevUrl !== null) {
      const newOffset = this.state.offset-this.state.limit;
      const searchUrl = this.state.url+"?offset="+newOffset+"&limit="+this.state.limit;
      const res = await axios.get(searchUrl);
      this.setState({
        pokemon: res.data['results'],
        offset: newOffset,
        prevUrl: res.data.previous,
        nextUrl: res.data.next
      });
    }
    if (this.state.prevUrl == null ) {
      this.setState({
        prevDisabled: true
      });
    }
  }

  render() {
    return (
      <>
        { this.state.pokemon ? (
          <div className="row">
            <div className="col-12">
              <div className="row">
                { this.state.pokemon.map(pokemon => (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                  />
                ))
                }
              </div>
            </div>
            <div className="col-12 pb-4">
              <div className="row p-3">
                  <nav aria-label="pagination">
                    <ul className="pagination float-right">
                      <li className="page-item">
                        <button
                          type="button"
                          className="page-link"
                          onClick={() => {this.handlePrevPageClick()}}
                          disabled={this.state.prevDisabled}
                        >Previous</button>
                      </li>
                      <li className="page-item">
                        <button
                          type="button"
                          className="page-link"
                          onClick={() => {this.handleNextPageClick()}}
                          disabled={this.state.nextDisabled}
                        >Next</button>
                      </li>
                    </ul>
                  </nav>
              </div>
            </div>
          </div>
        ) : (
          <Loading textItem="Loading..." titleText="Loading"/>
        ) }
      </>
    )
  }
}
