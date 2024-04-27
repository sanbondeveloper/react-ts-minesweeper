import styled from 'styled-components';

export const BoardBox = styled.div<{ $width: number; $height: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$width}, 1fr);
  grid-template-rows: repeat(${(props) => props.$height}, 1fr);
  border-left: 1px solid #000;
  border-top: 1px solid #000;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GameStatus = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-weight: 700;
  font-size: 30px;
`;
