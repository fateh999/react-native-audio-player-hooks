import { useEffect, useRef, useState } from 'react';
import { PLAYER } from '../constants';
import PlayerManager from '../Utils/PlayerManager';
function useBufferingState({ keyName = PLAYER, onBufferingStateChanged, } = {}) {
    const [bufferingState, setBufferingState] = useState(true);
    const keyNameRef = useRef(keyName);
    const onBufferingStateChangedRef = useRef(onBufferingStateChanged);
    useEffect(() => {
        const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
        const subscription = PlayerController.buffering$.subscribe(_buffering => {
            setBufferingState(_buffering);
            onBufferingStateChangedRef.current &&
                onBufferingStateChangedRef.current(_buffering);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    return bufferingState;
}
export default useBufferingState;
