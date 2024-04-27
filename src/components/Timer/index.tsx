import React, { useState, useEffect, useRef } from 'react';

import { DisplayTime } from './styles';
import { GameStatusType } from '../../types/gameStatus';

interface Props {
  gameStatus: GameStatusType;
}

const Timer = React.memo(function Timer({ gameStatus }: Props) {
  const [seconds, setSeconds] = useState(0);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('./timerWorker.ts', import.meta.url));

    workerRef.current.addEventListener('message', (event) => {
      setSeconds(event.data);
    });

    return () => {
      workerRef.current?.postMessage('stop');
      workerRef.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (gameStatus === 'WIN' || gameStatus === 'LOSE' || gameStatus === 'READY') {
      workerRef.current?.postMessage('stop');
      return;
    }

    workerRef.current?.postMessage('start');
  }, [gameStatus]);

  return <DisplayTime>{`${seconds.toString().padStart(3, '0')}`}</DisplayTime>;
});

export default Timer;
