import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { LevelType } from '../../types/level';

interface GameState {
  level: LevelType;
}

const initialState: GameState = {
  level: 'Beginner',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateLevel: (state, action: PayloadAction<LevelType>) => {
      state.level = action.payload;
    },
  },
});

export const { updateLevel } = gameSlice.actions;

export const selectGameLevel = (state: RootState) => state.game.level;

export default gameSlice.reducer;
