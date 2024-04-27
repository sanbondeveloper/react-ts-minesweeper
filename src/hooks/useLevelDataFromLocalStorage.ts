import { useState, useEffect } from 'react';

import { useAppDispatch } from '../redux/hooks';
import { updateLevel } from '../redux/slice/gameSlice';
import { updateSize } from '../redux/slice/mapSlice';

export function useLevelDataFromLocalStorage() {
  const [load, setLoad] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const levelData = localStorage.getItem('level');

    if (levelData) {
      const { level, width, height, bombCount } = JSON.parse(levelData);

      dispatch(updateLevel(level));
      dispatch(updateSize({ width, height, bombCount }));
    }

    setLoad(true);
  }, [dispatch]);

  return load;
}
