import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface MapState {
  board: number[][];
  bombCount: number;
}

const initialState: MapState = {
  board: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0)),
  bombCount: 10,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updateSize: (state, action: PayloadAction<{ width: number; height: number; bombCount: number }>) => {
      const { width, height, bombCount } = action.payload;

      state.board = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
      state.bombCount = bombCount;
    },
    updateBoard: (state, action: PayloadAction<number[][]>) => {
      state.board = action.payload;
    },
  },
});

export const { updateSize, updateBoard } = mapSlice.actions;

export const selectBoard = (state: RootState) => state.map.board;

export const selectBoardSize = createSelector(selectBoard, (board) => ({
  height: board.length,
  width: board[0].length,
}));

export const selectBombCount = (state: RootState) => state.map.bombCount;

export default mapSlice.reducer;
