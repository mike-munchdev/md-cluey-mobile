import React, { FC } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import theme from '../../constants/theme';

export interface IStandardContainerProps {
  isLoading?: boolean;
}
const StandardContainer: FC<IStandardContainerProps> = ({
  isLoading,
  children,
}) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar translucent backgroundColor="transparent" />

      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color={theme.dark.hex} />
        </View>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};
export default StandardContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeAreaContainer: { flex: 1, backgroundColor: theme.dark.rgba(0.4) },
});
