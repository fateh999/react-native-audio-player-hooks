import { OnProgressData } from 'react-native-video';
import { usePlayerProgressType } from '../Types';
declare function usePlayerProgress({ keyName, onProgressChanged, }?: usePlayerProgressType): OnProgressData;
export default usePlayerProgress;
