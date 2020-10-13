import React, { useContext, FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import colors from '../../constants/colors';
import theme from '../../constants/theme';
import { PageHeaderText } from '../Text';

export interface INavHeaderProps {
  title?: string;
  subTitle?: string;
  goBack?: boolean;
  showMenu?: boolean;
}

const NavHeader: FC<INavHeaderProps> = ({
  title,
  goBack,
  showMenu,
  subTitle,
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.headerLeft}>
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
      <View style={styles.headerCenter}>
        {title && <PageHeaderText title={title} subTitle={subTitle} />}
      </View>
      <View style={styles.headerRight}></View>
    </SafeAreaView>
  );
};

export default NavHeader;
