import React, { Component } from 'react';
import classnames from 'classnames';

/**
 * 
 */
class Button extends Component {
  render () {
    const btnClasses = classnames('btn', {
      'btn--primary': this.props.primary,
      'btn--transparent': this.props.transparent,
      'btn--outline': this.props.outline
    });
    return (
      <button className={btnClasses} onClick={this.props.onClick}>
        {this.props.iconLeft && <img className="btn__img" src={this.props.iconLeft} />}
        {this.props.text}
        {this.props.icon && <i className={`mdi mdi-${this.props.icon}`}></i>}
      </button>
    );
  }
}

export default Button;
