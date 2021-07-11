import { useEffect, useRef, useState } from 'react';
import { PLAYER } from '../constants';
import PlayerManager from '../Utils/PlayerManager';
function usePlayerProgress({ keyName = PLAYER, onProgressChanged, } = {}) {
    const [progress, setProgress] = useState({
        currentTime: 0,
        playableDuration: 0,
        seekableDuration: 0,
    });
    const keyNameRef = useRef(keyName);
    const onProgressChangedRef = useRef(onProgressChanged);
    useEffect(() => {
        const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
        const subscription = PlayerController.progress$.subscribe(_progress => {
            setProgress(_progress);
            onProgressChangedRef.current && onProgressChangedRef.current(_progress);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    return progress;
}
export default usePlayerProgress;
