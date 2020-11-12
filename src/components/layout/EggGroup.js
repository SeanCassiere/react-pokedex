import React, { Component } from 'react';
import queryString from 'query-string';
import EggGroupList from '../pokemon/EggGroupList';
//import { Helmet } from 'react-helmet';

export default class EggGroup extends Component {
  render() {
    const { eggGroupName } = this.props.match.params;
    const searchParams = queryString.parse(this.props.location.search);
    
    return (
      <div className="row">
        <div className="col">
          <EggGroupList eggGroupName={eggGroupName} searchParams={searchParams} />
        </div>
      </div>
    )
  }
}
