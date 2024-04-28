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
  const gameStatus = useAppSelector(selectGameStatus);
  const isDirty = useAppSelector(selectIsDirty);
  const board = useAppSelector(selectBoard);
  const boardStatus = useAppSelector(selectBoardStatus);
  const bombCount = useAppSelector(selectBombCount);
  const { height, width } = useAppSelector(selectBoardSize);
  const [count, setCount] = useState(0);
  const [isCounterClick, setIsCounterClick] = useState(false);
  const [clickedLeft, setClickedLeft] = useState(false);
  const [clickedRight, setClickedRight] = useState(false);
  const dispatch = useAppDispatch();

  // 초기 클릭
  const init = (x: number, y: number) => {
    const initBoard = createBoardWithBombs({ board, bombCount, x, y });
    const initBoardStatus = initOpen({ board: initBoard, boardStatus, x, y });

    dispatch(updateIsDirty(true));
    dispatch(updateBoard(initBoard));
    dispatch(updateBoardStatus(initBoardStatus));
  };

  const toggleFlagMark = (x: number, y: number) => {
    if (!isDirty) {
      const initBoard = createBoardWithBombs({ board, bombCount, x, y });

      dispatch(updateIsDirty(true));
      dispatch(updateBoard(initBoard));
    }

    dispatch(toggleFlag([x, y]));

    setCount(boardStatus[x][y] === BOARD_STATUS.FLAG ? count + 1 : count - 1);
  };

  // 게임종료 여부 확인
  const checkIsOver = useCallback(() => {
    /*
    = 승리 =
    1. 폭탄을 제외한 모든 셀을 열었을 때
    2. 폭탄에 해당하는 모든 셀에 깃발을 표시하고 카운터를 눌렀을 때
    
    = 패배 =
    1. 폭탄을 눌렀을 때
    2. 폭탄이 아닌 곳에 깃발을 표시하고 카운터를 눌렀을 때
  */
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const status = boardStatus[i][j];

        if (board[i][j] === BOARD_STATUS.BOMB && status === BOARD_STATUS.OPEN) {
          dispatch(updateGameStatus('LOSE'));
          return 'LOSE';
        }
        if (isCounterClick && board[i][j] === BOARD_STATUS.BOMB && status !== BOARD_STATUS.FLAG) {
          dispatch(updateGameStatus('LOSE'));
          return 'LOSE';
        }
      }
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const status = boardStatus[i][j];

        if (!isCounterClick && board[i][j] !== BOARD_STATUS.BOMB && status !== BOARD_STATUS.OPEN) {
          return '';
        }
      }
    }

    dispatch(updateGameStatus('WIN'));
    return 'WIN';
  }, [board, boardStatus, width, height, isCounterClick, dispatch]);

  // 게임판 공개
  const showBoard = useCallback(
    (result: string) => {
      /*
      = 카운터 클릭 X =
      0. 폭탄 O 오픈 O -> Red
      1. 폭탄 O 오픈 X -> Open
      2. 폭탄 O 깃발 O -> Flag
      3. 폭탄 X 깃발 O -> Not

      = 카운터 클릭 O =
      0. 폭탄 X 깃발 X -> 유지
      1. 폭탄 X 깃발 O -> Not
      2. 폭탄 O 깃발 O -> Flag
      3. 폭탄 O 깃발 X -> Red
    */

      const newBoardStatus = [...boardStatus.map((row) => [...row])];

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const status = boardStatus[i][j];

          if (!isCounterClick) {
            if (board[i][j] === BOARD_STATUS.BOMB && status === BOARD_STATUS.OPEN) {
              newBoardStatus[i][j] = BOARD_STATUS.RED;
            } else if (board[i][j] === BOARD_STATUS.BOMB && status === BOARD_STATUS.CLOSE && result === 'LOSE') {
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

  const reset = useCallback(() => {
    dispatch(updateGameStatus('READY'));
    dispatch(updateIsDirty(false));
    dispatch(updateSize({ width, height, bombCount }));

    setCount(bombCount);
    setIsCounterClick(false);
  }, [width, height, bombCount, dispatch]);

  const areaOpen = (x: number, y: number) => {
    const openedCells: [number, number][] = [];
    let isBombAround = false;

    NEIGHBORS.forEach(([wx, wy]) => {
      const nx = x + wx;
      const ny = y + wy;

      if (nx < 0 || ny < 0 || nx >= height || ny >= width) return;

      const status = boardStatus[nx][ny];

      if (status !== BOARD_STATUS.FLAG && status !== BOARD_STATUS.OPEN) {
        openedCells.push([nx, ny]);

        if (board[nx][ny] === BOARD_STATUS.BOMB) {
          isBombAround = true;
        }
      }
    });

    if (isBombAround) {
      dispatch(toggleShowingHints(openedCells));
      setTimeout(() => {
        dispatch(toggleShowingHints(openedCells));
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
      const result = checkIsOver();

      if (result) {
        console.log('over');
        showBoard(result);
      }
    }
  }, [gameStatus, checkIsOver, showBoard]);

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

    if (clickedLeft && clickedRight && boardStatus[x][y] === BOARD_STATUS.OPEN) {
      areaOpen(x, y);
      return;
    }

    if (boardStatus[x][y] === BOARD_STATUS.OPEN) {
      areaOpen(x, y);
      return;
    }

    if (boardStatus[x][y] === BOARD_STATUS.FLAG) return;
    if (gameStatus === 'READY') dispatch(updateGameStatus('START'));

    if (!isDirty) {
      init(x, y);

      return;
    }

    dispatch(openCell([x, y]));
  };

  const handleClickRight = (e: React.MouseEvent<HTMLDivElement>, x: number, y: number) => {
    e.preventDefault();

    if (boardStatus[x][y] === BOARD_STATUS.OPEN) return;
    if (gameStatus === 'WIN' || gameStatus === 'LOSE') return;
    if (gameStatus === 'READY') dispatch(updateGameStatus('START'));

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
