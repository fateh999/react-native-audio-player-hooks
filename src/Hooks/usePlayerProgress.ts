import { useEffect, useState } from "react";
import { OnProgressData } from "react-native-video";
import PlayerManager from "../Utils/PlayerManager";

function usePlayerProgress(keyName: string) {
  const [progress, setProgress] = useState<OnProgressData>();

  useEffect(() => {
    const PlayerController = PlayerManager.getPlayer(keyName);
    const subscription = PlayerController.progress$.subscribe((_progress) => {
      setProgress(_progress);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return progress;
}

export default usePlayerProgress;
