import {PLAYER} from '../constants';
import PlayerController from './PlayerController';

class PlayerManager {
  players: any = {};

  createPlayer = (keyName: string = PLAYER) => {
    const playerController = new PlayerController();
    this.players[keyName] = playerController;
  };

  getPlayer = (keyName: string = PLAYER): PlayerController => {
    return this.players[keyName];
  };

  deletePlayer = (keyName: string = PLAYER) => {
    delete this.players[keyName];
  };
}

export default new PlayerManager();
