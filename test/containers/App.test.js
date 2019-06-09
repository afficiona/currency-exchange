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
import Header from '../../src/containers/Header';
import Toastr from '../../src/containers/Toastr';
import CurrencyMenu from '../../src/components/CurrencyMenu';
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
  let appComponent;

  beforeEach (() => {
    Currencies = fromJS({
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

    appComponent = renderIntoDocument(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  });

  it ('Has all the sub modules loaded', () => {
    // Checking if all the submodules are loaded in the DOM
    const appContainer = scryRenderedDOMComponentsWithClass (
      appComponent,
      'app__container'
    );
    const shellContainer = scryRenderedDOMComponentsWithClass (
      appComponent,
      'shell__content'
    );
    expect(appContainer).to.have.lengthOf(1);
    expect(shellContainer).to.have.lengthOf(1);
  });

  it('Has Header module loaded', () => {
    const headerContainer = scryRenderedComponentsWithType(
      appComponent,
      Header
    );
    expect(headerContainer).to.have.lengthOf(1);
  });

  it('Has CurrencyMenu module loaded', () => {
    const currencyMenuContainer = scryRenderedComponentsWithType(
      appComponent,
      CurrencyMenu
    );
    expect(currencyMenuContainer).to.have.lengthOf(1);
  });

  it('Has Toastr module loaded', () => {
    const currencyMenuContainer = scryRenderedComponentsWithType(
      appComponent,
      Toastr
    );
    expect(currencyMenuContainer).to.have.lengthOf(1);
  });

  it('Has Shell content render all the currencies in the rows', () => {
    const currenciesTable = scryRenderedDOMComponentsWithClass(
      appComponent,
      'shell__content__table'
    );
    const tableRows = scryRenderedDOMComponentsWithClass(
      appComponent,
      'row'
    );
    expect(currenciesTable).to.have.lengthOf(1);
    expect(tableRows).to.have.lengthOf(Currencies.get('list').size);
  });
});
