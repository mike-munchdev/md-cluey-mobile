import React, { FC, Fragment, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';

import theme from '../../constants/theme';

export interface IStandardContainerProps {
  isLoading?: boolean;
  showOverlay?: boolean;
  overlay?: React.ReactNode;
}
const StandardContainer: FC<IStandardContainerProps> = ({
  isLoading,
  children,
  showOverlay,
  overlay,
}) => {
  const [overlayVisible, setOverlayVisible] = useState(showOverlay);
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
      <Overlay
        isVisible={showOverlay || false}
        onBackdropPress={() => setOverlayVisible(false)}
        overlayStyle={{ width: '90%' }}
      >
        <Fragment>
          {overlay}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <Button
              onPress={() => setOverlayVisible(false)}
              title="Close"
              buttonStyle={{
                backgroundColor: theme.dark.hex,
                width: 100,
              }}
              titleStyle={{ color: theme.white.hex }}
            />
          </View>
        </Fragment>
      </Overlay>
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
