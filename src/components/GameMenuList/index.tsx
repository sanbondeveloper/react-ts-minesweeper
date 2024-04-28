import { AiOutlineCheck } from 'react-icons/ai';

import { MenuList, MenuItem } from './styles';
import { LevelType } from '../../types/level';
import { LEVEL_SIZE } from '../../lib/constants';
import { useInit } from '../../hooks/useInit';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectGameLevel } from '../../redux/slice/gameSlice';
import { updateModal } from '../../redux/slice/modalSlice';

const Menu_List: LevelType[] = ['Beginner', 'Intermediate', 'Expert', 'Custom'];

interface Props {
  isOpen: boolean;
}

function GameMenuList({ isOpen }: Props) {
  const level = useAppSelector(selectGameLevel);
  const dispatch = useAppDispatch();
  const setting = useInit();

  const handleChangeLevel = (newLevel: LevelType) => {
    if (newLevel === 'Custom') {
      dispatch(updateModal(true));
      return;
    }

    const [height, width, bombCount] = LEVEL_SIZE[newLevel];

    setting({ level: newLevel, width, height, bombCount });
  };

  return (
    <MenuList $isOpen={isOpen}>
      {Menu_List.map((menu) => (
        <MenuItem key={menu} onClick={handleChangeLevel.bind(null, menu)}>
          <div className="ico-check">{level === menu && <AiOutlineCheck />}</div>
          {menu}
        </MenuItem>
      ))}
    </MenuList>
  );
}

export default GameMenuList;
