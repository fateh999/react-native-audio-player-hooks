import Video, { OnProgressData } from 'react-native-video';
import { BehaviorSubject } from 'rxjs';
import { REPEAT_MODES } from '../Types';
declare class PlayerController {
    ref: Video | undefined;
    currentAudio$: BehaviorSubject<any>;
    playList$: BehaviorSubject<any>;
    playListMap: any;
    unshuffledPlayList: any;
    paused$: BehaviorSubject<boolean>;
    buffering$: BehaviorSubject<boolean>;
    shuffled$: BehaviorSubject<boolean>;
    repeat$: BehaviorSubject<REPEAT_MODES>;
    progress$: BehaviorSubject<OnProgressData>;
    constructor();
    createRef: (ref: Video) => void;
    play: (id: string, currentPlaylist?: Array<any>) => void;
    pause: () => void;
    seek: (seconds: number) => void;
    toggle: () => void;
    next: () => void;
    prev: () => void;
    repeat: () => void;
    shuffle: () => void;
    _getShuffledArr: (arr: Array<any>) => any[];
    load: (playlist: Array<any>) => void;
    stop: () => void;
    formatTimePlayer: (seconds: number) => string;
    _addZeroToNumber: (num: number) => string | number;
}
export default PlayerController;
