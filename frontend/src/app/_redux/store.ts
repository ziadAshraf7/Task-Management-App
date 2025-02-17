
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import userReducer from "../_redux/userSlice"
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, 
    user : userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), 
});

export default store;