import { fetchExchangeRateApi } from '../api';
import * as TYPES from './../constants/ActionTypes';

/**
 * 
 */
export const getExchangeRate = (from, to) => dispatch => {
  dispatch({ type: TYPES.EXCHANGE_RATE_FETCH_INIT });

  return fetchExchangeRateApi(from, to)
    .then(data => {
      dispatch({
        type: TYPES.EXCHANGE_RATE_FETCH_SUCCESS,
        data
      });
    })
    .catch(error => {
      dispatch({ type: TYPES.EXCHANGE_RATE_FETCH_ERROR, error });
    });
};

export const setCurrencySelection = data => dispatch => {
  dispatch({
    type: TYPES.SET_CURRENCY_SELECTION,
    ...data,
  });
}