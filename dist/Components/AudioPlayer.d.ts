import { ComponentProps } from 'react';
import Video from 'react-native-video';
declare function AudioPlayer(props: Omit<ComponentProps<typeof Video>, 'source'> & {
    keyName?: string;
}): JSX.Element;
export default AudioPlayer;
