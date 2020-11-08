import React, { Component } from 'react'

export default class PathNotFound extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 text-muted">
          <h1 className="display-4 font-weight-bold">Error: Path Error</h1>
          <h5>Path not found</h5>
        </div>
      </div>
    )
  }
}
