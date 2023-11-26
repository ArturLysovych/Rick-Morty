import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCharacters, ICharacterDataResponse } from '../services/api';

interface ICharacter {
  id: number
}

interface ICharacterResponse {
  results: ICharacter[];
  info: {
    pages: number;
  };
}

export interface ICharacterState {
  list: ICharacterResponse['results'];
  limit: number;
}

const initialState: ICharacterState = {
  list: [],
  limit: 0,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<ICharacterDataResponse>) => {
      state.list = action.payload.results;
      state.limit = action.payload.info.pages;
    });
  },
});

export const setPage = charactersSlice.actions;
export const charactersReducer = charactersSlice.reducer;
