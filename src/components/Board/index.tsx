import { Cell, Container } from './styles';
import { createBoardWithBombs } from '../../utils/func';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectBoard, selectBoardSize, selectBombCount, updateBoard } from '../../redux/slice/mapSlice';
import { selectIsDirty, updateIsDirty } from '../../redux/slice/gameSlice';

function Board() {
  const board = useAppSelector(selectBoard);
  const { height, width } = useAppSelector(selectBoardSize);
  const bombCount = useAppSelector(selectBombCount);
  const isDirty = useAppSelector(selectIsDirty);
  const dispatch = useAppDispatch();

  const handleClickCell = (x: number, y: number) => {
    if (!isDirty) {
      const newBoard = createBoardWithBombs({ width, height, bombCount, x, y });

      console.log(newBoard);

      dispatch(updateIsDirty(true));
      dispatch(updateBoard(newBoard));
    }
  };

  return (
    <Container $width={width} $height={height}>
      {board.map((row, i) =>
        row.map((_, j) => (
          <Cell key={`${i}-${j}`} onClick={() => handleClickCell(i, j)}>
            {_}
          </Cell>
        )),
      )}
    </Container>
  );
}

export default Board;
