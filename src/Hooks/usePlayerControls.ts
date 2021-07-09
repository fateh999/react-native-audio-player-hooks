import { useCallback } from "react";
import { OnProgressData } from "react-native-video";
import PlayerManager from "../Utils/PlayerManager";

function usePlayerControls(keyName: string) {
  const PlayerController = PlayerManager.getPlayer(keyName);

  const onProgress = useCallback((progress: OnProgressData) => {
    PlayerController.progress$.next(progress);
  }, []);

  const loadPlaylist = useCallback((playlist: Array<any>) => {
    PlayerController.load(playlist);
  }, []);

  const playAudio = useCallback((id: string) => {
    PlayerController.play(id);
  }, []);

  return {
    onProgress,
    loadPlaylist,
    playAudio,
  };
}

export default usePlayerControls;
