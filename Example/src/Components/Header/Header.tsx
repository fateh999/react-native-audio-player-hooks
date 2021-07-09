import {Box, Center, HStack} from 'native-base';
import React from 'react';
import StatusBarView from '../StatusBarView/StatusBarView';

type HeaderProps = {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  children: JSX.Element;
};

function Header(props: HeaderProps) {
  const {leftIcon, rightIcon, children} = props;

  return (
    <Box shadow={2}>
      <StatusBarView />
      <HStack safeAreaBottom={0} p={3} bg={'white'}>
        <Center flex={1}>{leftIcon}</Center>
        <Center flex={5}>{children}</Center>
        <Center flex={1}>{rightIcon}</Center>
      </HStack>
    </Box>
  );
}

export default Header;
