import React, { FC } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';

import styles from './styles';
import theme from '../../constants/theme';

export interface ITextButtonProps {
  handlePress: ((event: GestureResponderEvent) => void) | undefined;
  textColor?: string;
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textStyles?: StyleProp<TextStyle>;
  buttonStyles?: StyleProp<TextStyle>;
}
const TextButton: FC<ITextButtonProps> = ({
  handlePress,
  textStyles,
  title,
  buttonStyles,
}) => {
  return (
    <TouchableOpacity
      style={[styles.textButtonView, buttonStyles]}
      onPress={handlePress}
    >
      <Text
        style={[
          {
            fontSize: 18,
            color: theme.text,
            fontWeight: 'bold',
          },
          textStyles,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default TextButton;
