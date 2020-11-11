import React from 'react'
import Helmet from 'react-helmet';

export default function Loading(props) {
  return (
    <div className="row" style={{paddingTop: '35vh'}}>
      <Helmet>
        <title>Pokedex: Loading</title>
      </Helmet>
      <div className="col-12 text-center">
        <p className="badge badge-warning p-3" style={{fontSize: '1.6rem'}}>{props.textItem}</p>
      </div>
    </div>
  )
}
