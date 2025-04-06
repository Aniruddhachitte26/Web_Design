// frontend/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import jobReducer from './reducers/jobReducer';
import userReducer from './reducers/userReducer';

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
  users: userReducer
});

// Create the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;