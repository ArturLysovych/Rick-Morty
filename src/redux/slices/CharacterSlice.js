import { createSlice } from '@reduxjs/toolkit';
import { fetchCharacters } from '../services/api';

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    list: [],
    limit: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.list = action.payload.info;
      state.limit = action.payload.length;
    });
  },
});

export const setPage = charactersSlice. actions.setPage;
export const charactersReducer = charactersSlice.reducer;
