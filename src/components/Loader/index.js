import React, { Component } from 'react';

import { DEFAULT_LOADING_TEXT } from './../../constants/States';

/**
 * Loader component.
 * Shows the text passed in props or else fallbacks to the default loading text
 */
class Loader extends Component {
  render () {
    return (
      <div className="loader">
        {this.props.text || DEFAULT_LOADING_TEXT}
      </div>
    );
  }
}

export default Loader;
