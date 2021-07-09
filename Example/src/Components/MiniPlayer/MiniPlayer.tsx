import React, {Fragment} from 'react';
import {
  Icon,
  Progress,
  IconButton,
  HStack,
  Heading,
  VStack,
  useDisclose,
  Pressable,
} from 'native-base';
import useAudio from '../../lib/Hooks/useAudio';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {usePlayerProgress} from '../../lib';
import usePausedState from '../../lib/Hooks/usePausedState';
import {PLAYER, Player} from '../../PlayerService';
import PlayerModal from '../PlayerModal/PlayerModal';

function MiniPlayer() {
  const audio = useAudio(PLAYER);
  const progress = usePlayerProgress(PLAYER);
  const paused = usePausedState(PLAYER);
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
                }
              />
            </VStack>
            <VStack justifyContent={'center'} flex={3}>
              <Heading numberOfLines={1} size={'sm'}>
                {audio?.name}
              </Heading>
            </VStack>
            <HStack alignItems={'center'} flex={5}>
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
            </HStack>
          </HStack>
        </Pressable>
      )}
      <PlayerModal isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
}

export default MiniPlayer;
