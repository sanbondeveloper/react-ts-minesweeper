import { useAppDispatch } from '../redux/hooks';
import { updateGameStatus, updateIsDirty, updateLevel } from '../redux/slice/gameSlice';
import { updateSize } from '../redux/slice/mapSlice';
import { LevelType } from '../types/level';

export function useInit() {
  const dispatch = useAppDispatch();

  const setting = ({
    level,
    width,
    height,
    bombCount,
  }: {
    level: LevelType;
    width: number;
    height: number;
    bombCount: number;
  }) => {
    dispatch(updateLevel(level));
    dispatch(updateSize({ width, height, bombCount }));
    dispatch(updateIsDirty(false));
    dispatch(updateGameStatus('READY'));

    localStorage.setItem('level', JSON.stringify({ level, width, height, bombCount }));
  };

  return setting;
}
