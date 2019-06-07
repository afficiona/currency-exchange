import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from './../../components/Button';

import * as actions from './../../actions/exchange';

/**
 */
class Header extends Component {
  constructor(props) {
    super(props);

    this.flipCurrencies = () => {
      const sourceId = this.props.SourceCurrency.get('id');
      const targetId = this.props.TargetCurrency.get('id');
      this.props.actions.setCurrencySelection(sourceId, false);
      this.props.actions.setCurrencySelection(targetId, true);
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
            onClick={() => this.props.currencyMenuToggle(false)}
          />

        </div>

        <div className="header__rate__wrapper">
          <p className="header__rate__item">1 {this.props.SourceCurrency.get('name')}</p>
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
            />
            <p className="header__input__note">Balance: {this.props.SourceCurrency.get('balance')}</p>
          </div>

          <div className="header__input__box">
            <div className="header__input__label">Target</div>
            <input
              placeholder="0.00"
              className="header__input__field"
              type="text"
            />
            <p className="header__input__note">Balance: {this.props.TargetCurrency.get('balance')}</p>
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
