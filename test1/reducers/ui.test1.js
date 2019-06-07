import { fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../../src/reducers/UI';
import * as TYPES from '../../src/constants/ActionTypes';

const initialState = fromJS({
  currencyMenu: {
    isOpen: false,
  },
  toastr: {
    isActive: false,
    text: null
  }
});

describe('Reducer: Customers', () => {
  it('SET UI DATA: Toggle Currency Menu', () => {
    const action = {
      type: TYPES.SET_UI_DATA,
      path: ['currencyMenu', 'isOpen'],
      data: true
    };

    const expectedState = fromJS({
      ...initialState.toJSON(),
      currencyMenu: {
        isOpen: true
      }
    });
    const nextState = reducer(undefined, action);
    expect(nextState).equal(expectedState);
  });

  it('SET UI DATA: Toggle Toastr', () => {
    const action = {
      type: TYPES.SET_UI_DATA,
      path: ['toastr'],
      data: {
        isActive: true,
        text: 'Something went wrong!'
      }
    };

    const expectedState = fromJS({
      ...initialState.toJSON(),
      toastr: {
        isActive: true,
        text: 'Something went wrong!'
      }
    });
    const nextState = reducer(undefined, action);
    expect(nextState).equal(expectedState);
  });
});
