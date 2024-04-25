import { Cell, Container } from './styles';
import { useAppSelector } from '../../redux/hooks';
import { selectBoard, selectBoardSize } from '../../redux/slice/mapSlice';

function Board() {
  const board = useAppSelector(selectBoard);
  const { height, width } = useAppSelector(selectBoardSize);

  return (
    <Container $width={width} $height={height}>
      {board.map((row) => row.map((cell) => <Cell></Cell>))}
    </Container>
  );
}

export default Board;
