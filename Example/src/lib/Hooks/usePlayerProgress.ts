import {useEffect, useRef, useState} from 'react';
import {OnProgressData} from 'react-native-video';
import PlayerManager from '../Utils/PlayerManager';

function usePlayerProgress(keyName: string) {
  const [progress, setProgress] = useState<OnProgressData>({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });
  const keyNameRef = useRef(keyName);

  useEffect(() => {
    const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
    const subscription = PlayerController.progress$.subscribe(_progress => {
      setProgress(_progress);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return progress;
}

export default usePlayerProgress;
