import { fromJS } from 'immutable';

import * as TYPES from './../constants/ActionTypes';
import { normalizeExchangeRateData } from './../utils/normalizer';

const initialState = fromJS({
  rate: {
    isFetching: true,
    error: null,
    data: null
  },
  list: [
    {
      id: 'GBP',
      name: 'GBP',
      balance: '43.86',
      isSource: true
    },
    {
      id: 'EUR',
      name: 'EUR',
      balance: '4.12',
      isTarget: true
    },
    {
      id: 'USD',
      name: 'USD',
      balance: '12.32',
    },
    {
      id: 'INR',
      name: 'INR',
      balance: '113',
    }
  ]
});

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.EXCHANGE_RATE_FETCH_INIT:
      return state.mergeIn(['rate'], {
        isFetching: true,
        error: null,
        data: null
      });

    case TYPES.EXCHANGE_RATE_FETCH_SUCCESS:
      return state.mergeIn(['rate'], {
        isFetching: false,
        error: null,
        data: normalizeExchangeRateData(action.data),
      });

    case TYPES.EXCHANGE_RATE_FETCH_ERROR:
      return state.mergeIn(['rate'], {
        isFetching: false,
        error: action.error.message,
        data: null
      });

    case TYPES.SET_CURRENCY_SELECTION:
      const sourceCurrency = state.get('list').find(cur => cur.get('isSource')).get('id');
      const targetCurrency = state.get('list').find(cur => cur.get('isTarget')).get('id');

      // If intent is to set source currency as target, or vice versa, avoid the update.
      if ((action.isSource && action.id ===  targetCurrency) || (!action.isSource && action.id === sourceCurrency)) {
        return state;
      }

      let updatedCurrencyList = state.get('list').map(cur => {
        const field = action.isSource ? 'isSource' : 'isTarget';
        const otherField = action.isSource ? 'isTarget' : 'isSource';
        if (cur.get('id') === action.id) {
          return cur.merge({
            [field]: true,
            [otherField]: false,
          });
        }
        return cur.merge({
          [field]: false,
        });
      });

      return state.mergeIn(['list'], updatedCurrencyList);

    default:
      return state;
  }
}
