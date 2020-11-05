import Constants from 'expo-constants';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import theme from '../../constants/theme';
import { NODE_ENV } from '../../hooks/serverInfo';
import { ISystemNotification } from '../../interfaces';
import { NavListItem, SystemNotificationListItem } from '../ListItem';
import ListEmptyView from '../ListItem/ListEmptyView';

import styles from './styles';

export interface ISystemNotificationsListProps {
  list: ISystemNotification[];
  loading: boolean;
}

const SystemNotificationsList: FC<ISystemNotificationsListProps> = ({
  list,
  loading,
}) => {
  const [orderedList, setOrderedList] = useState(list);

  useEffect(() => {
    const listOrdered = list.sort(
      (a: ISystemNotification, b: ISystemNotification) => {
        return a.createdAt > b.createdAt;
      }
    );

    setOrderedList(listOrdered);
  }, [list]);

  return (
    <View style={styles.companiesContainer}>
      {loading ? (
        <ActivityIndicator color={theme.dark.hex} size="large" />
      ) : (
        <Fragment>
          <FlatList
            style={{ width: '100%' }}
            data={orderedList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <SystemNotificationListItem item={item} title={item.message} />
              );
            }}
            ListEmptyComponent={() => {
              return <ListEmptyView title="No notifications" />;
            }}
          />
        </Fragment>
      )}
    </View>
  );
};
export default SystemNotificationsList;
