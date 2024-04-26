import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { LevelType } from '../../types/level';
import { GameStatusType } from '../../types/gameStatus';

interface GameState {
  level: LevelType;
  isDirty: boolean;
  gameStatus: GameStatusType;
}

const initialState: GameState = {
  level: 'Beginner',
  isDirty: false,
  gameStatus: 'NONE',
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
    updateGameStatus: (state, action: PayloadAction<GameStatusType>) => {
      state.gameStatus = action.payload;
    },
  },
});

export const { updateLevel, updateIsDirty, updateGameStatus } = gameSlice.actions;

export const selectGameLevel = (state: RootState) => state.game.level;

export const selectIsDirty = (state: RootState) => state.game.isDirty;

export const selectGameStatus = (state: RootState) => state.game.gameStatus;

export default gameSlice.reducer;
