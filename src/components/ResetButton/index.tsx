import React from 'react';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { RiEmotionUnhappyLine } from 'react-icons/ri';
import { TbMoodCrazyHappy } from 'react-icons/tb';

import { Wrapper } from './styles';
import { GameStatusType } from '../../types/gameStatus';

interface Props {
  gameStatus: GameStatusType;
  onReset: () => void;
}

const ResetButton = React.memo(function ResetButton({ gameStatus, onReset }: Props) {
  return (
    <Wrapper onClick={onReset}>
      {gameStatus === 'WIN' ? (
        <TbMoodCrazyHappy style={{ fontSize: '20px' }} />
      ) : gameStatus === 'LOSE' ? (
        <RiEmotionUnhappyLine style={{ fontSize: '20px' }} />
      ) : (
        <RiEmotionHappyLine style={{ fontSize: '20px' }} />
      )}
    </Wrapper>
  );
});

export default ResetButton;
