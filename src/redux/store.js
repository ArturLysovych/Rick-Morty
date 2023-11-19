import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from './slices/CharacterSlice';
import { episodesReducer } from './slices/EpisodeSlice';
import { locationsReducer } from './slices/LocationSlice';
import thunk from 'redux-thunk';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    episodes: episodesReducer,
    locations: locationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
