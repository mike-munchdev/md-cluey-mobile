import React, { FC } from 'react';
import {
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export interface IRoundedIconButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onLongPress?: ((event: GestureResponderEvent) => void) | undefined;
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
  onLongPress,
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
    <Animatable.View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity
        onLongPress={onLongPress}
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
    </Animatable.View>
  );
};

export default RoundedIconButton;
