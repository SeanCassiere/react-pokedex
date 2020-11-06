import React, { Component } from 'react';

import styled from 'styled-components';

import spinner from '../pokemon/loading.gif';

const Sprite = styled.img`
  width: 100%;
  display: none;
`;

export default class PokemonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      imageLoading: true,
      tooManyRequests: false,
      pokemonIndex: ''
    }
  }

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
  
    this.setState({
      name,
      imageUrl,
      pokemonIndex
    })
  }

  render() {
    return (
      <div className="col-md-3 col-sm6 mb-5">
        <div className="card">
          <h5 className="card-header">{this.state.pokemonIndex}</h5>
          { this.state.imageLoading ? (
            <img
              src={spinner}
              style={{
                width: '2rem',
                height: '2rem'
              }}
              className="card-img-top rounded mx-auto d-block mt-2"
            />
          ) : null }
          <Sprite
            className="card-img-top rounded mx-auto mt-2"
            onLoad={() => this.setState({ imageLoading: false })}
            onError={() => this.setState({ tooManyRequests: true })}
            src={this.state.imageUrl}
            alt={this.state.name}
            style={
              this.state.tooManyRequests ? { display: 'none'} :
              this.state.imageLoading ? null : {
                display: 'block'
              }
            }
            >
          </Sprite>
          { this.state.tooManyRequests ? (
            <h6 className="mx-auto">
              <span className="badge badge-danger mt-2">Too Many Requests</span>
            </h6>
          ) : null }
          <div className="card-body mx-auto">
            <h5 className="card-title">
              {this.state.name
                .toLowerCase()
                .split(' ')
                .map(
                  letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                ).join(' ')
              }
            </h5>
          </div>
        </div>
      </div>
    )
  }
}
