import {useEffect, useRef, useState} from 'react';
import PlayerManager from '../Utils/PlayerManager';

function useAudio(keyName: string) {
  const [audio, setAudio] = useState<any>();
  const keyNameRef = useRef(keyName);

  useEffect(() => {
    const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
    const subscription = PlayerController.currentAudio$.subscribe(_audio => {
      setAudio(_audio);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return audio;
}

export default useAudio;
