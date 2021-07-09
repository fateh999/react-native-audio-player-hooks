import {useEffect, useRef, useState} from 'react';
import PlayerManager from '../Utils/PlayerManager';

function usePausedState(keyName: string) {
  const [pausedState, setPausedState] = useState<boolean>(true);
  const keyNameRef = useRef(keyName);

  useEffect(() => {
    const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
    const subscription = PlayerController.paused$.subscribe(_paused => {
      setPausedState(_paused);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return pausedState;
}

export default usePausedState;
