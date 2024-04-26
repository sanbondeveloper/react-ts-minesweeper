import { useState } from 'react';

import { BoardBox, Header, Wrapper } from './styles';
import { BOARD_STATUS } from '../../lib/constants';
import { checkWin, createBoardWithBombs, openBoard, showBombs } from '../../lib/func';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectBoard,
  selectBoardSize,
  selectBombCount,
  selectBoardStatus,
  updateBoard,
  updateBoardStatus,
} from '../../redux/slice/mapSlice';
import { selectGameStatus, selectIsDirty, updateGameStatus, updateIsDirty } from '../../redux/slice/gameSlice';
import BoardCell from '../BoardCell';
import Counter from '../Counter';

function Board() {
  const gameStatus = useAppSelector(selectGameStatus);
  const board = useAppSelector(selectBoard);
  const { height, width } = useAppSelector(selectBoardSize);
  const bombCount = useAppSelector(selectBombCount);
  const boardStatus = useAppSelector(selectBoardStatus);
  const isDirty = useAppSelector(selectIsDirty);
  const [count, setCount] = useState(bombCount);
  const dispatch = useAppDispatch();

  const handleClickCell = (x: number, y: number) => {
    if (gameStatus === 'WIN' || gameStatus === 'LOSE') return;
    if (boardStatus[x][y] === BOARD_STATUS.FLAG) return;

    if (gameStatus === 'READY') {
      dispatch(updateGameStatus('START'));
    }

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

    if (gameStatus === 'WIN' || gameStatus === 'LOSE') return;

    if (gameStatus === 'READY') {
      dispatch(updateGameStatus('START'));
    }

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

  return (
    <>
      <Header>
        <Counter count={count} />
        {gameStatus}
      </Header>
      <BoardBox $width={width} $height={height}>
        {board.map((row, i) =>
          row.map((value, j) => (
            <Wrapper
              key={`${i}-${j}`}
              onClick={() => handleClickCell(i, j)}
              onContextMenu={(e) => handleToggleFlag(e, i, j)}
            >
              <BoardCell value={value} status={boardStatus[i][j]} />
            </Wrapper>
          )),
        )}
      </BoardBox>
    </>
  );
}

export default Board;
