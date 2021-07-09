import {useEffect, useRef, useState} from 'react';
import {PLAYER} from '../constants';
import {usePausedStateType} from '../Types';
import PlayerManager from '../Utils/PlayerManager';

function usePausedState({
  keyName = PLAYER,
  onPausedStateChanged,
}: usePausedStateType = {}) {
  const [pausedState, setPausedState] = useState<boolean>(true);
  const keyNameRef = useRef(keyName);
  const onPausedStateChangedRef = useRef(onPausedStateChanged);

  useEffect(() => {
    const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
    const subscription = PlayerController.paused$.subscribe(_paused => {
      setPausedState(_paused);
      onPausedStateChangedRef.current &&
        onPausedStateChangedRef.current(_paused);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return pausedState;
}

export default usePausedState;
