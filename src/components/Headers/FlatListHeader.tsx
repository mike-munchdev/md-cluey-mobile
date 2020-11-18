import React, { FC } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';

import styles from './styles';

export interface IFlatListHeaderProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
const FlatListHeader: FC<IFlatListHeaderProps> = ({
  title,
  containerStyle,
  textStyle,
}) => {
  return (
    <View style={[styles.flatListHeaderContainer, containerStyle]}>
      <Text style={[styles.flatListHeaderText, textStyle]}>{title}</Text>
    </View>
  );
};
export default FlatListHeader;
