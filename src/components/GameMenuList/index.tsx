import { AiOutlineCheck } from 'react-icons/ai';

import { MenuList, MenuItem } from './styles';
import { LEVEL_SIZE } from '../../lib/constants';
import { LevelType } from '../../types/level';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectGameLevel, updateGameStatus, updateIsDirty, updateLevel } from '../../redux/slice/gameSlice';
import { updateSize } from '../../redux/slice/mapSlice';
import { updateModal } from '../../redux/slice/modalSlice';

const Menu_List: LevelType[] = ['Beginner', 'Intermediate', 'Expert', 'Custom'];

interface Props {
  isOpen: boolean;
}

function GameMenuList({ isOpen }: Props) {
  const level = useAppSelector(selectGameLevel);
  const dispatch = useAppDispatch();

  const handleChangeLevel = (newLevel: LevelType) => {
    if (newLevel === 'Custom') {
      dispatch(updateModal(true));
      return;
    }

    const [height, width, bombCount] = LEVEL_SIZE[newLevel];

    dispatch(updateLevel(newLevel));
    dispatch(updateSize({ width, height, bombCount }));
    dispatch(updateIsDirty(false));
    dispatch(updateGameStatus('READY'));

    localStorage.setItem('level', JSON.stringify({ level: newLevel, width, height, bombCount }));
  };

  return (
    <MenuList $isOpen={isOpen}>
      {Menu_List.map((menu) => (
        <MenuItem key={menu} onClick={() => handleChangeLevel(menu)}>
          <div className="ico-check">{level === menu && <AiOutlineCheck />}</div>
          {menu}
        </MenuItem>
      ))}
    </MenuList>
  );
}

export default GameMenuList;
