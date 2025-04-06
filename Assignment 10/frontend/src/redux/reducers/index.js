// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import jobReducer from './jobReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  jobs: jobReducer
});

export default rootReducer;