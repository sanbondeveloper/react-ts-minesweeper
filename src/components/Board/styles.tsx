import styled from 'styled-components';

export const Container = styled.div<{ $width: number; $height: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$width}, 1fr);
  grid-template-rows: repeat(${(props) => props.$height}, 1fr);
`;

export const Cell = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;
