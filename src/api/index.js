import axios from 'axios';

import { DEFAULT_ERROR_MESSAGE } from './../constants/States';
import { EXCHANGE_RATE_FETCH_API } from './../constants';

/**
 * API to fetch the customers list.
 * If the response is not 200(ok), throw an error with the message. Else, return the response.
 */
export const fetchExchangeRateApi = (source, target) => 
  axios({ url: `${EXCHANGE_RATE_FETCH_API}?base=${source}&symbols=${target}`, method: 'get' })
    .then(res => res.data);