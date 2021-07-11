import {useEffect, useRef, useState} from 'react';
import {PLAYER} from '../constants';
import {useAudioType} from '../Types';
import PlayerManager from '../Utils/PlayerManager';

function useAudio({keyName = PLAYER, onAudioChanged}: useAudioType = {}) {
  const [audio, setAudio] = useState<any>();
  const keyNameRef = useRef(keyName);
  const onAudioChangedRef = useRef(onAudioChanged);

  useEffect(() => {
    const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
    const subscription = PlayerController.currentAudio$.subscribe(_audio => {
      setAudio(_audio);
      onAudioChangedRef.current && onAudioChangedRef.current(_audio);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return audio;
}

export default useAudio;
