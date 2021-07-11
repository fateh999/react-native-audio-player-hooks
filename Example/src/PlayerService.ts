import {PlayerManager} from 'react-native-audio-player';

PlayerManager.createPlayer();

export const Player = PlayerManager.getPlayer();
