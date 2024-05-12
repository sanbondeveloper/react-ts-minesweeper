import { useCallback, useEffect, useState } from 'react';

import { BOARD_STATUS, NEIGHBORS } from '../lib/constants';
import { createBoardWithBombs, initOpen } from '../lib/utils';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectGameStatus, selectIsDirty, updateGameStatus, updateIsDirty } from '../redux/slice/gameSlice';
import {
  openCell,
  selectBoard,
  selectBoardSize,
  selectBoardStatus,
  selectBombCount,
  toggleFlag,
  toggleShowingHints,
  updateBoard,
  updateBoardStatus,
  updateSize,
} from '../redux/slice/mapSlice';

export function useMinesweeper() {
  const [count, setCount] = useState(0);
  const [isCounterClick, setIsCounterClick] = useState(false);
  const [clickedLeft, setClickedLeft] = useState(false);
  const [clickedRight, setClickedRight] = useState(false);
  const dispatch = useAppDispatch();
  const gameStatus = useAppSelector(selectGameStatus);
  const isDirty = useAppSelector(selectIsDirty);
  const board = useAppSelector(selectBoard);
  const boardStatus = useAppSelector(selectBoardStatus);
  const bombCount = useAppSelector(selectBombCount);
  const { height, width } = useAppSelector(selectBoardSize);

  // 초기 클릭
  const init = (x: number, y: number) => {
    const initBoard = createBoardWithBombs({ board, bombCount, x, y });
    const initBoardStatus = initOpen({ board: initBoard, boardStatus, x, y });

    dispatch(updateIsDirty(true));
    dispatch(updateGameStatus('START'));
    dispatch(updateBoard(initBoard));
    dispatch(updateBoardStatus(initBoardStatus));
  };

  // 깃발 토글
  const toggleFlagMark = (x: number, y: number) => {
    if (!isDirty) {
      const initBoard = createBoardWithBombs({ board, bombCount, x, y });

      dispatch(updateIsDirty(true));
      dispatch(updateGameStatus('START'));
      dispatch(updateBoard(initBoard));
    }

    dispatch(toggleFlag([x, y]));
    setCount(boardStatus[x][y] === BOARD_STATUS.FLAG ? count + 1 : count - 1);
  };

  // 게임판 공개
  const showBoard = useCallback(
    (isLose: boolean) => {
      const newBoardStatus = [...boardStatus.map((row) => [...row])];

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const status = boardStatus[i][j];

          if (!isCounterClick) {
            if (board[i][j] === BOARD_STATUS.BOMB && status === BOARD_STATUS.OPEN) {
              newBoardStatus[i][j] = BOARD_STATUS.RED;
            } else if (board[i][j] === BOARD_STATUS.BOMB && status === BOARD_STATUS.CLOSE && isLose) {
              newBoardStatus[i][j] = BOARD_STATUS.OPEN;
            } else if (board[i][j] !== BOARD_STATUS.BOMB && status === BOARD_STATUS.FLAG) {
              newBoardStatus[i][j] = BOARD_STATUS.NOTBOMB;
            }
          } else {
            if (board[i][j] !== BOARD_STATUS.BOMB && status === BOARD_STATUS.FLAG) {
              newBoardStatus[i][j] = BOARD_STATUS.NOTBOMB;
            } else if (board[i][j] === BOARD_STATUS.BOMB && status !== BOARD_STATUS.FLAG) {
              newBoardStatus[i][j] = BOARD_STATUS.RED;
            }
          }
        }
      }

      dispatch(updateBoardStatus(newBoardStatus));
    },
    [board, boardStatus, width, height, isCounterClick, dispatch],
  );

  const isLose = useCallback(() => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const status = boardStatus[i][j];

        if (board[i][j] === BOARD_STATUS.BOMB && status === BOARD_STATUS.OPEN) {
          // dispatch(updateGameStatus('LOSE'));
          return true;
        }
        if (isCounterClick && board[i][j] === BOARD_STATUS.BOMB && status !== BOARD_STATUS.FLAG) {
          // dispatch(updateGameStatus('LOSE'));
          return true;
        }
      }
    }

    return false;
  }, [height, width, board, boardStatus, isCounterClick]);

  // 게임종료 여부 확인
  const checkGameOver = useCallback(() => {
    if (isLose()) {
      dispatch(updateGameStatus('LOSE'));
      showBoard(true);

      return;
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const status = boardStatus[i][j];
        if (!isCounterClick && board[i][j] !== BOARD_STATUS.BOMB && status !== BOARD_STATUS.OPEN) return;
      }
    }

    dispatch(updateGameStatus('WIN'));
    showBoard(false);
  }, [board, boardStatus, width, height, isCounterClick, isLose, showBoard, dispatch]);

  // 게임 초기화
  const reset = useCallback(() => {
    dispatch(updateIsDirty(false));
    dispatch(updateGameStatus('READY'));
    dispatch(updateSize({ width, height, bombCount }));
    setCount(bombCount);
    setIsCounterClick(false);
  }, [width, height, bombCount, dispatch]);

  // Area Open
  const areaOpen = (x: number, y: number) => {
    const avaliableCells: [number, number][] = [];
    let isBombAround = false;

    NEIGHBORS.forEach(([wx, wy]) => {
      const nx = x + wx;
      const ny = y + wy;

      if (nx < 0 || ny < 0 || nx >= height || ny >= width) return;

      const status = boardStatus[nx][ny];

      if (status !== BOARD_STATUS.FLAG && status !== BOARD_STATUS.OPEN) {
        avaliableCells.push([nx, ny]);

        if (board[nx][ny] === BOARD_STATUS.BOMB) {
          isBombAround = true;
        }
      }
    });

    if (isBombAround) {
      dispatch(toggleShowingHints(avaliableCells));
      setTimeout(() => {
        dispatch(toggleShowingHints(avaliableCells));
      }, 100);

      return;
    }

    dispatch(openCell([x, y]));
  };

  useEffect(() => {
    setCount(bombCount);
  }, [bombCount]);

  useEffect(() => {
    if (gameStatus === 'START') {
      checkGameOver();
    }
  }, [gameStatus, checkGameOver]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      setClickedLeft(true);
    } else if (e.button === 2) {
      setClickedRight(true);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      setClickedLeft(false);
    } else if (e.button === 2) {
      setClickedRight(false);
    }
  };

  const handleClick = (x: number, y: number) => {
    if (gameStatus === 'WIN' || gameStatus === 'LOSE') return;
    if (boardStatus[x][y] === BOARD_STATUS.FLAG) return;

    if (
      boardStatus[x][y] === BOARD_STATUS.OPEN ||
      (clickedLeft && clickedRight && boardStatus[x][y] === BOARD_STATUS.OPEN)
    ) {
      areaOpen(x, y);
      return;
    }

    if (!isDirty) init(x, y);
    else dispatch(openCell([x, y]));
  };

  const handleClickRight = (e: React.MouseEvent<HTMLDivElement>, x: number, y: number) => {
    e.preventDefault();

    if (gameStatus === 'WIN' || gameStatus === 'LOSE') return;
    if (boardStatus[x][y] === BOARD_STATUS.OPEN) return;

    toggleFlagMark(x, y);
  };

  const handleClickReset = useCallback(() => {
    reset();
  }, [reset]);

  const handleClickCounter = () => {
    if (count !== 0) return;

    setIsCounterClick(true);
  };

  return {
    remaining: count,
    board,
    boardStatus,
    gameStatus,
    width,
    height,
    handleClick,
    handleClickRight,
    handleClickReset,
    handleClickCounter,
    handleMouseDown,
    handleMouseUp,
  };
}
