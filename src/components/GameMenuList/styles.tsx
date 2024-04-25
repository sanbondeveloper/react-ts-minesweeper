import styled from 'styled-components';

export const MenuList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  background-color: #fff;
  padding: 0 3px;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;

  .ico-check {
    width: 20px;
  }

  & + li {
    padding-top: 5px;
  }
`;
