import React, { FC } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import theme from '../../constants/theme';

export interface IStandardContainerProps {
  isLoading: boolean;
}
const StandardContainer: FC<IStandardContainerProps> = ({
  isLoading,
  children,
}) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar translucent backgroundColor="transparent" />

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.dark.hex} />
      ) : (
        children
      )}
    </SafeAreaView>
  );
};
export default StandardContainer;

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: theme.dark.rgba(0.4) },
});
