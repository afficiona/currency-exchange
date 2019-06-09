import React, {Component} from 'react';

import {DEFAULT_LOADING_TEXT} from './../../constants/States';

/**
 * Loader component.
 * Shows the text passed in props or else fallbacks to the default loading text
 */
class Loader extends Component {
  constructor (props) {
      super(props);

      this.state = {
          countdown: props.count - 1
      }

      // Having setState of countdown in a method will help in testing it.
      this.updateCountdown = countdown => {
        this.setState({ countdown }, () => {
          if (!countdown) {
            // this.props.countdownCb();
          }
        });
      }
  }

  componentDidMount() {
      window.clearInterval(this.countdownTimer);
      this.countdownTimer = window.setInterval(() => {
          const countdown = !this.state.countdown ? this.props.count - 1 : this.state.countdown - 1;
          this.updateCountdown(countdown);
      }, 1000);
  }

  render () {
    // The count has to be present and has to be a number
    if (isNaN(this.props.count)) {
      return null;
    }

    return (
      <div className="countdown">
        <div className="countdown__number">{this.state.countdown}</div>
        <svg className="countdown__svg">
          <circle r="10" cx="15" cy="15" />
        </svg>
      </div>
    );
  }
}

export default Loader;
