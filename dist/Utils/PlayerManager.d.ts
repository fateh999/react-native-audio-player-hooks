import PlayerController from './PlayerController';
declare class PlayerManager {
    players: any;
    createPlayer: (keyName?: string) => void;
    getPlayer: (keyName?: string) => PlayerController;
    deletePlayer: (keyName?: string) => void;
}
declare const _default: PlayerManager;
export default _default;
