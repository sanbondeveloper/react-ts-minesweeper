import { Container, Wrapper } from './styles';
import { createBoardWithBombs, openBoard, showBombs } from '../../utils/func';
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
import { useState } from 'react';

function Board() {
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const gameStatus = useAppSelector(selectGameStatus);
  const board = useAppSelector(selectBoard);
  const { height, width } = useAppSelector(selectBoardSize);
  const bombCount = useAppSelector(selectBombCount);
  const boardStatus = useAppSelector(selectBoardStatus);
  const isDirty = useAppSelector(selectIsDirty);
  const dispatch = useAppDispatch();

  const handleClickCell = (x: number, y: number) => {
    if (gameStatus !== 'NONE') return;

    if (!isDirty) {
      const newBoard = createBoardWithBombs({ width, height, bombCount, x, y });
      const newBoardStatus = openBoard({ board: newBoard, boardStatus, x, y });

      dispatch(updateIsDirty(true));
      dispatch(updateBoard(newBoard));
      dispatch(updateBoardStatus(newBoardStatus));

      return;
    }

    if (board[x][y] === -1) {
      const newBoardStatus = showBombs({ board, boardStatus });

      dispatch(updateIsDirty(false));
      dispatch(updateGameStatus('LOSS'));
      dispatch(updateBoardStatus(newBoardStatus));
      setPrevX(x);
      setPrevY(y);

      return;
    }
  };

  return (
    <Container $width={width} $height={height}>
      {board.map((row, i) =>
        row.map((count, j) => (
          <Wrapper key={`${i}-${j}`} onClick={() => handleClickCell(i, j)}>
            <BoardCell
              show={boardStatus[i][j] === 0}
              count={count}
              red={gameStatus === 'LOSS' && prevX === i && prevY === j}
            />
          </Wrapper>
        )),
      )}
    </Container>
  );
}

export default Board;
