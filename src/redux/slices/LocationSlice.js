import { createSlice } from '@reduxjs/toolkit';
import { fetchLocations } from '../services/api';

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    list: [],
    limit: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.list = action.payload.info;
      state.limit = action.payload.length;
    });
  },
});

export const setPage = locationsSlice.actions.setPage;
export const locationsReducer = locationsSlice.reducer;
