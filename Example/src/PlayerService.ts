import {PlayerManager} from 'react-native-audio-player-hooks';
import MusicControl, {Command} from 'react-native-music-control';

PlayerManager.createPlayer();
export const Player = PlayerManager.getPlayer();

MusicControl.enableControl('play', true);
MusicControl.enableControl('pause', true);
MusicControl.enableControl('stop', true);
MusicControl.enableControl('nextTrack', true);
MusicControl.enableControl('previousTrack', true);
MusicControl.enableControl('seekForward', true);
MusicControl.enableControl('seekBackward', true);
MusicControl.enableControl('seek', true);
MusicControl.enableControl('changePlaybackPosition', true);
MusicControl.enableBackgroundMode(true);

MusicControl.on(Command.play, () => {
  const currentAudio = Player.currentAudio$.getValue();
  Player.play(currentAudio?.id);
});

MusicControl.on(Command.pause, () => {
  Player.pause();
});

MusicControl.on(Command.stop, () => {
  Player.stop();
});

MusicControl.on(Command.nextTrack, () => {
  Player.next();
});

MusicControl.on(Command.previousTrack, () => {
  Player.prev();
});

MusicControl.on(Command.changePlaybackPosition, playbackPosition => {
  Player.seek(parseFloat(playbackPosition));
});

MusicControl.on(Command.seek, playbackPosition => {
  Player.seek(playbackPosition);
});

Player.progress$.subscribe(progress => {
  MusicControl.updatePlayback({
    elapsedTime: progress.currentTime,
  });
});

Player.paused$.subscribe(paused => {
  MusicControl.updatePlayback({
    state: paused ? MusicControl.STATE_PAUSED : MusicControl.STATE_PLAYING,
  });
});

Player.currentAudio$.subscribe(currentAudio => {
  if (currentAudio) {
    MusicControl.setNowPlaying({
      title: currentAudio?.name,
      artwork: currentAudio?.picture,
      duration: currentAudio?.seconds,
    });
  } else {
    MusicControl.resetNowPlaying();
  }
});
