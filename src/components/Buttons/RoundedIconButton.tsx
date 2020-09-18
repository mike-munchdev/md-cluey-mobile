import React, { FC, Fragment } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../../constants/colors';
import theme from '../../constants/theme';

export interface IRoundedIconButtonProps {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  backgroundColor: string | undefined;
  borderColor?: string | undefined;
  size?: number | undefined;
  borderWidth?: number | undefined;
  text?: string | undefined;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean | undefined;
  icon: JSX.Element | undefined;
}
export const RoundedIconButton: FC<IRoundedIconButtonProps> = ({
  onPress,
  backgroundColor,
  borderColor,
  size,
  borderWidth,
  text,
  disabled,
  textStyle,
  icon,
}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{
          width: size || 60,
          height: size || 60,
          backgroundColor: backgroundColor,
          borderRadius: size ? size / 2 : 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: borderColor,
          borderWidth: borderWidth || 2,
        }}
      >
        {icon}
      </TouchableOpacity>
      {text ? <Text style={textStyle}>{text}</Text> : null}
    </View>
  );
};

export default RoundedIconButton;
