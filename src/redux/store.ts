import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './slice/mapSlice';
import modalReducer from './slice/modalSlice';
import gameReducer from './slice/gameSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    map: mapReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
