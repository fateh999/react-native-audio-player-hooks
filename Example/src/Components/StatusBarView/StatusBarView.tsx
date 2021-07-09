import {useTheme, StatusBar, Box} from 'native-base';
import React, {Fragment} from 'react';
import {Platform, StatusBarStyle} from 'react-native';

type StatusBarViewProps = {
  bg?: string;
  statusBarStyle?: StatusBarStyle;
};

function StatusBarView(props: StatusBarViewProps) {
  const {bg = 'white', statusBarStyle = 'dark-content'} = props;
  const theme = useTheme();
  const [color, value] = bg.split('.');
  const backgroundColor =
    bg.indexOf('.') !== -1 ? theme.colors[color]?.[value] : bg;

  return (
    <Fragment>
      <StatusBar backgroundColor={backgroundColor} barStyle={statusBarStyle} />
      {Platform.OS === 'ios' && <Box safeAreaTop bg={backgroundColor} />}
    </Fragment>
  );
}

export default StatusBarView;
