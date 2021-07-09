import React, {ComponentProps, Fragment} from 'react';
import {useRef} from 'react';
import {useLayoutEffect} from 'react';
import Video from 'react-native-video';
import useAudio from '../Hooks/useAudio';
import usePausedState from '../Hooks/usePausedState';
import PlayerController from '../Utils/PlayerController';
import PlayerManager from '../Utils/PlayerManager';
import convertToProxyURL from 'react-native-video-cache';
import {PLAYER} from '../constants';
import useRepeat from '../Hooks/useRepeat';

function AudioPlayer(
  props: Omit<ComponentProps<typeof Video>, 'source'> & {
    keyName?: string;
  },
) {
  const {keyName = PLAYER} = props;
  const keyNameRef = useRef(keyName);
  const playerControllerRef = useRef<PlayerController>();
  const audio = useAudio({keyName});
  const paused = usePausedState({keyName});
  const repeat = useRepeat({keyName});

  useLayoutEffect(() => {
    playerControllerRef.current = PlayerManager.getPlayer(keyNameRef.current);
  }, []);

  return (
    <Fragment>
      {audio?.url && (
        <Video
          {...props}
          ref={videoRef => {
            if (videoRef) {
              playerControllerRef.current?.createRef(videoRef);
            }
          }}
          source={{uri: convertToProxyURL(audio?.url)}}
          style={{}}
          onProgress={_progress => {
            playerControllerRef.current?.progress$.next(_progress);
          }}
          audioOnly
          paused={paused}
          repeat={repeat === 'single'}
          onPlaybackResume={() => {
            playerControllerRef.current?.paused$.next(false);
          }}
          onPlaybackStalled={() => {
            playerControllerRef.current?.paused$.next(true);
          }}
          onEnd={() => {
            playerControllerRef.current?.next();
          }}
        />
      )}
    </Fragment>
  );
}

export default AudioPlayer;
