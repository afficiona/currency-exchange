import { fromJS } from 'immutable';

import * as TYPES from './../constants/ActionTypes';
import { normalizeExchangeRateData } from './../utils/normalizer';

/**
 * The flag icons courtesy: https://www.flaticon.com/free-icons/india-flag
 */
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
      balance: 43.86,
      isSource: true,
      icon: 'https://image.flaticon.com/icons/png/128/197/197374.png'
    },
    {
      id: 'EUR',
      name: 'EUR',
      balance: 4.12,
      isTarget: true,
      icon: 'https://image.flaticon.com/icons/png/128/197/197615.png'
    },
    {
      id: 'USD',
      name: 'USD',
      balance: 12.32,
      icon: 'https://image.flaticon.com/icons/png/128/197/197484.png'
    },
    {
      id: 'INR',
      name: 'INR',
      balance: 113,
      icon: 'https://image.flaticon.com/icons/png/128/197/197419.png'
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
      let updatedCurrencyList;

      if (action.toFlip) {
        updatedCurrencyList = state.get('list').map(cur => {
          // FIXME: Simplify this.
          if (cur.get('id') === sourceCurrency) {
            return cur.merge({
              isSource: false,
              isTarget: true,
            });
          } else if (cur.get('id') === targetCurrency) {
            return cur.merge({
              isSource: true,
              isTarget: false,
            });
          }
          return cur;
        });
        return state.mergeIn(['list'], updatedCurrencyList);
      }

      // If intent is to set source currency as target, or vice versa, avoid the update.
      if ((action.isSource && action.id ===  targetCurrency) || (!action.isSource && action.id === sourceCurrency)) {
        return state;
      }

      updatedCurrencyList = state.get('list').map(cur => {
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
