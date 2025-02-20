import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlices';
import cart from './slices/cartSlices';
import pizza from './slices/pizzaSlices';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
