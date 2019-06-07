import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
} from 'react-dom/test-utils';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import AppContainer from '../../src/containers/App';
import { getExchangeRate } from '../../src/actions/exchange';

function createMockStore(state) {
  return {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => state
  };
}

describe ('Component: App container', () => {
  let actions;
  let store;
  let Currencies;
  let UI;

  beforeEach (() => {
    Currencies = fromJS ({
      list: [
        {
          id: 'GBP',
          name: 'GBP',
          balance: '43.86',
          isSource: true,
        },
        {
          id: 'EUR',
          name: 'EUR',
          balance: '4.12',
          isTarget: true,
        },
      ],
    });

    UI = fromJS ({
      currencyMenu: {
        isOpen: false,
      },
      toastr: {
        isActive: false,
        text: null,
      },
    });

    actions = {
        getExchangeRate,
    };

    store = createMockStore({
      Currencies,
      UI,
    });
  });

  it ('Has all the sub modules loaded', () => {
    const appComponent = renderIntoDocument (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );

    // Checking if all the submodules are loaded in the DOM
    const appContainer = scryRenderedDOMComponentsWithClass (
      appComponent,
      'app__container'
    );
    const shellContainer = scryRenderedDOMComponentsWithClass (
      appComponent,
      'shell__content'
    );
    expect (appContainer).to.have.lengthOf (1);
    expect (shellContainer).to.have.lengthOf (1);
  });

  it ('Gets the exchange rate for the current source and target currencies', () => {
    const sourceCurrency = Currencies.get ('list')
      .find (cur => cur.get ('isSource'))
      .get ('id');
    const targetCurrency = Currencies.get ('list')
      .find (cur => cur.get ('isTarget'))
      .get ('id');
  });
});
