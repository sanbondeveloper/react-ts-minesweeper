import { DisplayCount } from './styles';
import { checkWin, showAllBoard } from '../../lib/func';
import { useAppDispatch } from '../../redux/hooks';
import { updateBoardStatus } from '../../redux/slice/mapSlice';
import { updateGameStatus } from '../../redux/slice/gameSlice';

interface Props {
  count: number;
  board: number[][];
  boardStatus: number[][];
}

function Counter({ count, board, boardStatus }: Props) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (count !== 0) return;

    const newBoardStatus = showAllBoard({ board, boardStatus });
    const isWin = checkWin({ board, boardStatus });

    dispatch(updateBoardStatus(newBoardStatus));

    if (isWin) {
      dispatch(updateGameStatus('WIN'));
    }
  };

  return (
    <DisplayCount $count={count} onClick={handleClick}>
      {count}
    </DisplayCount>
  );
}

export default Counter;
