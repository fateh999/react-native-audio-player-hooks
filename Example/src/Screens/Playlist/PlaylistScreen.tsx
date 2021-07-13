import {Box, FlatList, Heading, VStack} from 'native-base';
import React from 'react';
import Header from '../../Components/Header/Header';
import MiniPlayer from '../../Components/MiniPlayer/MiniPlayer';
import PlaylistItem from '../../Components/PlaylistItem/PlaylistItem';
import {AudioPlayer, useAudio} from 'react-native-audio-player-hooks';
import {Player} from '../../PlayerService';

const AUDIOS = [
  {
    id: '1',
    name: 'Test',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    picture: 'https://picsum.photos/250/300',
    seconds: 372,
  },
  {
    id: '2',
    name: 'Test 2',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    picture: 'https://picsum.photos/250/300',
    seconds: 425,
  },
  {
    id: '3',
    name: 'Test 3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    picture: 'https://picsum.photos/250/300',
    seconds: 343,
  },
  {
    id: '4',
    name: 'Test 4',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    picture: 'https://picsum.photos/250/300',
    seconds: 302,
  },
  {
    id: '5',
    name: 'Test 5',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    picture: 'https://picsum.photos/250/300',
    seconds: 353,
  },
];

function PlaylistScreen() {
  const audio = useAudio();

  return (
    <VStack flex={1}>
      <Header>
        <Heading fontWeight={'500'} size={'md'} color={'primary.500'}>
          react-native-audio-player
        </Heading>
      </Header>

      <FlatList
        data={AUDIOS}
        ListHeaderComponent={() => <Box h={10} />}
        renderItem={({item}) => (
          <PlaylistItem
            item={item}
            active={audio?.id === item.id}
            onPress={() => Player.play(item.id, AUDIOS)}
          />
        )}
        flex={1}
      />
      <Box>
        <AudioPlayer playInBackground />
      </Box>

      <MiniPlayer />
    </VStack>
  );
}

export default PlaylistScreen;
