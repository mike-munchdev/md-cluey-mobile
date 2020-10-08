import React, { useState, useEffect, FC } from 'react';
import {
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import theme from '../../constants/theme';

import styles from './styles';

export interface ILogoTextProps {
  animation:
    | string
    | Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle>
    | undefined;
  textStyle?: StyleProp<TextStyle>;
}

const LogoText: FC<ILogoTextProps> = ({ animation, textStyle }) => {
  return (
    <Animatable.Text
      animation={animation}
      style={[
        {
          fontFamily: 'CoinyRegular',
          fontSize: 58,
          color: theme.text,
        },
        textStyle,
      ]}
    >
      Cluey
    </Animatable.Text>
  );
};
export default LogoText;
