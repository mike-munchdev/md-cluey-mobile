import React, { FC } from 'react';

import { View, ViewStyle } from 'react-native';
import colors from '../../constants/colors';

export interface IHorizontalRuleProps {
  color?: string;
  styles?: ViewStyle;
}
const HorizontalRule: FC<IHorizontalRuleProps> = ({ color, styles }) => {
  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: colors.gray.neutral,
          ...styles,
        },
      ]}
    />
  );
};

export default HorizontalRule;
