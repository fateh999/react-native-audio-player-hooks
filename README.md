# react-native-audio-player

- Audio player hooks & Utility Classes to play audio files, using libraries react-native-video rxjs, with playlist handling, player controls.

## Dependencies Installation

```bash
    yarn add rxjs react-native-video
```

or

```
    npm i rxjs react-native-video
```

## Installation

```bash
    yarn add react-native-audio-player
```

or

```
    npm i react-native-audio-player
```

## Usage

- Create a PlayerService file

```typescript
import { PlayerManager } from "react-native-audio-player";

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
    import { AudioPlayer } from 'react-native-audio-player';

    function PlayerViewer () {
        return (
            <AudioPlayer />
            // or similarly we can load multiple players
            // <AudioPlayer keyName={'player1'} />
            // <AudioPlayer keyName={'player2'} />
        };
    }
```

- Use the Player instance we exported to control the player

```jsx
    // This is the basic structure of the audio list that we will be loading in the player.
    const AUDIOS = [
        {
            // id is required
            id: '1',
            name: 'Test',
            // url is required
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            picture: 'https://picsum.photos/250/300',
            // seconds: number
            // Sometimes we get incorrect duration of audio from react-native-video so we can use this to send the duration beforehand.
        },
    ];

    function PlayList () {
        return (
            <FlatList
                data={AUDIOS}
                ListHeaderComponent={() => <Box h={10} />}
                renderItem={({item}) => (
                // Some list item component
                <PlaylistItem
                    item={item}
                    active={audio?.id === item.id}
                    // We will pass in the id and the audio list, if the audio list is loaded player will not reload the playlist, unless it is a new list. or alternatively we can use the Player.load(AUDIOS) to load the playlist.
                    onPress={() => Player.play(item.id, AUDIOS)}
                />
                )}
                flex={1}
            />
        };
    }
```

- Control the player using the following methods

-- Player.toggle()
Toggles play / pause functionality of the current audio.

-- Player.next()
Plays next audio in the playlist.

-- Player.prev()
Plays previous audio in the playlist.

-- Player.repeat()
Toggles the repeat mode between 'all' | 'none' | 'single'.

-- Player.shuffle()
Shuffles the playlist.

-- Player.stop()
Closes the player and clears the playlist, this however does not removes the player instance so you can again load the playlist and play songs using same player.

-- Player.shuffle()
Shuffles the playlist.

- Hooks to show the player progress and current state

-- useAudio()
Returns current active audio

-- usePausedState()
Returns active audio paused state

-- useBufferingState()
Returns active audio buffering state

-- usePlayerProgress()
Returns active audio progress returning
{
currentTime: 0,
playableDuration: 0,
seekableDuration: 0,
}

-- useRepeat()
Returns repeat mode status

-- useShuffledState()
Returns whether playlist is shuffled

-- usePlaylist()
Returns the loaded playlist

## Basic Props

```typescript
import { ComponentProps } from "react";
import Video, { OnProgressData } from "react-native-video";

export type AudioPlayerProps = Omit<ComponentProps<typeof Video>, "source"> & {
keyName?: string;
};

export type REPEAT_MODES = "all" | "none" | "single";

export type useAudioType = {
keyName?: string;
onAudioChanged?: (currentAudio: any) => void;
};

export type usePausedStateType = {
keyName?: string;
onPausedStateChanged?: (\_paused: boolean) => void;
};

export type useBufferingStateType = {
keyName?: string;
onBufferingStateChanged?: (\_buffering: boolean) => void;
};

export type useShuffledStateType = {
keyName?: string;
onShuffledStateChanged?: (\_shuffled: boolean) => void;
};

export type usePlayerProgressType = {
keyName?: string;
onProgressChanged?: (\_progress: OnProgressData) => void;
};

export type usePlaylistType = {
keyName?: string;
onChangedPlaylist?: (\_playlist: Array<any>) => void;
};

export type useRepeatType = {
keyName?: string;
onRepeatChanged?: (\_repeat: REPEAT_MODES) => void;
};
```
