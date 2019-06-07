import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './Header';
import Toastr from './Toastr';
import CurrencyMenu from './../components/CurrencyMenu';
import Loader from './../components/Loader';
import List from './../components/List';

import { EXCHANGE_RATE_FETCH_TIMER_COUNT } from './../constants/States';
import * as ExchangeActions from './../actions/exchange';
import * as UIActions from './../actions/ui';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: EXCHANGE_RATE_FETCH_TIMER_COUNT,
    };

    this.setCurrencySelection = (id, isSource = true) => {
      this.currencyMenuToggle();
      const field = isSource ? 'TargetCurrency' : 'SourceCurrency';
      if (this.props[field].get('id') === id) {
        return this.props.actions.setUIData(['toastr'], {
          isActive: true,
          text: 'Source and target currency cannot be same!'
        });
      }
      
      this.props.actions.setCurrencySelection(id, isSource);
    }

    this.refreshExchangeRate = (sourceId, targetId) => {
      window.clearInterval(this.countdownTimer);
      this.countdownTimer = window.setInterval(() => {
        const countdown = !this.state.countdown ? EXCHANGE_RATE_FETCH_TIMER_COUNT : this.state.countdown - 1;
        this.setState({ countdown })
      }, 1000);
      this.props.actions.getExchangeRate(sourceId, targetId);
    }

    this.currencyMenuToggle = isSource => {
      this.props.actions.setUIData(['currencyMenu'], {
        isSource,
        isOpen: !this.props.IsCurrencyMenuOpen
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const sourceId = nextProps.SourceCurrency.get('id');
    const targetId = nextProps.TargetCurrency.get('id');
    if (this.state.countdown && !nextState.countdown) {
      this.refreshExchangeRate(sourceId, targetId);
    }
  }

  componentDidMount() {
    const currentSourceId = this.props.SourceCurrency.get('id');
    const currentTargetId = this.props.TargetCurrency.get('id');
    this.refreshExchangeRate(currentSourceId, currentTargetId);
  }

  componentWillReceiveProps(nextProps) {
    const currentSourceId = this.props.SourceCurrency.get('id');
    const currentTargetId = this.props.TargetCurrency.get('id');
    const nextSourceId = nextProps.SourceCurrency.get('id');
    const nextTargetId = nextProps.TargetCurrency.get('id');
    if (currentSourceId !== nextSourceId || currentTargetId !== nextTargetId) {
      this.refreshExchangeRate();
    }

    if (!this.props.CurrencyRateError && nextProps.CurrencyRateError) {
      this.props.actions.setUIData(['toastr'], {
        isActive: true,
        text: nextProps.CurrencyRateError
      });
    }
  }

  render() {

    const shellContentClasses = classnames('shell__content', {
      'shell__content--overlay': this.state.isCurrencyMenuOpen,
    });

    return (
      <div className="app">
        <div className="app__container">
          <div className="shell">

            <Header currencyMenuToggle={this.currencyMenuToggle} />

            <div className="shell__content">
              <div>{this.props.CurrencyRateError ? 'Retrying': 'Updating'} in</div>
              <div className="time">{this.state.countdown}</div>
              <div>seconds</div>
            </div>

            <CurrencyMenu
              isActive={this.props.IsCurrencyMenuOpen}
              isForSource={this.props.IsCurrencyMenuForSource}
              items={this.props.CurrencyList.toJSON()}
              itemClickHandler={this.setCurrencySelection}
              close={this.currencyMenuToggle}
            />
            
            <Toastr danger/>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ Currencies, UI }) {
  const CurrencyList = Currencies.get('list');
  return {
    CurrencyList,
    IsCurrencyRateFetching: Currencies.getIn(['rate', 'isFetching']),
    CurrencyRateError: Currencies.getIn(['rate', 'error']),
    SourceCurrency: CurrencyList.find(cur => cur.get('isSource')),
    TargetCurrency: CurrencyList.find(cur => cur.get('isTarget')),
    IsCurrencyMenuForSource: UI.getIn(['currencyMenu', 'isSource']),
    IsCurrencyMenuOpen: UI.getIn(['currencyMenu', 'isOpen']),
    IsToastrActive: UI.getIn(['toastr', 'isActive']),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...ExchangeActions,
    ...UIActions
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
