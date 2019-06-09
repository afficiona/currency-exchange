import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';

import * as actions from './../../src/actions/exchange';
import {EXCHANGE_RATE_FETCH_API} from './../../src/constants';
import * as types from './../../src/constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore (middlewares);

describe ('async actions', () => {
  beforeEach (() => {
    moxios.install ();
  });

  afterEach (() => {
    moxios.uninstall ();
  });

  it ('creates EXCHANGE_RATE_FETCH_SUCCESS when fetching rate has been done', () => {
    moxios.wait (() => {
      const request = moxios.requests.mostRecent ();
      request.respondWith ({
        status: 200,
        response: {
          rates: {EUR: 1.1277135608},
        },
      });
    });

    const expectedActions = [
      {type: types.EXCHANGE_RATE_FETCH_INIT},
      {
        type: types.EXCHANGE_RATE_FETCH_SUCCESS,
        data: {rates: {EUR: 1.1277135608}},
      },
    ];
    const store = mockStore ({list: []});

    return store.dispatch (actions.getExchangeRate ()).then (() => {
      expect (store.getActions ()).toEqual (expectedActions);
    });
  });

  it ('should fail with EXCHANGE_RATE_FETCH_ERROR when fetching rate is unsuccessful', () => {
    moxios.wait (() => {
      const request = moxios.requests.mostRecent ();
      request.reject('Invalid currency');
    });

    const expectedActions = [
      {type: types.EXCHANGE_RATE_FETCH_INIT},
      {
        type: types.EXCHANGE_RATE_FETCH_ERROR,
        error: 'Invalid currency',
      },
    ];
    const store = mockStore ({list: []});

    return store.dispatch (actions.getExchangeRate ()).then (() => {
      expect (store.getActions ()).toEqual (expectedActions);
    });
  });
});
