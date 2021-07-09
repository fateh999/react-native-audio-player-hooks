import {useEffect, useRef, useState} from 'react';
import PlayerManager from '../Utils/PlayerManager';

function usePlaylist(keyName: string) {
  const [playlist, setPlaylist] = useState<Array<any>>();
  const keyNameRef = useRef(keyName);

  useEffect(() => {
    const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
    const subscription = PlayerController.playList$.subscribe(_playlist => {
      setPlaylist(_playlist);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return playlist;
}

export default usePlaylist;
