import React, { FC } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { DismissKeyboard } from '../../components/TextInput';
import theme from '../../constants/theme';

const SignInContainer: FC = (props) => {
  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
      >
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <SafeAreaView style={styles.safeAreaContainer}>
          {props.children}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};
export default SignInContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeAreaContainer: { flex: 1, backgroundColor: theme.dark.rgba(0.4) },
});
