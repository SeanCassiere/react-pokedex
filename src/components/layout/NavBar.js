import React, { Component } from 'react';

import { Link } from 'react-router-dom';
// import styled from 'styled-components';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
        >
          <div className="container">
            <Link className="navbar-brand" to="/">PokeDex</Link>
          </div>
        </nav>
      </div>
    )
  }
}

