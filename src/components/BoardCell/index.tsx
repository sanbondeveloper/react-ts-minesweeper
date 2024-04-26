import { Cell } from './styles';

interface Props {
  show: boolean;
  count: number;
}

function BoardCell({ show, count }: Props) {
  return <Cell $show={show}>{count}</Cell>;
}

export default BoardCell;
