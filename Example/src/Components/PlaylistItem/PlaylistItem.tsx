import {Heading, HStack, Icon, Pressable, VStack} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {usePausedState} from '../../lib';

function PlaylistItem({item, active, onPress}: any) {
  const paused = usePausedState();

  return (
    <Pressable mx={4} shadow={2} bg={'white'} onPress={onPress}>
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
