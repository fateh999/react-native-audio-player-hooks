import 'react-native-gesture-handler';
import './src/PlayerService';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

MaterialCommunityIcons.loadFont();

AppRegistry.registerComponent(appName, () => App);
