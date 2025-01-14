import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlices';

export const store = configureStore({
  reducer: {
    counter: filterSlice,
  },
});
