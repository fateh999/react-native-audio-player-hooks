import React, {Fragment} from 'react';
import {
  Icon,
  IconButton,
  HStack,
  Heading,
  VStack,
  useDisclose,
  Pressable,
  Spinner,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useAudio,
  useBufferingState,
  usePausedState,
} from 'react-native-audio-player';
import {Player} from '../../PlayerService';
import PlayerModal from '../PlayerModal/PlayerModal';
import MiniProgress from '../MiniProgress/MiniProgress';

function MiniPlayer() {
  const audio = useAudio();
  const buffering = useBufferingState();
  const paused = usePausedState();
  const {isOpen, onClose, onOpen} = useDisclose();

  return (
    <Fragment>
      {audio && (
        <Pressable onPress={onOpen}>
          <HStack shadow={5} safeAreaBottom bg={'white'} p={2}>
            <VStack justifyContent={'center'} flex={1}>
              <IconButton
                onPress={Player.toggle}
                icon={
                  buffering ? (
                    <Spinner size={'sm'} />
                  ) : (
                    <Icon
                      justifyContent={'center'}
                      size="sm"
                      as={
                        <MaterialCommunityIcons
                          name={paused ? 'play' : 'pause'}
                        />
                      }
                      color={'light.600'}
                    />
                  )
                }
              />
            </VStack>
            <VStack justifyContent={'center'} flex={3}>
              <Heading numberOfLines={1} size={'sm'}>
                {audio?.name}
              </Heading>
            </VStack>
            <HStack alignItems={'center'} flex={5}>
              <MiniProgress />
            </HStack>
          </HStack>
        </Pressable>
      )}
      <PlayerModal isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
}

export default MiniPlayer;
