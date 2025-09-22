import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import companySlice from './slices/companySlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    company: companySlice,
  },
});

export default store;