import {
  Icon,
  IconButton,
  Modal,
  Image,
  Center,
  Box,
  Heading,
  HStack,
  VStack,
} from 'native-base';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {usePlayerProgress} from '../../lib';
import useAudio from '../../lib/Hooks/useAudio';
import usePausedState from '../../lib/Hooks/usePausedState';
import {Player, PLAYER} from '../../PlayerService';
import StatusBarView from '../StatusBarView/StatusBarView';
import Slider from '@react-native-community/slider';
import {useState} from 'react';

function PlayerModal({isOpen, onClose}: any) {
  const {width} = useWindowDimensions();
  const audio = useAudio(PLAYER);
  const paused = usePausedState(PLAYER);
  const progress = usePlayerProgress(PLAYER);
  const currentProgress = progress.currentTime / progress.playableDuration;
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <Modal
      alignItems={'flex-start'}
      isOpen={isOpen}
      bg={'light.800'}
      width={width}>
      <StatusBarView statusBarStyle={'light-content'} />
      <Image
        alt={'Audio Image'}
        source={{uri: audio?.picture}}
        style={StyleSheet.absoluteFill}
        blurRadius={10}
      />
      <Modal.Header>
        <HStack w={width}>
          <VStack>
            <IconButton
              onPress={onClose}
              m={2}
              icon={
                <Icon
                  justifyContent={'center'}
                  size="md"
                  as={<MaterialCommunityIcons name={'chevron-down'} />}
                  color={'white'}
                  shadow={6}
                />
              }
              rounded={'full'}
            />
          </VStack>
          <VStack flex={1} />
          <VStack>
            <IconButton
              onPress={() => {
                onClose();
                Player.stop();
              }}
              m={2}
              icon={
                <Icon
                  justifyContent={'center'}
                  size="md"
                  as={<MaterialCommunityIcons name={'close'} />}
                  color={'white'}
                  shadow={6}
                />
              }
              rounded={'full'}
            />
          </VStack>
        </HStack>
      </Modal.Header>
      <Modal.Body width={width}>
        <Center width={width}>
          <Image
            alt={'Audio Image'}
            source={{uri: audio?.picture}}
            height={250}
            width={250}
          />
          <Box h={10} />
          <Heading size={'md'} textTransform={'uppercase'} color={'white'}>
            {audio?.name}
          </Heading>
          <Box h={5} />
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
          <Box h={10} />
          <HStack alignItems={'center'}>
            <IconButton
              onPress={Player.prev}
              icon={
                <Icon
                  justifyContent={'center'}
                  size="md"
                  as={<MaterialCommunityIcons name={'skip-previous'} />}
                  color={'white'}
                />
              }
              rounded={'full'}
              size={'md'}
            />
            <Box w={10} />
            <IconButton
              onPress={Player.toggle}
              icon={
                <Icon
                  justifyContent={'center'}
                  size="lg"
                  as={
                    <MaterialCommunityIcons name={paused ? 'play' : 'pause'} />
                  }
                  color={'light.600'}
                />
              }
              rounded={'full'}
              size={'lg'}
              bg={'white'}
            />
            <Box w={10} />
            <IconButton
              onPress={Player.next}
              icon={
                <Icon
                  justifyContent={'center'}
                  size="md"
                  as={<MaterialCommunityIcons name={'skip-next'} />}
                  color={'white'}
                />
              }
              rounded={'full'}
              size={'md'}
            />
          </HStack>
          <Box h={10} />
        </Center>
      </Modal.Body>
    </Modal>
  );
}

export default PlayerModal;
