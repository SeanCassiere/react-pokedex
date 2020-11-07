import React, { Component } from 'react';
// import styled from 'styled-components';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
        >
          <div className="container">
            <a className="navbar-brand" href="/">Pokedex</a>
          </div>
        </nav>
      </div>
    )
  }
}

