import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEpisodes, IOtherDataResponse } from '../services/api';

interface IEpisode {
  id: number
}

interface IEpisodeResponse extends IOtherDataResponse {
  results: IEpisode[];
}

export interface IEpisodeState {
  list: IEpisodeResponse['results'];
  limit: number;
}

const initialState: IEpisodeState = {
  list: [],
  limit: 0,
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodes.fulfilled, (state, action: PayloadAction<IOtherDataResponse>) => {
      state.list = action.payload.results;
      state.limit = action.payload.info.pages;
    });
  },
});

export const setPage = episodesSlice.actions;
export const episodesReducer = episodesSlice.reducer;
