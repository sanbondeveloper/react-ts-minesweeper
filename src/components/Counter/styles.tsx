import styled from 'styled-components';

export const DisplayCount = styled.div<{ $count: number }>`
  width: 40%;
  color: ${(props) => props.$count === 0 && 'green'};
`;
