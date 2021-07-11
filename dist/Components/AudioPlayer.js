import React, { Fragment } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import Video from "react-native-video";
import useAudio from "../Hooks/useAudio";
import usePausedState from "../Hooks/usePausedState";
import PlayerManager from "../Utils/PlayerManager";
import { PLAYER } from "../constants";
import useRepeat from "../Hooks/useRepeat";
function AudioPlayer(props) {
    const { keyName = PLAYER, automaticallyWaitsToMinimizeStalling = true, audioOnly = false, playInBackground = false, playWhenInactive = false, } = props;
    const keyNameRef = useRef(keyName);
    const playerControllerRef = useRef();
    const audio = useAudio({ keyName });
    const paused = usePausedState({ keyName });
    const repeat = useRepeat({ keyName });
    useLayoutEffect(() => {
        playerControllerRef.current = PlayerManager.getPlayer(keyNameRef.current);
    }, []);
    return (<Fragment>
      {audio?.url && (<Video {...props} automaticallyWaitsToMinimizeStalling={automaticallyWaitsToMinimizeStalling} audioOnly={audioOnly} playWhenInactive={playWhenInactive} playInBackground={playInBackground} ref={(videoRef) => {
                if (videoRef) {
                    playerControllerRef.current?.createRef(videoRef);
                }
            }} source={{ uri: audio.url }} style={{}} onProgress={(_progress) => {
                playerControllerRef.current?.progress$.next({
                    ..._progress,
                    playableDuration: audio?.seconds ?? _progress.playableDuration,
                });
            }} progressUpdateInterval={1000} paused={paused} repeat={repeat === "single"} onLoadStart={() => playerControllerRef.current?.buffering$.next(true)} onLoad={() => playerControllerRef.current?.buffering$.next(false)} onError={() => playerControllerRef.current?.buffering$.next(false)} onPlaybackResume={() => {
                playerControllerRef.current?.paused$.next(false);
            }} onPlaybackStalled={() => {
                playerControllerRef.current?.paused$.next(true);
            }} onEnd={() => {
                playerControllerRef.current?.next();
            }}/>)}
    </Fragment>);
}
export default AudioPlayer;
