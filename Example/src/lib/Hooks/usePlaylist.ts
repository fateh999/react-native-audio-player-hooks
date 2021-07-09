import {useEffect, useRef, useState} from 'react';
import {PLAYER} from '../constants';
import {usePlaylistType} from '../Types';
import PlayerManager from '../Utils/PlayerManager';

function usePlaylist({
  keyName = PLAYER,
  onChangedPlaylist,
}: usePlaylistType = {}) {
  const [playlist, setPlaylist] = useState<Array<any>>();
  const keyNameRef = useRef(keyName);
  const onChangedPlaylistRef = useRef(onChangedPlaylist);

  useEffect(() => {
    const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
    const subscription = PlayerController.playList$.subscribe(_playlist => {
      setPlaylist(_playlist);
      onChangedPlaylistRef.current && onChangedPlaylistRef.current(_playlist);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return playlist;
}

export default usePlaylist;
