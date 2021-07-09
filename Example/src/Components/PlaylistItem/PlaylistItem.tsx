import {Heading, HStack, Icon, Pressable, VStack} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import usePausedState from '../../lib/Hooks/usePausedState';
import {PLAYER, Player} from '../../PlayerService';

function PlaylistItem({item, active}: any) {
  const paused = usePausedState(PLAYER);

  return (
    <Pressable
      mx={4}
      shadow={2}
      bg={'white'}
      onPress={() => {
        Player.play(item.id);
      }}>
      <HStack p={4}>
        <VStack justifyContent={'center'} flex={1}>
          <Heading
            fontWeight={active ? '400' : '300'}
            size={'sm'}
            color={active ? 'primary.500' : undefined}>
            {item.name}
          </Heading>
        </VStack>

        <Icon
          justifyContent={'center'}
          size="sm"
          as={
            <MaterialCommunityIcons
              name={active ? (paused ? 'play' : 'pause') : 'play'}
            />
          }
          color={active ? 'primary.500' : 'light.500'}
        />
      </HStack>
    </Pressable>
  );
}

export default PlaylistItem;
