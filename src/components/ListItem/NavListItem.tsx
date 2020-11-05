import React, { FC } from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import theme from '../../constants/theme';
import NavItemLogo from './NavItemLogo';

export interface INavListItemProps {
  item: any;
  routeName: string;
  params: any;
  title: string;
  subTitle?: string;
  logoUrl?: string;
  showLogo: boolean;
  rounded?: boolean;
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
        backgroundColor: item.isActive ? theme.white.hex : theme.opaqueLight,
      }}
      style={{
        marginBottom: 5,
        width: '100%',
      }}
    >
      {showLogo ? (
        <NavItemLogo logoUri={logoUrl} rounded={rounded || false} />
      ) : null}
      <ListItem.Content>
        <ListItem.Title
          style={{
            fontFamily: 'Montserrat',
            color: item.isActive ? theme.black : theme.charcoal,
          }}
        >
          {`${title}${!item.isActive ? ' (coming soon)' : ''}`}
        </ListItem.Title>
        {subTitle && <ListItem.Subtitle>{subTitle}</ListItem.Subtitle>}
      </ListItem.Content>
    </ListItem>
  );
};

export default NavListItem;
