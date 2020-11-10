import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import theme from '../../constants/theme';

import styles from './styles';

const NavBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backContainer}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <FontAwesome5 name="angle-left" size={30} color={theme.dark.hex} />
    </TouchableOpacity>
  );
};
export default NavBackButton;
