import { Container } from './styles';
import { createBoardWithBombs, openBoard } from '../../utils/func';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectBoard,
  selectBoardSize,
  selectBombCount,
  selectBoardStatus,
  updateBoard,
  updateBoardStatus,
} from '../../redux/slice/mapSlice';
import { selectIsDirty, updateIsDirty } from '../../redux/slice/gameSlice';
import BoardCell from '../BoardCell';

function Board() {
  const board = useAppSelector(selectBoard);
  // const height = board.length;
  // const width = board[0].length;
  const { height, width } = useAppSelector(selectBoardSize);
  const bombCount = useAppSelector(selectBombCount);
  const boardStatus = useAppSelector(selectBoardStatus);
  const isDirty = useAppSelector(selectIsDirty);
  const dispatch = useAppDispatch();

  const handleClickCell = (x: number, y: number) => {
    if (!isDirty) {
      const newBoard = createBoardWithBombs({ width, height, bombCount, x, y });
      const newBoardStatus = openBoard({ board: newBoard, boardStatus, x, y });

      dispatch(updateIsDirty(true));
      dispatch(updateBoard(newBoard));
      dispatch(updateBoardStatus(newBoardStatus));

      return;
    }
  };

  return (
    <Container $width={width} $height={height}>
      {board.map((row, i) =>
        row.map((count, j) => (
          <div key={`${i}-${j}`} onClick={() => handleClickCell(i, j)}>
            <BoardCell show={boardStatus[i][j] === 0} count={count} />
          </div>
        )),
      )}
    </Container>
  );
}

export default Board;
