import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

export interface IQueryParams {
  page: number;
  status?: string;
  gender?: string;
  name?: string;
}

export interface ICharacterDataResponse {
  results: any[];
  info: {
    pages: number;
  };
}

export interface IOtherDataResponse {
  results: any[];
  info: {
    pages: number;
  };
}

const BASE_URL = 'https://rickandmortyapi.com/api/';

export const fetchCharacters = createAsyncThunk<ICharacterDataResponse, IQueryParams>(
  'characters/fetchCharacters',
  async ({ page, status, gender, name }) => {
    const response: AxiosResponse<IOtherDataResponse> = await axios.get(
      `${BASE_URL}character/?page=${page}&status=${status}&gender=${gender}&name=${name}`
    );
    return response.data;
  }
);

export const fetchEpisodes = createAsyncThunk<IOtherDataResponse, IQueryParams>(
  'episodes/fetchEpisodes',
  async ({ page }) => {
    const response: AxiosResponse<IOtherDataResponse> = await axios.get(`${BASE_URL}episode/?page=${page}`);
    return response.data;
  }
);

export const fetchLocations = createAsyncThunk<IOtherDataResponse, IQueryParams>(
  'locations/fetchLocations',
  async ({ page }) => {
    const response: AxiosResponse<IOtherDataResponse> = await axios.get(`${BASE_URL}location/?page=${page}`);
    return response.data;
  }
);
