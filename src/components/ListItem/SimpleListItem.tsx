import React, { useState, useEffect, FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import theme from '../../constants/theme';
import { List } from 'react-native-paper';

export interface ISimpleListItem {
  item: any;
  routeName: string;
  params: any;
  title: string;
  subTitle?: string;
}
const SimpleListItem: FC<ISimpleListItem> = ({
  item,
  routeName,
  params,
  title,
  subTitle,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate(routeName, params)}
    >
      <ListItem
        key={item.id}
        bottomDivider
        style={{
          marginBottom: 5,
          backgroundColor: theme.light,
          width: '100%',
        }}
      >
        {/* <Avatar rounded source={{ uri: item.logoUrl }} /> */}
        <ListItem.Content>
          <ListItem.Title>
            <Text
              style={{
                fontFamily: 'MontserratMedium',
                fontSize: 18,
              }}
            >
              {title}
            </Text>
          </ListItem.Title>
          {subTitle ? <ListItem.Subtitle>{subTitle}</ListItem.Subtitle> : null}
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};
export default SimpleListItem;
