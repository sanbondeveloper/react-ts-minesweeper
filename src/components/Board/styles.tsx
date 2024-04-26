import styled from 'styled-components';

export const Container = styled.div<{ $width: number; $height: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$width}, 1fr);
  grid-template-rows: repeat(${(props) => props.$height}, 1fr);
  border-left: 1px solid #000;
  border-top: 1px solid #000;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
