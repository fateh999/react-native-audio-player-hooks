[![npm version](https://img.shields.io/npm/v/react-native-audio-player-hooks.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-audio-player-hooks)
[![npm downloads](https://img.shields.io/npm/dm/react-native-audio-player-hooks.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-audio-player-hooks)
[![npm](https://img.shields.io/npm/dt/react-native-audio-player-hooks.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-audio-player-hooks)
[![npm](https://img.shields.io/npm/l/react-native-audio-player-hooks?style=for-the-badge)](https://github.com/fateh999/react-native-audio-player-hooks/blob/master/LICENSE)

- Audio player hooks & Utility Classes to play audio files, using libraries react-native-video rxjs, with playlist handling, player controls.

## Dependencies Installation

```
yarn add rxjs react-native-video
```

or

```
npm i rxjs react-native-video
```

## Installation

```
yarn add react-native-audio-player-hooks
```

or

```
npm i react-native-audio-player-hooks
```

## Demo


![](player.gif)

## Usage

- Create a PlayerService file

```typescript
import { PlayerManager } from "react-native-audio-player-hooks";

PlayerManager.createPlayer();

// or we can create multiple players like

// PlayerManager.createPlayer('player1');

// PlayerManager.createPlayer('player2');

export const Player = PlayerManager.getPlayer();

// or similarly we can export created players

// export const Player1 = PlayerManager.getPlayer('player1');

// export const Player2 = PlayerManager.getPlayer('player2');
```

- Import in any file like index.js to instantiate the players

```js
import "./PlayerService";
```

- Load the player component in the respective screen

```jsx

import { AudioPlayer } from  'react-native-audio-player-hooks';



function  PlayerViewer () {

return (

<AudioPlayer  />

// or similarly we can load multiple players

// <AudioPlayer keyName={'player1'} />

// <AudioPlayer keyName={'player2'} />

};

}

```

- Use the Player instance we exported to control the player

```jsx

// This is the basic structure of the audio list that we will be loading in the player.

const  AUDIOS = [

{

// id is required

id:  '1',

name:  'Test',

// url is required

url:  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',

picture:  'https://picsum.photos/250/300',

// seconds: number

// Sometimes we get incorrect duration of audio from react-native-video so we can use this to send the duration beforehand.

},

];



function  PlayList () {

return (

<FlatList

data={AUDIOS}

ListHeaderComponent={() =>  <Box  h={10}  />}

renderItem={({item}) => (

// Some list item component

<PlaylistItem

item={item}

active={audio?.id === item.id}

// We will pass in the id and the audio list, if the audio list is loaded player will not reload the playlist, unless it is a new list. or alternatively we can use the Player.load(AUDIOS) to load the playlist & then just use Player.play(item.id).

onPress={() =>  Player.play(item.id, AUDIOS)}

/>

)}

flex={1}

/>

};

}

```

- Control the player using the following methods

- Player.toggle()

      (Toggles play / pause functionality of the current audio.)

- Player.next()

      (Plays next audio in the playlist.)

- Player.prev()

      (Plays previous audio in the playlist.)

- Player.repeat()

      (Toggles the repeat mode between 'all' | 'none' | 'single'.)

- Player.shuffle()

      (Shuffles the playlist.)

- Player.stop()

      (Closes the player and clears the playlist & current audio, this however does not removes the player instance so you can again load the playlist and play songs using same player.)

- Player.stopAudio()

      (Closes the player and clears only the current audio, so you don't need to load the playlist again.)

- Player.shuffle()

      (Shuffles the playlist.)

- Hooks to show the player progress and current state

  - useAudio(): any

        (Returns current active audio)

  - usePausedState(): boolean

        (Returns active audio paused state)

  - useBufferingState(): boolean

        (Returns active audio buffering state)

  - usePlayerProgress()
    `{ currentTime: number, playableDuration: number, seekableDuration: number}`

        (Returns active audio progress)

  - useRepeat(): 'all' | 'none' | 'single'

        (Returns repeat mode status)

  - useShuffledState(): boolean

        (Returns whether playlist is shuffled)

  - usePlaylist(): Array<any>

        (Returns the loaded playlist)

## Remote Player Control

- Install react-native-music-control & enable background mode on both platforms as mentioned in the doc.

```
yarn add react-native-music-control
```

- Set playInBackground prop as true in the AudioPlayer.

```jsx
<AudioPlayer playInBackground />
```

- Modify the Player Service like this and change the feature you need.

```typescript
import { PlayerManager } from "react-native-audio-player-hooks";
import MusicControl, { Command } from "react-native-music-control";

PlayerManager.createPlayer();
export const Player = PlayerManager.getPlayer();

MusicControl.enableControl("play", true);
MusicControl.enableControl("pause", true);
MusicControl.enableControl("stop", true);
MusicControl.enableControl("nextTrack", true);
MusicControl.enableControl("previousTrack", true);
MusicControl.enableControl("seekForward", true);
MusicControl.enableControl("seekBackward", true);
MusicControl.enableControl("seek", true);
MusicControl.enableControl("changePlaybackPosition", true);
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

MusicControl.on(Command.changePlaybackPosition, (playbackPosition) => {
  Player.seek(parseFloat(playbackPosition));
});

MusicControl.on(Command.seek, (playbackPosition) => {
  Player.seek(playbackPosition);
});

Player.progress$.subscribe((progress) => {
  MusicControl.updatePlayback({
    elapsedTime: progress.currentTime,
  });
});

Player.paused$.subscribe((paused) => {
  MusicControl.updatePlayback({
    state: paused ? MusicControl.STATE_PAUSED : MusicControl.STATE_PLAYING,
  });
});

Player.currentAudio$.subscribe((currentAudio) => {
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
```

## Basic Props

```typescript

import { ComponentProps } from  "react";

import  Video, { OnProgressData } from  "react-native-video";



export  type  AudioPlayerProps = Omit<ComponentProps<typeof  Video>, "source"> & {

keyName?: string;

};



export  type  REPEAT_MODES = "all" | "none" | "single";



export  type  useAudioType = {

keyName?: string;

onAudioChanged?: (currentAudio: any) =>  void;

};



export  type  usePausedStateType = {

keyName?: string;

onPausedStateChanged?: (\_paused: boolean) =>  void;

};



export  type  useBufferingStateType = {

keyName?: string;

onBufferingStateChanged?: (\_buffering: boolean) =>  void;

};



export  type  useShuffledStateType = {

keyName?: string;

onShuffledStateChanged?: (\_shuffled: boolean) =>  void;

};



export  type  usePlayerProgressType = {

keyName?: string;

onProgressChanged?: (\_progress: OnProgressData) =>  void;

};



export  type  usePlaylistType = {

keyName?: string;

onChangedPlaylist?: (\_playlist: Array<any>) =>  void;

};



export  type  useRepeatType = {

keyName?: string;

onRepeatChanged?: (\_repeat: REPEAT_MODES) =>  void;

};

```
