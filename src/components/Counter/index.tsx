import { DisplayCount } from './styles';

interface Props {
  remaining: number;
  onClick: () => void;
}

function Counter({ remaining, onClick }: Props) {
  return (
    <DisplayCount $count={remaining} onClick={onClick}>
      {remaining}
    </DisplayCount>
  );
}

export default Counter;
