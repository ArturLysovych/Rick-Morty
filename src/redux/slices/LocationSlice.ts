import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLocations, IOtherDataResponse } from '../services/api';

interface ILocation {
  // no types
}

interface ILocationResponse {
  results: ILocation[];
  info: {
    pages: number;
  };
}

export interface ILocationState {
  list: ILocationResponse['results'];
  limit: number;
}

const initialState: ILocationState = {
  list: [],
  limit: 0,
};

const LocationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.fulfilled, (state, action: PayloadAction<IOtherDataResponse>) => {
      state.list = action.payload.results;
      state.limit = action.payload.info.pages;
    });
  },
});

export const setPage = LocationsSlice.actions;
export const locationsReducer = LocationsSlice.reducer;

