import React, { FC } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const DismissKeyboard: FC = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
