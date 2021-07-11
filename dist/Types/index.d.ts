import { ComponentProps } from "react";
import Video, { OnProgressData } from "react-native-video";
export declare type AudioPlayerProps = Omit<ComponentProps<typeof Video>, "source"> & {
    keyName?: string;
};
export declare type REPEAT_MODES = "all" | "none" | "single";
export declare type useAudioType = {
    keyName?: string;
    onAudioChanged?: (currentAudio: any) => void;
};
export declare type usePausedStateType = {
    keyName?: string;
    onPausedStateChanged?: (_paused: boolean) => void;
};
export declare type useBufferingStateType = {
    keyName?: string;
    onBufferingStateChanged?: (_buffering: boolean) => void;
};
export declare type useShuffledStateType = {
    keyName?: string;
    onShuffledStateChanged?: (_shuffled: boolean) => void;
};
export declare type usePlayerProgressType = {
    keyName?: string;
    onProgressChanged?: (_progress: OnProgressData) => void;
};
export declare type usePlaylistType = {
    keyName?: string;
    onChangedPlaylist?: (_playlist: Array<any>) => void;
};
export declare type useRepeatType = {
    keyName?: string;
    onRepeatChanged?: (_repeat: REPEAT_MODES) => void;
};
