import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './../../src/actions/exchange';
import { EXCHANGE_RATE_FETCH_API } from './../../src/constants';
import * as types from './../../src/constants/ActionTypes';
import fetchMock from 'fetch-mock';
import expect from 'expect';

fetchMock.config.sendAsJson = false;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    const source = 'GBP';
    const target = 'USD';
    afterEach(() => {
        fetchMock.restore();
    })

    it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
        // fetchMock.getOnce(`${EXCHANGE_RATE_FETCH_API}?base=${source}&symbols=${target}`, {
        fetchMock.getOnce('http://www.mocky.io/v2/5cfa81c8300000a406e366f5', {
            body: { todos: ['do something'] },
            headers: { 'content-type': 'application/json' }
        })

    const expectedActions = [
      { type: types.EXCHANGE_RATE_FETCH_INIT },
      { type: types.EXCHANGE_RATE_FETCH_ERROR, error: 'Something went wrong!' }
    ];
    const store = mockStore({ list: [] });

    return store.dispatch(actions.getExchangeRate('GBP', 'USD')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
