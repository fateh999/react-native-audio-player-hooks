import { useEffect, useRef, useState } from 'react';
import { PLAYER } from '../constants';
import PlayerManager from '../Utils/PlayerManager';
function useAudio({ keyName = PLAYER, onAudioChanged } = {}) {
    const [audio, setAudio] = useState();
    const keyNameRef = useRef(keyName);
    const onAudioChangedRef = useRef(onAudioChanged);
    useEffect(() => {
        const PlayerController = PlayerManager.getPlayer(keyNameRef.current);
        const subscription = PlayerController.currentAudio$.subscribe(_audio => {
            setAudio(_audio);
            onAudioChangedRef.current && onAudioChangedRef.current(_audio);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    return audio;
}
export default useAudio;
