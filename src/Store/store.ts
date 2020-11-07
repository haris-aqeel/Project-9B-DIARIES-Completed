import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'

export const store = configureStore({
    reducer: rootReducer, // a single reducer function or an object of slice reducers
  });

  
export default store;