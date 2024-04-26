import { BiSolidBomb } from 'react-icons/bi';

import { Cell } from './styles';

interface Props {
  show: boolean;
  count: number;
  red: boolean;
}

function BoardCell({ show, count, red }: Props) {
  return (
    <Cell $show={show} $red={red}>
      {show ? count === -1 ? <BiSolidBomb /> : count : ''}
    </Cell>
  );
}

export default BoardCell;
