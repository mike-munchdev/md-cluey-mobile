import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import theme from '../../constants/theme';

export interface INavigationHeaderProps {
  goBack?: boolean;
  showMenu?: boolean;
}
const NavigationHeader: FC<INavigationHeaderProps> = ({ goBack, showMenu }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row' }}>
      {goBack && (
        <TouchableOpacity
          style={styles.closeContainer}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesome5 name="angle-left" size={30} color={theme.dark.hex} />
        </TouchableOpacity>
      )}
      {showMenu && (
        <TouchableOpacity
          style={styles.barsContainer}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <FontAwesome name="bars" size={24} color={theme.dark.hex} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default NavigationHeader;
