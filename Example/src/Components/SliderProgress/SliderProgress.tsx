import Slider from '@react-native-community/slider';
import {Box, Heading, HStack} from 'native-base';
import React, {Fragment, useState} from 'react';
import {usePlayerProgress} from 'react-native-audio-player';
import {Player} from '../../PlayerService';

function SliderProgress() {
  const progress = usePlayerProgress();
  const currentProgress =
    progress.playableDuration > 0
      ? progress.currentTime / progress.playableDuration
      : 0;
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <Fragment>
      <Box w={250}>
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={sliderValue || currentProgress}
          onSlidingComplete={value => {
            Player.seek(value * progress.playableDuration);
            setTimeout(() => {
              setSliderValue(0);
            }, 300);
          }}
          onSlidingStart={setSliderValue}
        />
      </Box>
      <HStack w={250}>
        <Heading
          fontWeight={'400'}
          color={'white'}
          numberOfLines={1}
          size={'xs'}>
          {Player.formatTimePlayer(progress.currentTime)}
        </Heading>
        <Box flex={1} />
        <Heading
          fontWeight={'400'}
          color={'white'}
          numberOfLines={1}
          size={'xs'}>
          {Player.formatTimePlayer(progress.playableDuration)}
        </Heading>
      </HStack>
    </Fragment>
  );
}

export default SliderProgress;
