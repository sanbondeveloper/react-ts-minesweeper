import styled, { css } from 'styled-components';

export const Cell = styled.div<{ $show: boolean; $red: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;

  ${(props) =>
    props.$show &&
    css`
      background-color: #fff;
      box-shadow: none;
      border: none;
    `}

  ${(props) =>
    props.$red &&
    css`
      background-color: red;
    `}
`;
