import React, { FC } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import theme from '../../constants/theme';

const StandardContainer: FC = (props) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      {props.children}
    </SafeAreaView>
  );
};
export default StandardContainer;

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: theme.dark.rgba(0.4) },
});
