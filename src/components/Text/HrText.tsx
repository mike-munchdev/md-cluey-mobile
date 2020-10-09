import React, { FC } from 'react';
import { Text, View, ViewStyle, StyleProp } from 'react-native';

export interface IHrTextProps {
  text: string;
  width?: string | number | undefined;
  containerStyles?: StyleProp<ViewStyle>;
}

const HrText: FC<IHrTextProps> = ({ text, width, containerStyles }) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          width: width || undefined,
        },
        containerStyles,
      ]}
    >
      <View style={{ flex: 3, height: 1, backgroundColor: 'black' }} />
      <View>
        <Text style={{ textAlign: 'center', marginHorizontal: 10 }}>
          {text}
        </Text>
      </View>
      <View style={{ flex: 3, height: 1, backgroundColor: 'black' }} />
    </View>
  );
};
export default HrText;
