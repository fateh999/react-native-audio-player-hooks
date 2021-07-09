import {useCallback} from 'react';
import {OnProgressData} from 'react-native-video';
import PlayerManager from '../Utils/PlayerManager';

function usePlayerControls(keyName: string) {
  const onProgress = useCallback(
    (progress: OnProgressData) => {
      const PlayerController = PlayerManager.getPlayer(keyName);
      if (PlayerController) {
        PlayerController.progress$.next(progress);
      }
    },
    [keyName],
  );

  const loadPlaylist = useCallback(
    (playlist: Array<any>) => {
      const PlayerController = PlayerManager.getPlayer(keyName);
      if (PlayerController) {
        PlayerController.load(playlist);
      }
    },
    [keyName],
  );

  const playAudio = useCallback(
    (id: string) => {
      const PlayerController = PlayerManager.getPlayer(keyName);
      if (PlayerController) {
        PlayerController.play(id);
      }
    },
    [keyName],
  );

  return {
    onProgress,
    loadPlaylist,
    playAudio,
  };
}

export default usePlayerControls;
