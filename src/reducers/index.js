import { combineReducers } from 'redux';
import Currencies from './Currencies';
import UI from './UI';

const rootReducer = combineReducers({
  Currencies,
  UI
});

export default rootReducer;
