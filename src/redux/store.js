import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from './slices/CharacterSlice';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});

export default store;
