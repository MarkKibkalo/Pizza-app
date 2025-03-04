import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setItems } from './pizzaSlices';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ categoryId, sortType, searchValue }, { dispatch }) => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      const { data } = await axios.get(
        `https://67658436410f849996555f31.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}${search}`,
      );
      dispatch(setItems(data));
    } catch (error) {
      console.error('Error', error);
    }
  },
);
