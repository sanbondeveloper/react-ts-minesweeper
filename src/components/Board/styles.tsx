import styled, { css } from 'styled-components';

export const Container = styled.div<{ $width: number; $height: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$width}, 1fr);
  grid-template-rows: repeat(${(props) => props.$height}, 1fr);
`;
