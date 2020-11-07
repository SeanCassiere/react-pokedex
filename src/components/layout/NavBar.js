import React, { Component } from 'react';
import {IconContext} from "react-icons"
import { CgPokemon } from 'react-icons/cg';
// import styled from 'styled-components';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
        >
          <div className="container">
            <IconContext.Provider value={{ style: { fontSize: '35px', color: "#003A70" } }}>
              <a className="navbar-brand" href="/"><CgPokemon /> PokeDex</a>
            </IconContext.Provider>
          </div>
        </nav>
      </div>
    )
  }
}