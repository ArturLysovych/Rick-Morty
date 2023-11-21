import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from './slices/CharacterSlice';
import { episodesReducer } from './slices/EpisodeSlice';
import { locationsReducer } from './slices/LocationSlice';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    episodes: episodesReducer,
    locations: locationsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
