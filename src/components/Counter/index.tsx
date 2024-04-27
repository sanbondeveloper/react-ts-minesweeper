import { DisplayCount } from './styles';

interface Props {
  count: number;
}

function Counter({ count }: Props) {
  return <DisplayCount>{count.toString().padStart(3, '0')}</DisplayCount>;
}

export default Counter;
