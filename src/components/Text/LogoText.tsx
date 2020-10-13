import React, { FC } from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
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
    <Animatable.Text animation={animation} style={[styles.logoText, textStyle]}>
      Cluey
    </Animatable.Text>
  );
};
export default LogoText;
