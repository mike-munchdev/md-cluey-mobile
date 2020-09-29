import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import theme from '../../constants/theme';

export interface INavListItemProps {
  item: any;
  routeName: string;
  params: any;
  title: string;
  subTitle?: string;
  logoUrl?: string;
}

const NavListItem: FC<INavListItemProps> = ({
  item,
  routeName,
  params,
  title,
  subTitle,
  logoUrl,
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
      <ListItem.Content>
        {logoUrl && <Avatar rounded source={{ uri: logoUrl }} />}
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
