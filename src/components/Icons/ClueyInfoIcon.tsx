import React, { useState, useEffect, Fragment, FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import theme from '../../constants/theme';

export interface IClueyInfoIconProps {
  onPress: () => void;
}
const ClueyInfoIcon: FC<IClueyInfoIconProps> = ({ onPress }) => {
  return (
    <Fragment>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="infocirlceo" size={28} color={theme.dark.hex} />
      </TouchableOpacity>
    </Fragment>
  );
};
export default ClueyInfoIcon;
