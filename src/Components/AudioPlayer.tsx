import React, { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import Video from "react-native-video";

function AudioPlayer(props: ComponentProps<typeof Video>) {
  const { source } = props;

  return <Video source={source} style={StyleSheet.absoluteFill} />;
}

export default AudioPlayer;
