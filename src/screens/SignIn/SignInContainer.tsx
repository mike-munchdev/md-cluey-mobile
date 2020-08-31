import React, { useState, useEffect, FC } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import { DismissKeyboard } from '../../components/TextInput';

const SignInContainer: FC = (props) => {
  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
      >
        {props.children}
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
});
