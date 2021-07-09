import Video from "react-native-video";
import PlayerController from "./PlayerController";

class PlayerManager {
  players: any;

  createPlayer = (keyName: string, ref: Video) => {
    const playerController = new PlayerController(ref);
    this.players[keyName] = playerController;
  };

  getPlayer = (keyName: string): PlayerController => {
    return this.players[keyName];
  };
}

export default new PlayerManager();
