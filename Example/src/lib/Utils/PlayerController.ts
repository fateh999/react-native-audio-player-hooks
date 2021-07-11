import Video, {OnProgressData} from 'react-native-video';
import {BehaviorSubject} from 'rxjs';
import {REPEAT_MODES} from '../Types';

class PlayerController {
  ref: Video | undefined = undefined;
  currentAudio$ = new BehaviorSubject<any>(undefined);
  playList$ = new BehaviorSubject<any>([]);
  playListMap: any = {};
  unshuffledPlayList: any = [];
  paused$ = new BehaviorSubject<boolean>(true);
  buffering$ = new BehaviorSubject<boolean>(false);
  shuffled$ = new BehaviorSubject<boolean>(false);
  repeat$ = new BehaviorSubject<REPEAT_MODES>('none');
  progress$ = new BehaviorSubject<OnProgressData>({
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0,
  });

  constructor() {}

  createRef = (ref: Video) => {
    this.ref = ref;
  };

  play = (id: string, currentPlaylist: Array<any> = []) => {
    const currentAudio = this.currentAudio$.getValue();
    if (id === currentAudio?.id) {
      this.paused$.next(!this.paused$.getValue());
    } else {
      const audio = this.playListMap[id];
      if (audio) {
        this.currentAudio$.next(audio);
        this.paused$.next(false);
        this.seek(0);
      } else {
        this.load(currentPlaylist);
        const _audio = this.playListMap[id];
        this.currentAudio$.next(_audio);
        this.paused$.next(false);
      }
    }
  };

  pause = () => {
    this.paused$.next(true);
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
      const repeat = this.repeat$.getValue();
      if (repeat !== 'single') {
        const currentAudioIndex = this.playListMap[currentAudio.id].index;
        const nextAudioIndex = currentAudioIndex + 1;
        if (nextAudioIndex <= playList.length - 1) {
          this.play(playList[nextAudioIndex].id);
        } else if (repeat === 'all') {
          this.play(playList[0].id);
        } else {
          this.stop();
        }
      }
    }
  };

  prev = () => {
    const currentAudio = this.currentAudio$.getValue();
    if (currentAudio) {
      const playList = this.playList$.getValue();
      const repeat = this.repeat$.getValue();
      if (repeat !== 'single') {
        const currentAudioIndex = this.playListMap[currentAudio.id].index;
        const prevAudioIndex = currentAudioIndex - 1;
        if (prevAudioIndex >= 0) {
          this.play(playList[prevAudioIndex].id);
        } else if (repeat === 'all') {
          this.play(playList[playList.length - 1].id);
        }
      }
    }
  };

  repeat = () => {
    const repeat = this.repeat$.getValue();
    switch (repeat) {
      case 'all':
        this.repeat$.next('none');
        break;
      case 'none':
        this.repeat$.next('single');
        break;
      case 'single':
        this.repeat$.next('all');
        break;
    }
  };

  shuffle = () => {
    if (this.shuffled$.getValue()) {
      this.shuffled$.next(false);
      this.load(this.unshuffledPlayList);
    } else {
      this.shuffled$.next(true);
      this.unshuffledPlayList = JSON.parse(
        JSON.stringify(this.playList$.getValue()),
      );
      const newPlaylist = this._getShuffledArr(this.unshuffledPlayList);
      this.load(newPlaylist);
    }
  };

  _getShuffledArr = (arr: Array<any>) => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  };

  load = (playlist: Array<any>) => {
    playlist.forEach((audio, index) => {
      this.playListMap[audio.id] = {...audio, index};
    });
    this.playList$.next(playlist);
  };

  stop = () => {
    this.playList$.next(JSON.parse(JSON.stringify([])));
    this.playListMap = JSON.parse(JSON.stringify({}));
    this.currentAudio$.next(undefined);
  };

  formatTimePlayer = (seconds: number) => {
    return `${this._addZeroToNumber(
      new Date(seconds * 1000).getUTCMinutes(),
    )} : ${this._addZeroToNumber(new Date(seconds * 1000).getUTCSeconds())}`;
  };

  _addZeroToNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };
}

export default PlayerController;
