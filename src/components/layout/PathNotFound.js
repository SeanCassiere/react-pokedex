import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default class PathNotFound extends Component {
  render() {
    return (
      <div className="row" style={{paddingTop: '35vh'}}>
        <Helmet>
          <title>Pokedex: Path not found.</title>
        </Helmet>
        <div className="col-12 text-muted text-center">
          <p className="font-weight-bold" style={{fontSize: '2rem'}}>
            <span className="badge badge-danger" style={{fontSize: '2rem'}}>Error</span>
          </p>
          <p className="font-weight-bold mt-4">This path does not exist or is not directly accessible.</p>
          <p className="font-weight-bold">Please return back to the <Link to="/">homepage</Link>.</p>
        </div>
      </div>
    )
  }
}
