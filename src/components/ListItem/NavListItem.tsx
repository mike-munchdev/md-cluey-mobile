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
}

const NavListItem: FC<INavListItemProps> = ({
  item,
  routeName,
  params,
  title,
  subTitle,
  logoUrl,
  showLogo,
}) => {
  const navigation = useNavigation();

  return (
    <ListItem
      onPress={() => navigation.navigate(routeName, params)}
      key={item.id}
      bottomDivider
      style={{
        marginBottom: 5,
        backgroundColor: theme.light,
        width: '100%',
      }}
    >
      {showLogo ? <NavItemLogo logoUri={logoUrl} /> : null}
      <ListItem.Content>
        <ListItem.Title>
          <Text
            style={{
              fontFamily: 'MontserratMedium',
              fontSize: 18,
            }}
          >
            {title || ''}
          </Text>
        </ListItem.Title>
        {subTitle && <ListItem.Subtitle>{subTitle}</ListItem.Subtitle>}
      </ListItem.Content>
    </ListItem>
  );
};

export default NavListItem;
