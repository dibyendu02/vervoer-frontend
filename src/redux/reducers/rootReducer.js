import {combineReducers} from 'redux';
import user from './user';
import merchant from './merchantReducer';

export default combineReducers({
  user,
  merchant,
});
