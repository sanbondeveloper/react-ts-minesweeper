import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  },
});

export const { updateSize } = mapSlice.actions;

export const selectBoard = (state: RootState) => state.map.board;

export const selectBoardSize = (state: RootState) => ({
  height: state.map.board.length,
  width: state.map.board[0].length,
});

export default mapSlice.reducer;
