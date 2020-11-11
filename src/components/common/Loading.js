import React from 'react'

export default function Loading(props) {
  return (
    <div className="row" style={{paddingTop: '35vh'}}>
      <div className="col-12 text-center">
        <p className="badge badge-warning p-3" style={{fontSize: '1.6rem'}}>{props.textItem}</p>
      </div>
    </div>
  )
}
