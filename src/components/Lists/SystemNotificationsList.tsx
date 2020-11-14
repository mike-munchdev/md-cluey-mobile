import React, { FC, Fragment, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import theme from '../../constants/theme';
import { ISystemNotification } from '../../interfaces';
import { SystemNotificationListItem } from '../ListItem';
import ListEmptyView from '../ListItem/ListEmptyView';

import styles from './styles';

export interface ISystemNotificationsListProps {
  list: ISystemNotification[];
  loading: boolean;
  handleRefresh?: (() => void) | undefined;
  refreshing: boolean;
}

const SystemNotificationsList: FC<ISystemNotificationsListProps> = ({
  list,
  loading,
  handleRefresh,
  refreshing,
}) => {
  const sortList = (list: ISystemNotification[]) => {
    return list.sort((a: ISystemNotification, b: ISystemNotification) => {
      return a.createdAt > b.createdAt;
    });
  };

  return (
    <View style={styles.companiesContainer}>
      {loading ? (
        <ActivityIndicator color={theme.dark.hex} size="large" />
      ) : (
        <Fragment>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            style={{ width: '100%' }}
            data={sortList(list)}
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
