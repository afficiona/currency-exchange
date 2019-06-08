import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './Header';
import Toastr from './Toastr';
import CurrencyMenu from './../components/CurrencyMenu';

import * as ExchangeActions from './../actions/exchange';
import * as UIActions from './../actions/ui';

class App extends Component {
  constructor(props) {
    super(props);

    this.setCurrencySelection = (id, isSource = true) => {
      this.currencyMenuToggle();
      const field = isSource ? 'TargetCurrency' : 'SourceCurrency';
      if (this.props[field].get('id') === id) {
        return this.props.actions.setUIData(['toastr'], {
          isActive: true,
          text: 'Source and target currency cannot be same!'
        });
      }
      
      this.props.actions.setCurrencySelection( { id, isSource });
    }

    this.currencyMenuToggle = isSource => {
      this.props.actions.setUIData(['currencyMenu'], {
        isSource,
        isOpen: !this.props.IsCurrencyMenuOpen
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.CurrencyRateError && nextProps.CurrencyRateError) {
      this.props.actions.setUIData(['toastr'], {
        isActive: true,
        text: nextProps.CurrencyRateError
      });
    }
  }

  render() {
    return (
      <div className="app">
        <div className="app__container">
          <div className="shell">

            <Header currencyMenuToggle={this.currencyMenuToggle} />

            <div className="shell__content">
              <h3 className="shell__content__title">Balances:</h3>
              <div className="shell__content__table">
                {this.props.CurrencyList.map(cur => (
                  <div className="row" key={cur.get('id')}>
                    <div className="col">
                      <img className="col__img" src={cur.get('icon')} alt=""/>
                      {cur.get('name')}
                  </div>
                    <div className="col">{cur.get('symbol')}{cur.get('balance')}</div>
                  </div>
                ))}
              </div>
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
