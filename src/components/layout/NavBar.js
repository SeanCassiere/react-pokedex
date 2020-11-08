import React, { Component } from 'react';
import { IconContext } from "react-icons"
import { CgPokemon } from 'react-icons/cg';
import { FaGithubSquare } from 'react-icons/fa';
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
            <div className="navbar-nav">
              <IconContext.Provider value={{ style: { fontSize: '18px' } }}>
                <a
                  className="nav-item nav-link"
                  href="https://github.com/SeanCassiere/react-pokedex"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: '0.2rem'
                  }}
                >
                  <FaGithubSquare style={{marginBottom: '0.23rem'}} />&nbsp;Github/SeanCassiere
                </a>
              </IconContext.Provider>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}