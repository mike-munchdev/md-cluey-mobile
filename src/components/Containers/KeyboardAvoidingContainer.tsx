import React, { useState, useEffect, FC } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { DismissKeyboard } from '../../components/TextInput';
import theme from '../../constants/theme';

export interface IKeyboardAvoidingContainerProps {
  isLoading: boolean;
}

const KeyboardAvoidingContainer: FC<IKeyboardAvoidingContainerProps> = ({
  isLoading,
  children,
}) => {
  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <StatusBar translucent backgroundColor="transparent" />
          {children}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};
export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeAreaContainer: { flex: 1, backgroundColor: theme.dark.rgba(0.4) },
});
