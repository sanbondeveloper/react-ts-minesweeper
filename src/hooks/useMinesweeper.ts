import { useCallback, useEffect, useState } from 'react';
import { BOARD_STATUS } from '../lib/constants';
import { checkWin, createBoardWithBombs, openBoard, showAllBoard, showBombs } from '../lib/func';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectGameStatus, selectIsDirty, updateGameStatus, updateIsDirty } from '../redux/slice/gameSlice';
import {
  selectBoard,
  selectBoardSize,
  selectBoardStatus,
  selectBombCount,
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCount(bombCount);
  }, [bombCount]);

  const handleClickCell = (x: number, y: number) => {
    if (boardStatus[x][y] === BOARD_STATUS.FLAG || boardStatus[x][y] === BOARD_STATUS.OPEN) return;
    if (gameStatus === 'WIN' || gameStatus === 'LOSE') return;
    if (gameStatus === 'READY') dispatch(updateGameStatus('START'));

    if (!isDirty) {
      const newBoard = createBoardWithBombs({ width, height, bombCount, x, y });
      const newBoardStatus = openBoard({ board: newBoard, boardStatus, x, y });

      dispatch(updateIsDirty(true));
      dispatch(updateBoard(newBoard));
      dispatch(updateBoardStatus(newBoardStatus));

      return;
    }

    if (board[x][y] === BOARD_STATUS.BOMB) {
      const newBoardStatus = showBombs({ board, boardStatus });
      newBoardStatus[x][y] = BOARD_STATUS.RED;

      dispatch(updateIsDirty(false));
      dispatch(updateGameStatus('LOSE'));
      dispatch(updateBoardStatus(newBoardStatus));

      return;
    }

    const newBoardStatus = openBoard({ board, boardStatus, x, y });
    const isWin = checkWin({ board, boardStatus: newBoardStatus });

    dispatch(updateBoardStatus(newBoardStatus));

    if (isWin) {
      dispatch(updateGameStatus('WIN'));
    }
  };

  const handleToggleFlag = (e: React.MouseEvent<HTMLDivElement>, x: number, y: number) => {
    e.preventDefault();
    if (boardStatus[x][y] === BOARD_STATUS.OPEN) return;
    if (gameStatus === 'WIN' || gameStatus === 'LOSE') return;
    if (gameStatus === 'READY') dispatch(updateGameStatus('START'));

    const newBoardStatus = [...boardStatus.map((row) => [...row])];

    if (newBoardStatus[x][y] === BOARD_STATUS.FLAG) {
      newBoardStatus[x][y] = BOARD_STATUS.CLOSE;
      setCount(count + 1);
    } else {
      newBoardStatus[x][y] = BOARD_STATUS.FLAG;
      setCount(count - 1);
    }

    dispatch(updateBoardStatus(newBoardStatus));
  };

  const handleReset = useCallback(() => {
    dispatch(updateSize({ width, height, bombCount }));
    dispatch(updateIsDirty(false));
    dispatch(updateGameStatus('READY'));
    setCount(bombCount);
  }, [width, height, bombCount, dispatch]);

  const handleClickCounter = () => {
    if (count !== 0) return;

    const newBoardStatus = showAllBoard({ board, boardStatus });
    const isWin = checkWin({ board, boardStatus });

    dispatch(updateBoardStatus(newBoardStatus));

    if (isWin) {
      dispatch(updateGameStatus('WIN'));
    }
  };

  return {
    remaining: count,
    board,
    boardStatus,
    gameStatus,
    width,
    height,
    handleClickCell,
    handleToggleFlag,
    handleReset,
    handleClickCounter,
  };
}
