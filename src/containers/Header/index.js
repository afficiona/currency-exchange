import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { EXCHANGE_RATE_FETCH_TIMER_COUNT } from './../../constants/States';

import CountdownCircle from './../../components/CountdownCircle';
import Button from './../../components/Button';

import { formatToDecimal } from './../../utils/lib';
import * as actions from './../../actions/exchange';

/**
 */
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sourceBal: '',
      targetBal: '',
    }

    this.flipCurrencies = () => {
      this.props.actions.setCurrencySelection( { toFlip: true });
    }

    this.handleInputChange = (e, data) => {
      const { value } = e.target;
      const balances = {
        sourceBal: this.props.SourceCurrency.get('balance'),
        targetBal: this.props.TargetCurrency.get('balance')
      }
      const field = data.isSource ? 'sourceBal' : 'targetBal';
      this.setState({
        sourceBal: formatToDecimal(balances.sourceBal - e.target.value),
        targetBal: formatToDecimal(balances.targetBal + (value * this.props.CurrencyRate))
      });
    }

    this.setBalances = (props = this.props) => {
      this.setState({
        sourceBal: props.SourceCurrency.get('balance'),
        targetBal: props.TargetCurrency.get('balance'),
      });
    }

    this.refreshExchangeRate = (sourceId, targetId) => {
      this.props.actions.getExchangeRate(sourceId, targetId);
    }

    this.onCountdownReached = () => {
      const sourceId = this.props.SourceCurrency.get('id');
      const targetId = this.props.TargetCurrency.get('id');
      this.refreshExchangeRate(sourceId, targetId);
    }
  }

  componentWillMount() {
    const currentSourceId = this.props.SourceCurrency.get('id');
    const currentTargetId = this.props.TargetCurrency.get('id');
    this.refreshExchangeRate(currentSourceId, currentTargetId);
    this.setBalances();
  }

  componentWillReceiveProps(nextProps) {
    // Setting the source and target balances in the local state to
    // be able to show the preview of balances on input change.
    const currentSourceId = this.props.SourceCurrency.get('id');
    const currentTargetId = this.props.TargetCurrency.get('id');
    const nextSourceId = nextProps.SourceCurrency.get('id');
    const nextTargetId = nextProps.TargetCurrency.get('id');
    if (currentSourceId !== nextSourceId || currentTargetId !== nextTargetId) {
      this.refreshExchangeRate(nextSourceId, nextTargetId);
      this.setBalances(nextProps);
    }
  }

  render () {
    const headerClasses = classnames('header', {
      'header--isBusy': this.props.IsCurrencyRateFetching,
    });
    return (
      <div className="header">
        <h1 className="header__title">Affxchange Converter</h1>

        <div className="header__action__wrapper">

          <Button
            primary
            text={this.props.SourceCurrency.get('name')}
            iconLeft={this.props.SourceCurrency.get('icon')}
            onClick={() => this.props.currencyMenuToggle(true)}
          />
          <Button
            transparent
            outline
            icon="swap-horizontal"
            onClick={this.flipCurrencies}
          />
          <Button
            primary
            text={this.props.TargetCurrency.get('name')}
            iconLeft={this.props.TargetCurrency.get('icon')}
            onClick={() => this.props.currencyMenuToggle(false)}
          />

        </div>

        <div className="header__rate__wrapper">
          <p className="header__rate__item">1 {this.props.SourceCurrency.get('name')}</p>
          <CountdownCircle count={EXCHANGE_RATE_FETCH_TIMER_COUNT} countdownCb={this.onCountdownReached} />
          <p className="header__rate__item">
            {this.props.CurrencyRate} {this.props.TargetCurrency.get('name')}
          </p>
        </div>

        <div className="header__input__wrapper">
          
          <div className="header__input__box">
            <div className="header__input__label">Source</div>
            <input
              placeholder="0.00"
              className="header__input__field"
              type="text"
              onChange={e => this.handleInputChange(e, { isSource: true })}
            />
            <p className="header__input__note">
              {this.props.SourceCurrency.get('name')} Balance: &nbsp; {this.state.sourceBal}
            </p>
            <p className="header__input__note">
              Your { this.props.TargetCurrency.get('name') } balance will be: &nbsp; {this.state.targetBal}
            </p>
          </div>

          <div className="header__input__action">
            <Button
              transparent
              outline
              icon="swap-horizontal"
              onClick={this.flipCurrencies}
            />
          </div>

        </div>

      </div>
    );
  }
}

function mapStateToProps({ Currencies, UI }) {
  const CurrencyList = Currencies.get('list');
  return {
    IsCurrencyMenuOpen: UI.getIn(['currencyMenu', 'isOpen']),
    SourceCurrency: CurrencyList.find(cur => cur.get('isSource')),
    TargetCurrency: CurrencyList.find(cur => cur.get('isTarget')),
    CurrencyRate: Currencies.getIn(['rate', 'data']),
    IsCurrencyRateFetching: Currencies.getIn(['rate', 'isFetching']),
    IsCurrencyRateError: Currencies.getIn(['rate', 'error']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
