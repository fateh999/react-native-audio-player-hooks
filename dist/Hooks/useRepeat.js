import { useEffect, useRef, useState } from 'react';
import { PLAYER } from '../constants';
import PlayerManager from '../Utils/PlayerManager';
function useRepeat({ keyName = PLAYER, onRepeatChanged } = {}) {
    const [pausedState, setPausedState] = useState('none');
    const keyNameRef = useRef(keyName);
    const onRepeatChangedRef = useRef(onRepeatChanged);
    useEffect(() => {
        const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
        const subscription = PlayerController.repeat$.subscribe(_repeat => {
            setPausedState(_repeat);
            onRepeatChangedRef.current && onRepeatChangedRef.current(_repeat);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    return pausedState;
}
export default useRepeat;
