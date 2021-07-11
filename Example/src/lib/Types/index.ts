import {OnProgressData} from 'react-native-video';

export type REPEAT_MODES = 'all' | 'none' | 'single';

export type useAudioType = {
  keyName?: string;
  onAudioChanged?: (currentAudio: any) => void;
};

export type usePausedStateType = {
  keyName?: string;
  onPausedStateChanged?: (_paused: boolean) => void;
};

export type useBufferingStateType = {
  keyName?: string;
  onBufferingStateChanged?: (_buffering: boolean) => void;
};

export type useShuffledStateType = {
  keyName?: string;
  onShuffledStateChanged?: (_shuffled: boolean) => void;
};

export type usePlayerProgressType = {
  keyName?: string;
  onProgressChanged?: (_progress: OnProgressData) => void;
};

export type usePlaylistType = {
  keyName?: string;
  onChangedPlaylist?: (_playlist: Array<any>) => void;
};

export type useRepeatType = {
  keyName?: string;
  onRepeatChanged?: (_repeat: REPEAT_MODES) => void;
};
