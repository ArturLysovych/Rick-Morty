import { createSlice } from '@reduxjs/toolkit';
import { fetchEpisodes } from '../services/api';

const episodesSlice = createSlice({
  name: 'episodes',
  initialState: {
    list: [],
    limit: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.list = action.payload.info;
        state.limit = action.payload.length;
    });
  },
});

export const setPage = episodesSlice.actions.setPage;
export const episodesReducer = episodesSlice.reducer;
