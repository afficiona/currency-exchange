import React, {Component} from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UIActions from './../../actions/ui';
import { DEFAULT_ERROR_MESSAGE } from './../../constants/States';

/**
 * Container component to show message from the bottom of the shell 
 * screen. It can be configured for error or success message.
 */
class Toastr extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.IsActive && nextProps.IsActive) {
      window.setTimeout(() => {
        this.props.actions.setUIData(['toastr', 'isActive'], false);
      }, 3000);
    }
  }

  render () {
    const classes = classnames('toastr', {
      'toastr--active': this.props.IsActive,
      'toastr--danger': this.props.danger,
      'toastr--success': this.props.success
    });
    return (
      <div className={classes}>
        {this.props.Text || DEFAULT_ERROR_MESSAGE}
      </div>
    );
  }
}

function mapStateToProps({ UI }) {
  return {
    IsActive: UI.getIn(['toastr', 'isActive']),
    Text: UI.getIn(['toastr', 'text']),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...UIActions
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toastr);
