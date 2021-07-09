import Video from 'react-native-video';
import {BehaviorSubject} from 'rxjs';

class PlayerController {
  ref: Video | undefined = undefined;
  currentAudio$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  playList$: BehaviorSubject<any> = new BehaviorSubject([]);
  playListMap: any = {};
  paused$ = new BehaviorSubject(true);
  progress$ = new BehaviorSubject({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });

  constructor() {}

  createRef = (ref: Video) => {
    this.ref = ref;
  };

  play = (id: string) => {
    const currentAudio = this.currentAudio$.getValue();
    if (id === currentAudio?.id) {
      this.currentAudio$.next(currentAudio);
      this.toggle();
    } else {
      const audio = this.playListMap[id];
      if (audio) {
        this.currentAudio$.next(audio);
        this.paused$.next(false);
        this.seek(0);
      }
    }
  };

  pause = (id: string) => {
    const currentAudio = this.currentAudio$.getValue();
    if (id === currentAudio?.id) {
      this.toggle();
    } else {
      this.paused$.next(true);
    }
  };

  seek = (seconds: number) => {
    this.ref?.seek(seconds);
  };

  toggle = () => {
    const isPaused = this.paused$.getValue();
    this.paused$.next(!isPaused);
  };

  next = () => {
    const currentAudio = this.currentAudio$.getValue();
    if (currentAudio) {
      const playList = this.playList$.getValue();
      const currentAudioIndex = this.playListMap[currentAudio.id].index;
      const nextAudioIndex = currentAudioIndex + 1;
      if (nextAudioIndex <= playList.length - 1) {
        this.play(playList[nextAudioIndex].id);
      } else {
        this.stop();
      }
    }
  };

  prev = () => {
    const currentAudio = this.currentAudio$.getValue();
    if (currentAudio) {
      const playList = this.playList$.getValue();
      const currentAudioIndex = this.playListMap[currentAudio.id].index;
      const prevAudioIndex = currentAudioIndex - 1;
      if (prevAudioIndex >= 0) {
        this.play(playList[prevAudioIndex].id);
      }
    }
  };

  repeat = (mode: 'all' | 'single' | 'none') => {
    console.log({mode});
  };

  shuffle = () => {};

  add = () => {};

  remove = () => {};

  load = (playlist: Array<any>) => {
    playlist.forEach((audio, index) => {
      this.playListMap[audio.id] = {...audio, index};
    });
    this.playList$.next(playlist);
  };

  stop = () => {
    this.currentAudio$.next(undefined);
  };

  formatTimePlayer = (seconds: number) => {
    return `${new Date(
      seconds * 1000,
    ).getUTCMinutes()} : ${this.addZeroToNumber(
      new Date(seconds * 1000).getUTCSeconds(),
    )}`;
  };

  addZeroToNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };
}

export default PlayerController;
