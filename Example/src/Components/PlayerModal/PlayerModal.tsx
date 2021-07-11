/* eslint-disable react-native/no-inline-styles */
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
  Spinner,
} from 'native-base';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Player} from '../../PlayerService';
import StatusBarView from '../StatusBarView/StatusBarView';
import {
  useRepeat,
  useAudio,
  usePausedState,
  useShuffledState,
  useBufferingState,
} from 'react-native-audio-player-hooks';
import SliderProgress from '../SliderProgress/SliderProgress';

function PlayerModal({isOpen, onClose}: any) {
  const {width} = useWindowDimensions();
  const audio = useAudio({
    onAudioChanged: currentAudio => {
      console.log({currentAudio});
      if (!currentAudio) {
        onClose();
      }
    },
  });
  const paused = usePausedState();
  const buffering = useBufferingState();
  const repeat = useRepeat();
  const shuffled = useShuffledState();

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
        style={[StyleSheet.absoluteFill, {zIndex: -1}]}
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
              onPress={Player.stop}
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
          <Box h={5} />
          <Heading size={'md'} textTransform={'uppercase'} color={'white'}>
            {audio?.name}
          </Heading>
          <Box h={5} />
          <SliderProgress />
          <Box h={5} />
          <HStack alignItems={'center'} w={250}>
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
            <Box flex={1} />
            <IconButton
              onPress={Player.toggle}
              icon={
                buffering ? (
                  <Spinner size={'lg'} />
                ) : (
                  <Icon
                    justifyContent={'center'}
                    size="lg"
                    as={
                      <MaterialCommunityIcons
                        name={paused ? 'play' : 'pause'}
                      />
                    }
                    color={'light.600'}
                  />
                )
              }
              rounded={'full'}
              size={'lg'}
              bg={'white'}
            />
            <Box flex={1} />
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
          <HStack alignItems={'center'} w={250}>
            <IconButton
              onPress={Player.repeat}
              icon={
                <Icon
                  justifyContent={'center'}
                  size="md"
                  as={
                    <MaterialCommunityIcons
                      name={
                        repeat === 'all'
                          ? 'repeat'
                          : repeat === 'single'
                          ? 'repeat-once'
                          : 'repeat-off'
                      }
                    />
                  }
                  color={'white'}
                />
              }
              rounded={'full'}
              size={'md'}
            />
            <Box flex={1} />
            <IconButton
              onPress={Player.shuffle}
              icon={
                <Icon
                  justifyContent={'center'}
                  size="md"
                  as={
                    <MaterialCommunityIcons
                      name={shuffled ? 'shuffle-variant' : 'shuffle'}
                    />
                  }
                  color={'white'}
                />
              }
              rounded={'full'}
              size={'md'}
            />
          </HStack>
        </Center>
      </Modal.Body>
    </Modal>
  );
}

export default PlayerModal;
