import React, { useRef } from 'react';

import { ButtonWrapper, InputWrapper, TitleWrapper } from './styles';
import { useAppDispatch } from '../../redux/hooks';
import { useInit } from '../../hooks/useInit';
import { updateModal } from '../../redux/slice/modalSlice';

interface Props {
  onClose: () => void;
}

const CustomSetup = React.memo(function CustomSetup({ onClose }: Props) {
  const inputHeight = useRef<HTMLInputElement>(null);
  const inputWidth = useRef<HTMLInputElement>(null);
  const inputBombs = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const setting = useInit();

  const handleOk = () => {
    const h = Number(inputHeight.current?.value || 0);
    const w = Number(inputWidth.current?.value || 0);
    const cnt = Number(inputBombs.current?.value || 0);
    const limit = Math.floor((h * w) / 3);

    if (h < 1 || h > 100 || w < 1 || w > 100 || limit < cnt) {
      alert(`
        Minesweeper dimensions invalid:
        Game Height: from 1 to 100
        Game width: from 1 to 100
        Bombs: Max 1/3 of total squares
      `);

      return;
    }

    setting({ level: 'Custom', width: w, height: h, bombCount: cnt });
    dispatch(updateModal(false));
  };

  return (
    <>
      <TitleWrapper>
        <h1>Custom Game Setup</h1>
        <button onClick={onClose}>CLOSE</button>
      </TitleWrapper>

      <InputWrapper>
        <label htmlFor="height">Game Height:</label>
        <input type="text" name="height" ref={inputHeight} />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="width">Game Width:</label>
        <input type="text" name="width" ref={inputWidth} />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="bombs">Number of Bombs:</label>
        <input type="text" name="bombs" ref={inputBombs} />
      </InputWrapper>

      <ButtonWrapper>
        <button onClick={handleOk}>ok</button>
      </ButtonWrapper>
    </>
  );
});

export default CustomSetup;
