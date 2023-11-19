import { createSlice } from '@reduxjs/toolkit';
import { fetchCharacters } from '../services/api';

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    list: [],
    page: 1, 
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const setPage = charactersSlice.actions.setPage;
export const charactersReducer = charactersSlice.reducer;
