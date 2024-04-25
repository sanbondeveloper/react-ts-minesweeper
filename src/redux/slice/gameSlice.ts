import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { LevelType } from '../../types/level';

interface GameState {
  level: LevelType;
  isDirty: boolean;
}

const initialState: GameState = {
  level: 'Beginner',
  isDirty: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateLevel: (state, action: PayloadAction<LevelType>) => {
      state.level = action.payload;
    },
    updateIsDirty: (state, action: PayloadAction<boolean>) => {
      state.isDirty = action.payload;
    },
  },
});

export const { updateLevel, updateIsDirty } = gameSlice.actions;

export const selectGameLevel = (state: RootState) => state.game.level;

export const selectIsDirty = (state: RootState) => state.game.isDirty;

export default gameSlice.reducer;
