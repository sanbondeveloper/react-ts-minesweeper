import styled, { css } from 'styled-components';
import { BOARD_STATUS } from '../../lib/constants';

const color = ['', 'blue', 'green', 'red', 'yellow', 'brown', 'orange', 'indigo', 'purple'];

export const Cell = styled.div<{ $show: boolean; $count: number; $status: number }>`
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  color: ${(props) => props.$show && color[props.$count]};
  font-weight: 700;

  .x {
    color: red;
    font-size: 20px;
    position: absolute;
    display: none;
  }

  ${(props) =>
    props.$show &&
    css`
      background-color: #fff;
      box-shadow: none;
    `}

  ${(props) =>
    props.$status === BOARD_STATUS.NOTBOMB &&
    css`
      color: inherit;

      .x {
        display: block;
        top: 1px;
      }
    `}

  ${(props) =>
    props.$status === BOARD_STATUS.RED &&
    css`
      background-color: red;
    `}
`;
