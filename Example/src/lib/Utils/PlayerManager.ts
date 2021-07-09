import PlayerController from './PlayerController';

class PlayerManager {
  players: any = {};

  createPlayer = (keyName: string) => {
    const playerController = new PlayerController();
    this.players[keyName] = playerController;
  };

  getPlayer = (keyName: string): PlayerController => {
    return this.players[keyName];
  };
}

export default new PlayerManager();
