import React, { FC } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';
import theme from '../../constants/theme';

export interface IActionButtonProps {
  handlePress: ((event: GestureResponderEvent) => void) | undefined;
  textColor: string;
  color: string;
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  buttonStyles?: StyleProp<ViewStyle>;
  borderColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  visible?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

const ActionButton: FC<IActionButtonProps> = ({
  handlePress,
  textColor,
  color,
  title,
  leftIcon,
  rightIcon,
  buttonStyles,
  borderColor,
  isLoading,
  disabled,
  visible,
  textStyle,
}) => {
  if (isLoading)
    return (
      <ActivityIndicator
        animating={true}
        style={{ height: 70 }}
        color={theme.dark.hex}
      />
    );

  if (visible === false) return <View></View>;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        buttonStyles,
        { backgroundColor: color, borderColor: borderColor || color },
      ]}
      disabled={disabled}
    >
      {leftIcon ? (
        <View style={{ position: 'absolute', left: 20 }}>{leftIcon}</View>
      ) : null}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={[
            styles.textSign,
            {
              color: textColor,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </View>
      {rightIcon ? (
        <View style={{ position: 'absolute', right: 20 }}>{rightIcon}</View>
      ) : null}
    </TouchableOpacity>
  );
};
export default ActionButton;
