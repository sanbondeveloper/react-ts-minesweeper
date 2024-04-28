import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { BOARD_STATUS, NEIGHBORS } from '../../lib/constants';

interface MapState {
  board: number[][];
  bombCount: number;
  boardStatus: number[][];
}

const initialState: MapState = {
  board: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0)),
  bombCount: 10,
  boardStatus: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 1)),
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updateSize: (state, action: PayloadAction<{ width: number; height: number; bombCount: number }>) => {
      const { width, height, bombCount } = action.payload;

      state.board = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
      state.bombCount = bombCount;
      state.boardStatus = Array.from({ length: height }, () => Array.from({ length: width }, () => BOARD_STATUS.CLOSE));
    },
    updateBoard: (state, action: PayloadAction<number[][]>) => {
      state.board = action.payload;
    },
    updateBoardStatus: (state, action: PayloadAction<number[][]>) => {
      state.boardStatus = action.payload;
    },
    openCell: (state, action: PayloadAction<[number, number]>) => {
      const [tx, ty] = action.payload;
      const N = state.board.length;
      const M = state.board[0].length;
      const newBoardStatus = [...state.boardStatus.map((row) => [...row])];
      const queue = [[tx, ty]];

      newBoardStatus[tx][ty] = BOARD_STATUS.OPEN;

      while (queue.length > 0) {
        const [x, y] = queue.shift()!;

        NEIGHBORS.forEach(([wx, wy]) => {
          const nx = x + wx;
          const ny = y + wy;

          if (nx < 0 || ny < 0 || nx >= N || ny >= M) return;
          if (newBoardStatus[nx][ny] === BOARD_STATUS.OPEN || newBoardStatus[nx][ny] === BOARD_STATUS.FLAG) return;
          if (state.board[nx][ny] === BOARD_STATUS.BOMB) return;

          newBoardStatus[nx][ny] = BOARD_STATUS.OPEN;

          if (state.board[nx][ny] === 0) {
            queue.push([nx, ny]);
          }
        });
      }

      state.boardStatus = newBoardStatus;
    },

    toggleFlag: (state, action: PayloadAction<[number, number]>) => {
      const [x, y] = action.payload;

      state.boardStatus[x][y] = state.boardStatus[x][y] === BOARD_STATUS.FLAG ? BOARD_STATUS.CLOSE : BOARD_STATUS.FLAG;
    },
    toggleShowingHints: (state, action: PayloadAction<[number, number][]>) => {
      const cells = action.payload;

      cells.forEach(([x, y]) => {
        state.boardStatus[x][y] =
          state.boardStatus[x][y] === BOARD_STATUS.BLUE ? BOARD_STATUS.CLOSE : BOARD_STATUS.BLUE;
      });
    },
  },
});

export const { updateSize, updateBoard, updateBoardStatus, openCell, toggleFlag, toggleShowingHints } =
  mapSlice.actions;

export const selectBoard = (state: RootState) => state.map.board;

export const selectBoardSize = createSelector(selectBoard, (board) => ({
  height: board.length,
  width: board[0].length,
}));

export const selectBombCount = (state: RootState) => state.map.bombCount;

export const selectBoardStatus = (state: RootState) => state.map.boardStatus;

export default mapSlice.reducer;
