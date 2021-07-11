import { PLAYER } from '../constants';
import PlayerController from './PlayerController';
class PlayerManager {
    players = {};
    createPlayer = (keyName = PLAYER) => {
        const playerController = new PlayerController();
        this.players[keyName] = playerController;
    };
    getPlayer = (keyName = PLAYER) => {
        return this.players[keyName];
    };
    deletePlayer = (keyName = PLAYER) => {
        delete this.players[keyName];
    };
}
export default new PlayerManager();
