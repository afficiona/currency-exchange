import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
} from 'react-dom/test-utils';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';

import AppContainer from '../../src/containers/App';
import Header from '../../src/containers/Header';
import Toastr from '../../src/containers/Toastr';
import Button from '../../src/components/Button';
import CurrencyMenu from '../../src/components/CurrencyMenu';
import { getExchangeRate } from '../../src/actions/exchange';
import { setUIData } from '../../src/actions/ui';

function createMockStore(state) {
  return {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => state
  };
}

describe ('Component: Header container', () => {
  let actions;
  let store;
  let Currencies;
  let SourceCurrencyName;
  let TargetCurrencyName;
  let UI;
  let appComponent;
  let headerComponent;

  const openCurrencyMenu = () => {
    store.dispatch(setUIData());
  }

  beforeEach (() => {
    Currencies = fromJS({
      list: [
        {
          id: 'GBP',
          name: 'GBP',
          balance: 43.86,
          isSource: true,
        },
        {
          id: 'EUR',
          name: 'EUR',
          balance: 4.12,
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

    headerComponent = renderIntoDocument(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    SourceCurrencyName = Currencies.get('list').find(cur => cur.get('isSource')).get('name');
    TargetCurrencyName = Currencies.get('list').find(cur => cur.get('isTarget')).get('name');
  });

  it ('Has all the sub modules loaded', () => {
    // Checking if all the submodules are loaded in the DOM
    const header = scryRenderedDOMComponentsWithClass(
      headerComponent,
      'header'
    );
    const headerTitle = scryRenderedDOMComponentsWithClass(
      headerComponent,
      'header__title'
    );
    const actionWrapper = scryRenderedDOMComponentsWithClass(
      headerComponent,
      'header__action__wrapper'
    );
    expect(header).to.have.lengthOf(1);
    expect(headerTitle).to.have.lengthOf(1);
    expect(actionWrapper).to.have.lengthOf(1);
  });

  it('Has Two Buttons with source and target currency names', () => {
    const buttons = scryRenderedComponentsWithType(headerComponent, Button);
    expect(buttons[0].props.text).to.equal(SourceCurrencyName);
    expect(buttons[2].props.text).to.equal(TargetCurrencyName);
  });

  it('Simulate click of source button to open Currency Menu', () => {
    const component = shallow(<Header  currencyMenuToggle={openCurrencyMenu} />, { context: { store } });
    const actionWrapper = component.dive().find('.header__action__wrapper');
    const sourcBtn = actionWrapper.childAt(0);
    sourcBtn.simulate('click');
  });

  it('Simulate onChange of Balance Input for value greater than currency balance', () => {
    const wrapper = shallow(<Header  currencyMenuToggle={openCurrencyMenu} />, { context: { store } });
    const component = shallow(wrapper.get(0)); // Since wrapper is an HOC.
    let input = component.find('input');
    // Setting value greater than source currency balance
    input.simulate('change', { target: { value: 100 } });
    expect(component.state().isInputInvalid).to.equal(true);
    // Getting the updated render
    component.update();
    input = component.find('input');
    expect(input.props().className).to.equal('header__input__field header__input__field--invalid');
  });

  it('Simulate onChange of Balance Input for value less than equal to currency balance', () => {
    const wrapper = shallow(<Header  currencyMenuToggle={openCurrencyMenu} />, { context: { store } });
    const component = shallow(wrapper.get(0)); // Since wrapper is an HOC.
    let input = component.find('input');
    // Setting value less than source currency balance
    input.simulate('change', { target: { value: 23.45 } });
    expect(component.state().isInputInvalid).to.equal(false);
    // Getting the updated render
    component.update();
    input = component.find('input');
    expect(input.props().className).to.not.equal('header__input__field header__input__field--invalid');
  });
});