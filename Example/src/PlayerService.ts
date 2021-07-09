import {PlayerManager} from './lib';

export const PLAYER = 'player';

PlayerManager.createPlayer(PLAYER);

export const Player = PlayerManager.getPlayer(PLAYER);
