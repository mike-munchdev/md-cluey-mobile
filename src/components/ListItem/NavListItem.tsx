import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import theme from '../../constants/theme';
import NavItemLogo from './NavItemLogo';

export interface INavListItemProps {
  item: any;
  routeName: string;
  params: any;
  title: string;
  subTitle?: string;
  logoUrl: string;
  showLogo: boolean;
  rounded: boolean;
}

const NavListItem: FC<INavListItemProps> = ({
  item,
  routeName,
  params,
  title,
  subTitle,
  logoUrl,
  showLogo,
  rounded,
}) => {
  const navigation = useNavigation();

  return (
    <ListItem
      onPress={() => {
        item.isActive ? navigation.navigate(routeName, params) : null;
      }}
      key={item.id}
      bottomDivider
      containerStyle={{
        backgroundColor: item.isActive
          ? theme.dark.rgba(0.9)
          : theme.disabled.hex,
      }}
      style={{
        marginBottom: 5,
        width: '100%',
      }}
    >
      {showLogo ? <NavItemLogo logoUri={logoUrl} rounded={rounded} /> : null}
      <ListItem.Content>
        <ListItem.Title>
          <Text
            style={{
              fontFamily: 'MontserratMedium',
              fontSize: 18,
              color: theme.white.hex,
            }}
          >
            {title || ''}
          </Text>
        </ListItem.Title>
        {subTitle && (
          <ListItem.Subtitle style={{ color: theme.white.hex }}>
            {subTitle}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
    </ListItem>
  );
};

export default NavListItem;
