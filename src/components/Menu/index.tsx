import { useState, useEffect } from 'react';

import { Container, MenuButton } from './styles';
import GameMenuList from '../GameMenuList';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Container role="menu">
      <MenuButton onClick={handleClick}>Game</MenuButton>
      <GameMenuList isOpen={isOpen} />
    </Container>
  );
}

export default Menu;
