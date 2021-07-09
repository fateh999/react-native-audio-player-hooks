import React, { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import Video from "react-native-video";
import usePlayerControls from "../Hooks/usePlayerControls";
import PlayerManager from "../Utils/PlayerManager";

function AudioPlayer(
  props: ComponentProps<typeof Video> & { keyName: string }
) {
  const { source = { uri: "" }, keyName } = props;
  const { onProgress } = usePlayerControls(keyName);

  return (
    <Video
      ref={(videoRef) => {
        if (videoRef) {
          PlayerManager.createPlayer(keyName, videoRef);
        }
      }}
      source={source}
      style={StyleSheet.absoluteFill}
      onProgress={onProgress}
    />
  );
}

export default AudioPlayer;
