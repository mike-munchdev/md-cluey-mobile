import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import styles from './styles';
import {
  getUserSystemNotificationsCompleted,
  getUserSystemNotificationsError,
  GET_USER_SYSTEM_NOTIFICATIONS,
} from '../../graphql/queries/systemnotifications/';
import { useLazyQuery } from '@apollo/react-hooks';

import { SystemNotificationsList } from '../../components/Lists';
import { StandardContainer } from '../../components/Containers';
import { NavHeader } from '../../components/Headers';
import { AppContext } from '../../config/context';

const SystemNotifications: FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  const [getSystemNotifications] = useLazyQuery(GET_USER_SYSTEM_NOTIFICATIONS, {
    fetchPolicy: 'network-only',
    onError: getUserSystemNotificationsError(dispatch, setIsLoading),
    onCompleted: getUserSystemNotificationsCompleted(dispatch, setIsLoading),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      await getSystemNotifications({
        variables: {
          userId: state.user?.id,
        },
      });
    })();
  }, []);

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <NavHeader showMenu title="Notifications" />
        <SystemNotificationsList
          list={state.notifications}
          loading={isLoading}
        />
      </View>
    </StandardContainer>
  );
};
export default SystemNotifications;
