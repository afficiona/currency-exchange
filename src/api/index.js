import { DEFAULT_ERROR_MESSAGE } from './../constants/States';
import { EXCHANGE_RATE_FETCH_API } from './../constants';

/**
 * API to fetch the customers list.
 * If the response is not 200(ok), throw an error with the message. Else, return the response.
 */
export const fetchExchangeRateApi = (from, to) => 
  fetch(`${EXCHANGE_RATE_FETCH_API}?base=${source}&symbols=${target}`)
    .then(res => {
      
      if (!res.ok) {
        throw new Error(res.json() || res.statusText);
      }

      return res.json();
    });
