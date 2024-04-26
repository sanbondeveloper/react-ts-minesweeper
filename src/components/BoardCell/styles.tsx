import styled, { css } from 'styled-components';

export const Cell = styled.div<{ $show: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); */

  ${(props) =>
    props.$show &&
    css`
      background-color: #fff;
      box-shadow: none;
    `}
`;
