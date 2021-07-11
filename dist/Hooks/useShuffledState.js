import { useEffect, useRef, useState } from 'react';
import { PLAYER } from '../constants';
import PlayerManager from '../Utils/PlayerManager';
function useShuffledState({ keyName = PLAYER, onShuffledStateChanged, } = {}) {
    const [shuffledState, setShuffledState] = useState(true);
    const keyNameRef = useRef(keyName);
    const onShuffledStateChangedRef = useRef(onShuffledStateChanged);
    useEffect(() => {
        const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
        const subscription = PlayerController.shuffled$.subscribe(_shuffled => {
            setShuffledState(_shuffled);
            onShuffledStateChangedRef.current &&
                onShuffledStateChangedRef.current(_shuffled);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    return shuffledState;
}
export default useShuffledState;
