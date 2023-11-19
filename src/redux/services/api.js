import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api/';

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async (page) => {
    const response = await axios.get(`${BASE_URL}character/?page=${page}`);
    return response.data.results;
});

export const fetchEpisodes = createAsyncThunk('episodes/fetchEpisodes', async (page) => {
  const response = await axios.get(`${BASE_URL}episode/?page=${page}`);
  return response.data.results;
});

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async (page) => {
  const response = await axios.get(`${BASE_URL}location/?page=${page}`);
  return response.data.results;
});
