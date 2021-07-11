import {PlayerManager} from 'react-native-audio-player-hooks';

PlayerManager.createPlayer();

export const Player = PlayerManager.getPlayer();
