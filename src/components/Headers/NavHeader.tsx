import React, { FC } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import theme from '../../constants/theme';
import { PageHeaderText } from '../Text';
import { NavBackButton } from '../Buttons';

export interface INavHeaderProps {
  title?: string | JSX.Element;
  subTitle?: string;
  goBack?: boolean;
  showMenu?: boolean;
  rightIcon?: Function;
}

const NavHeader: FC<INavHeaderProps> = ({
  title,
  goBack,
  showMenu,
  subTitle,
  rightIcon,
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.headerLeft}>
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
        {goBack && <NavBackButton />}
      </View>
      <View style={styles.headerCenter}>
        {title && <PageHeaderText title={title} subTitle={subTitle} />}
      </View>
      <View style={[styles.headerRight]}>
        <View style={styles.rightIconContainer}>
          {rightIcon && rightIcon()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavHeader;
