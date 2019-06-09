import { fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../../src/reducers/Currencies';
import * as TYPES from '../../src/constants/ActionTypes';

const initialState = fromJS ({
  rate: {
    isFetching: true,
    error: null,
    data: null,
  },
  list: [
    {
      id: 'GBP',
      name: 'GBP',
      symbol: '£',
      balance: 43.86,
      isSource: true,
      icon: 'https://image.flaticon.com/icons/png/128/197/197374.png'
    },
    {
      id: 'EUR',
      name: 'EUR',
      balance: 4.12,
      symbol: '€',
      isTarget: true,
      icon: 'https://image.flaticon.com/icons/png/128/197/197615.png'
    },
    {
      id: 'USD',
      name: 'USD',
      symbol: '$',
      balance: 12.32,
      icon: 'https://image.flaticon.com/icons/png/128/197/197484.png'
    },
    {
      id: 'INR',
      name: 'INR',
      symbol: '₹',
      balance: 113,
      icon: 'https://image.flaticon.com/icons/png/128/197/197419.png'
    }
  ],
});

describe('Reducer: Customers', () => {
  it('EXCHANGE RATE FETCH INIT: ', () => {
    const action = {
      type: TYPES.EXCHANGE_RATE_FETCH_INIT
    };

    const expectedState = initialState;
    const nextState = reducer(undefined, action);
    expect(nextState).equal(expectedState);
  });

  it('EXCHANGE RATE FETCH SUCCESS: ', () => {
    const action = {
      type: TYPES.EXCHANGE_RATE_FETCH_SUCCESS,
      data: {
        rates: {
          GBP: 123.1122
        },
      },
    };

    const expectedState = fromJS({
      ...initialState.toJSON(),
      rate: {
        isFetching: false,
        error: null,
        data: 123.11
      }
    });
    const nextState = reducer(undefined, action);
    expect(nextState).equal(expectedState);
  });

  it('EXCHANGE RATE FETCH ERROR: ', () => {
    const action = {
      type: TYPES.EXCHANGE_RATE_FETCH_ERROR,
      error: { message: 'Something went wrong!' }
    };

    const expectedState = fromJS({
      ...initialState.toJSON(),
      rate: {
        isFetching: false,
        error: action.error.message,
        data: null
      }
    });
    const nextState = reducer(undefined, action);
    expect(nextState).equal(expectedState);
  });

  // Testing selection for source currency
  it('SET CURRENCY SELECTION: When currency is already the source', () => {
    const action = {
      type: TYPES.SET_CURRENCY_SELECTION,
      id: 'GBP',
      isSource: true
    };

    // Expected to return the list with the currency status unchanged
    const expectedState = fromJS({
      ...initialState.toJSON(),
      list: [
        {
          id: 'GBP',
          name: 'GBP',
          balance: 43.86,
          isSource: true,
          isTarget: false,
          symbol: '£',
          icon: 'https://image.flaticon.com/icons/png/128/197/197374.png'
        },
        {
          id: 'EUR',
          name: 'EUR',
          balance: 4.12,
          isTarget: true,
          isSource: false,
          symbol: '€',
          icon: 'https://image.flaticon.com/icons/png/128/197/197615.png'
        },
        {
          id: 'USD',
          name: 'USD',
          balance: 12.32,
          isSource: false,
          symbol: '$',
          icon: 'https://image.flaticon.com/icons/png/128/197/197484.png'
        },
        {
          id: 'INR',
          name: 'INR',
          balance: 113,
          isSource: false,
          symbol: '₹',
          icon: 'https://image.flaticon.com/icons/png/128/197/197419.png'
        }
      ],
    });
    const nextState = reducer(undefined, action);
    expect(nextState).equal(expectedState);
  });

  // Testing selection for source currency
  it('SET CURRENCY SELECTION: When currency is not already the source', () => {
    const action = {
      type: TYPES.SET_CURRENCY_SELECTION,
      id: 'USD',
      isSource: true
    };

    // Expected to return the list with the currency status changed to source
    const expectedState = fromJS({
      ...initialState.toJSON(),
      list: [
        {
          id: 'GBP',
          name: 'GBP',
          balance: 43.86,
          isSource: false,
          symbol: '£',
          icon: 'https://image.flaticon.com/icons/png/128/197/197374.png'
        },
        {
          id: 'EUR',
          name: 'EUR',
          balance: 4.12,
          isTarget: true,
          isSource: false,
          symbol: '€',
          icon: 'https://image.flaticon.com/icons/png/128/197/197615.png'
        },
        {
          id: 'USD',
          name: 'USD',
          balance: 12.32,
          isSource: true,
          isTarget: false,
          symbol: '$',
          icon: 'https://image.flaticon.com/icons/png/128/197/197484.png'
        },
        {
          id: 'INR',
          name: 'INR',
          balance: 113,
          isSource: false,
          symbol: '₹',
          icon: 'https://image.flaticon.com/icons/png/128/197/197419.png'
        }
      ],
    });
    const nextState = reducer(undefined, action);
    expect(nextState).equal(expectedState);
  });

  // Testing selection for target currency
  it('SET CURRENCY SELECTION: When currency is already the target', () => {
    const action = {
      type: TYPES.SET_CURRENCY_SELECTION,
      id: 'EUR',
      isSource: false
    };

    // Expected to return the list with the currency status unchanged
    const expectedState = fromJS({
      ...initialState.toJSON(),
      list: [
        {
          id: 'GBP',
          name: 'GBP',
          balance: 43.86,
          isSource: true,
          isTarget: false,
          symbol: '£',
          icon: 'https://image.flaticon.com/icons/png/128/197/197374.png'
        },
        {
          id: 'EUR',
          name: 'EUR',
          balance: 4.12,
          isTarget: true,
          isSource: false,
          symbol: '€',
          icon: 'https://image.flaticon.com/icons/png/128/197/197615.png'
        },
        {
          id: 'USD',
          name: 'USD',
          balance: 12.32,
          isTarget: false,
          symbol: '$',
          icon: 'https://image.flaticon.com/icons/png/128/197/197484.png'
        },
        {
          id: 'INR',
          name: 'INR',
          balance: 113,
          isTarget: false,
          symbol: '₹',
          icon: 'https://image.flaticon.com/icons/png/128/197/197419.png'
        }
      ],
    });
    const nextState = reducer(undefined, action);
    expect(nextState).equal(expectedState);
  });

  // Testing selection for target currency
  it('SET CURRENCY SELECTION: When currency is not already the target', () => {
    const action = {
      type: TYPES.SET_CURRENCY_SELECTION,
      id: 'USD',
      isSource: false
    };

    // Expected to return the list with the currency status unchanged
    const expectedState = fromJS({
      ...initialState.toJSON(),
      list: [
        {
          id: 'GBP',
          name: 'GBP',
          balance: 43.86,
          isSource: true,
          isTarget: false,
          symbol: '£',
          icon: 'https://image.flaticon.com/icons/png/128/197/197374.png'
        },
        {
          id: 'EUR',
          name: 'EUR',
          balance: 4.12,
          isTarget: false,
          symbol: '€',
          icon: 'https://image.flaticon.com/icons/png/128/197/197615.png'
        },
        {
          id: 'USD',
          name: 'USD',
          balance: 12.32,
          isTarget: true,
          isSource: false,
          symbol: '$',
          icon: 'https://image.flaticon.com/icons/png/128/197/197484.png'
        },
        {
          id: 'INR',
          name: 'INR',
          balance: 113,
          isTarget: false,
          symbol: '₹',
          icon: 'https://image.flaticon.com/icons/png/128/197/197419.png'
        }
      ],
    });
    const nextState = reducer(undefined, action);
    expect(nextState).equal(expectedState);
  });

  // Testing selection for target currency
  it('SET CURRENCY SELECTION: When source and target currency is same', () => {
    // Trying to set source currency(GBP) as target.
    const action = {
      type: TYPES.SET_CURRENCY_SELECTION,
      id: 'GBP',
      isSource: false
    };

    // Expected to return the list unchanged
    const expectedState = fromJS({
      ...initialState.toJSON(),
      list: [
        {
          id: 'GBP',
          name: 'GBP',
          balance: 43.86,
          isSource: true,
          symbol: '£',
          icon: 'https://image.flaticon.com/icons/png/128/197/197374.png'
        },
        {
          id: 'EUR',
          name: 'EUR',
          balance: 4.12,
          isTarget: true,
          symbol: '€',
          icon: 'https://image.flaticon.com/icons/png/128/197/197615.png'
        },
        {
          id: 'USD',
          name: 'USD',
          balance: 12.32,
          symbol: '$',
          icon: 'https://image.flaticon.com/icons/png/128/197/197484.png'
        },
        {
          id: 'INR',
          name: 'INR',
          balance: 113,
          symbol: '₹',
          icon: 'https://image.flaticon.com/icons/png/128/197/197419.png'
        }
      ],
    });
    const nextState = reducer(undefined, action);
    expect(nextState).equal(expectedState);
  });
});
