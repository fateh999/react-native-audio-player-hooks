import {Box, FlatList, Heading, VStack} from 'native-base';
import React from 'react';
import {useEffect} from 'react';
import Header from '../../Components/Header/Header';
import MiniPlayer from '../../Components/MiniPlayer/MiniPlayer';
import PlaylistItem from '../../Components/PlaylistItem/PlaylistItem';
import {AudioPlayer, PlayerManager} from '../../lib';
import useAudio from '../../lib/Hooks/useAudio';

const AUDIOS = [
  {
    id: '1',
    name: 'Test',
    url: 'https://firebasestorage.googleapis.com/v0/b/document-signer-978fe.appspot.com/o/sample1.mp3?alt=media&token=c291d3b1-fab5-4508-a856-95b13514271c',
    picture: 'https://picsum.photos/250/300',
  },
  {
    id: '2',
    name: 'Test 2',
    url: 'https://firebasestorage.googleapis.com/v0/b/document-signer-978fe.appspot.com/o/sample1.mp3?alt=media&token=c291d3b1-fab5-4508-a856-95b13514271c',
    picture: 'https://picsum.photos/250/300',
  },
];

function PlaylistScreen() {
  useEffect(() => {
    setTimeout(() => {
      const playerController = PlayerManager.getPlayer('player');
      playerController.load(AUDIOS);
    }, 2000);
  }, []);
  const audio = useAudio('player');

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
          <PlaylistItem item={item} active={audio?.id === item.id} />
        )}
      />
      <Box>
        <AudioPlayer keyName={'player'} />
      </Box>

      <MiniPlayer />
    </VStack>
  );
}

export default PlaylistScreen;
