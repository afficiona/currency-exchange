import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { EXCHANGE_RATE_FETCH_TIMER_COUNT } from './../../constants/States';

import CountdownCircle from './../../components/CountdownCircle';
import Button from './../../components/Button';

import { formatToDecimal, checkNumberWithDecimalPlaces } from './../../utils/lib';
import * as actions from './../../actions/exchange';

/**
 * Header component: The top fold component which shows source
 * and target currencies. Has a provision to set source and
 * target to different currencies. User can also check and
 * update the balances of the currencioes in the active pocket.
 */
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInputInvalid: false,
      sourceBal: '',
      targetBal: '',
    }

    /**
     * Flip the source and target currencies
     */
    this.flipCurrencies = () => {
      this.props.actions.setCurrencySelection( { toFlip: true });
    }

    /**
     * Validate the input value to be not greater than the source balance.
     * If valid, update the preview balances. Else, invalidate the field.
     */
    this.handleInputChange = e => {
      const { value } = e.target;
      const sourceBal = this.props.SourceCurrency.get('balance');
      const targetBal = this.props.TargetCurrency.get('balance');
      // Check if value is not greater than the pocket balance of source currency.
      this.setState({
        isInputInvalid: value > sourceBal
      }, () => {
        if (!this.state.isInputInvalid) {
          this.setState({
            sourceBal: formatToDecimal(sourceBal - value),
            targetBal: formatToDecimal(targetBal + (value * this.props.CurrencyRate))
          });
        }
      });
    }

    /**
     * Update the currency balances as in the preview state to the app store.
     */
    this.publishCurrencyBalances = () => {
      // Check if input is valid
      if (this.state.isInputInvalid) {
        return;
      }
      const sourceId = this.props.SourceCurrency.get('id');
      const targetId = this.props.TargetCurrency.get('id');
      const { sourceBal, targetBal } = this.state;
      this.props.actions.setCurrencyBalance({ id: sourceId, balance: sourceBal });
      this.props.actions.setCurrencyBalance({ id: targetId, balance: targetBal });
      // Emptying the input once the balanaces are saved;
      this.balanceInputEle.value = '';
    }

    /**
     * Setting the source and target balances in the local state to
     * be able to show the preview of balances on input change.
     */
    this.setBalances = (props = this.props) => {
      this.setState({
        sourceBal: props.SourceCurrency.get('balance'),
        targetBal: props.TargetCurrency.get('balance'),
      });
    }

    // Trigger exchange rate action
    this.refreshExchangeRate = (sourceId, targetId) => {
      this.props.actions.getExchangeRate(sourceId, targetId);
    }

    /**
     * Once the countdown is over, update the exchange rate
     */
    this.onCountdownReached = () => {
      const sourceId = this.props.SourceCurrency.get('id');
      const targetId = this.props.TargetCurrency.get('id');
      this.refreshExchangeRate(sourceId, targetId);
    }
  }

  /**
   * Set the state preview balances and get the exchange rate as the
   * source and target currencies.
   */
  componentWillMount() {
    const currentSourceId = this.props.SourceCurrency.get('id');
    const currentTargetId = this.props.TargetCurrency.get('id');
    this.refreshExchangeRate(currentSourceId, currentTargetId);
    this.setBalances();
  }

  /**
   * Update the state balances if the store has source and
   * target currencies changed.
   */
  componentWillReceiveProps(nextProps) {
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
    const inputClasses = classnames('header__input__field', {
      'header__input__field--invalid': this.state.isInputInvalid,
    });
    return (
      <div className="header">

        {/* Title */}
        <h1 className="header__title">Converter</h1>

        {/* Header action wrapper */}
        <div className="header__action__wrapper">

          {/* Source currency button */}
          <Button
            primary
            text={this.props.SourceCurrency.get('name')}
            iconLeft={this.props.SourceCurrency.get('icon')}
            onClick={() => this.props.currencyMenuToggle(true)}
          />
          {/* Source currency button ends */}

          {/* Flip currency button */}
          <Button
            transparent
            outline
            icon="swap-horizontal"
            onClick={this.flipCurrencies}
          />
          {/* Flip currency button ends */}

          {/* Target currency button */}
          <Button
            primary
            text={this.props.TargetCurrency.get('name')}
            iconLeft={this.props.TargetCurrency.get('icon')}
            onClick={() => this.props.currencyMenuToggle(false)}
          />
          {/* Target currency button ends */}

        </div>
        {/* Header action wrapper ends */}

        {/* Exchange rate wrapper */}
        <div className="header__rate__wrapper">
          <p className="header__rate__item">
            1 {this.props.SourceCurrency.get('name')}
          </p>

          <CountdownCircle count={EXCHANGE_RATE_FETCH_TIMER_COUNT} countdownCb={this.onCountdownReached} />

          <p className="header__rate__item">
            {this.props.CurrencyRate} {this.props.TargetCurrency.get('name')}
          </p>
        </div>
        {/* Exchange rate wrapper ends */}

        {/* Update balance input */}
        <div className="header__input__wrapper">
          <div className="header__input__box">
            <div className="header__input__label">Source</div>
            <input
              placeholder="0.00"
              className={inputClasses}
              type="text"
              ref={input => this.balanceInputEle = input}
              onKeyDown={checkNumberWithDecimalPlaces}
              onChange={this.handleInputChange}
            />
            <p className="header__input__note">
              {this.props.SourceCurrency.get('name')} Balance:
              &nbsp; <b>{this.props.SourceCurrency.get('symbol')}{this.state.sourceBal}</b>
            </p>
            <p className="header__input__note">
              Your { this.props.TargetCurrency.get('name') } balance will be:
              &nbsp; <b>{this.props.TargetCurrency.get('symbol')}{this.state.targetBal}</b>
            </p>
          </div>

          <div className="header__input__action">
            <Button
              transparent
              outline
              icon="chevron-right"
              onClick={this.publishCurrencyBalances}
            />
          </div>
        </div>
        {/* Update balance input ends */}

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
