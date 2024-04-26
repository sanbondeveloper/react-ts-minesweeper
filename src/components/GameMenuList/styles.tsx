import styled from 'styled-components';

export const MenuList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  z-index: 100;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  background-color: #fff;
  padding: 10px 3px;
  border: 1px solid #000;
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
