import React from 'react';
import { fromJS } from 'immutable';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Button from './../../src/components/Button';
import CurrencyMenu from './../../src/components/CurrencyMenu';

describe('Component: CurrencyMenu module', () => {
  let Currencies;

  beforeEach(() => {
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
  });

  it('Does not render if currency list items are not provided', () => {
    const wrapper = shallow(<CurrencyMenu count="s" />);
    expect(wrapper.children().length).to.equal(0);
  });

  it('Renders menu items equal to the list size', () => {
    const wrapper = shallow(<CurrencyMenu items={Currencies.get('list')} />);
    expect(wrapper.find('.currency-menu__section__list__item').length).to.equal(Currencies.get('list').size);
  });

  it('Is inactive if the isActive flag in state is false', () => {
    const wrapper = shallow(<CurrencyMenu items={Currencies.get('list')} />);
    expect(wrapper.find('.currency-menu__wrapper').hasClass('currency-menu__wrapper--active')).to.equal(false);
  });

  it('Should open when isActive is true and close when isActive is false', () => {
    const wrapper = shallow(<CurrencyMenu items={Currencies.get('list')} />);
    wrapper.setState({ isActive: true });
    expect(wrapper.find('.currency-menu__wrapper').hasClass('currency-menu__wrapper--active')).to.equal(true);
    wrapper.setState({ isActive: false });
    expect(wrapper.find('.currency-menu__wrapper').hasClass('currency-menu__wrapper--active')).to.equal(false);
  });
});