import React, { FC, Fragment } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

import colors from '../../constants/colors';
import theme from '../../constants/theme';

export interface IRoundedIconButtonProps {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  backgroundColor: string | undefined;
  borderColor?: string | undefined;
  size: number | undefined;
  iconSize: number | undefined;
  borderWidth?: number | undefined;
  iconName: string | undefined;
  iconColor?: string | undefined;
  text?: string | undefined;
  disabled?: boolean | undefined;
}
export const RoundedIconButton: FC<IRoundedIconButtonProps> = ({
  onPress,
  backgroundColor,
  borderColor,
  size,
  iconSize,
  iconName,
  iconColor,
  borderWidth,
  text,
  disabled,
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
        <FontAwesome name={iconName} size={iconSize} color={iconColor} />
      </TouchableOpacity>
      {text ? (
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            marginTop: 5,
            color: theme.text,
          }}
        >
          {text}
        </Text>
      ) : null}
    </View>
  );
};

export default RoundedIconButton;
