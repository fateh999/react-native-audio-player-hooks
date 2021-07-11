import {Heading, Progress} from 'native-base';
import React, {Fragment} from 'react';
import {usePlayerProgress} from 'react-native-audio-player-hooks';
import {Player} from '../../PlayerService';

function MiniProgress() {
  const progress = usePlayerProgress();

  return (
    <Fragment>
      <Heading fontWeight={'400'} numberOfLines={1} size={'xs'}>
        {Player.formatTimePlayer(progress.currentTime)}
      </Heading>
      <Progress
        flex={1}
        mx={3}
        value={(progress.currentTime / progress.playableDuration) * 100}
      />
      <Heading fontWeight={'400'} numberOfLines={1} size={'xs'}>
        {Player.formatTimePlayer(progress.playableDuration)}
      </Heading>
    </Fragment>
  );
}

export default MiniProgress;
