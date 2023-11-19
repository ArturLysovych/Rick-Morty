import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api/';

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async ({ page, status }) => {
  const response = await axios.get(`${BASE_URL}character/?page=${page}&status=${status}`);
  return {
    info: response.data.results,
    length: response.data.info.pages
  };
});

export const fetchEpisodes = createAsyncThunk('episodes/fetchEpisodes', async ({ page }) => {
  const response = await axios.get(`${BASE_URL}episode/?page=${page}`);
  return {
    info: response.data.results,
    length: response.data.info.pages
  };
});

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async ({ page }) => {
  const response = await axios.get(`${BASE_URL}location/?page=${page}`);
  return {
    info: response.data.results,
    length: response.data.info.pages
  };
});

