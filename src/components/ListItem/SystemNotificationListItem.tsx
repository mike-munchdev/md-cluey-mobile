import React, { FC, Fragment, useContext, useState } from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import theme from '../../constants/theme';
import { useMutation } from '@apollo/react-hooks';
import {
  acceptFriendshipError,
  acceptFriendshipCompleted,
  ACCEPT_FRIENDSHIP,
  REQUEST_FRIENDSHIP,
  rejectFriendshipError,
  rejectFriendshipCompleted,
  REJECT_FRIENDSHIP,
} from '../../graphql/queries/friends';
import { AppContext } from '../../config/context';
import { ActivityIndicator } from 'react-native-paper';
import { ISystemNotification } from '../../interfaces';
import {
  updateNotificationCompleted,
  updateNotificationError,
  UPDATE_NOTIFICATION,
} from '../../graphql/queries/systemnotifications';

export interface ISystemNotificationListItemProps {
  item: any;
  title: string;
}

const SystemNotificationListItem: FC<ISystemNotificationListItemProps> = ({
  item,
  title,
}) => {
  const { dispatch, state } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);

  const [acceptFriendship] = useMutation(ACCEPT_FRIENDSHIP, {
    onError: acceptFriendshipError(dispatch, state.alertVisible, setIsLoading),
    onCompleted: acceptFriendshipCompleted(dispatch, setIsLoading),
  });
  const [rejectFriendship] = useMutation(REJECT_FRIENDSHIP, {
    onError: rejectFriendshipError(dispatch, state.alertVisible, setIsLoading),
    onCompleted: rejectFriendshipCompleted(dispatch, setIsLoading),
  });

  const [updateNotification] = useMutation(UPDATE_NOTIFICATION, {
    onError: updateNotificationError(
      dispatch,
      state.alertVisible,
      setIsLoading
    ),
    onCompleted: updateNotificationCompleted(dispatch, setIsLoading),
  });

  const getIconNameForNotificationType = (
    notification: ISystemNotification
  ) => {
    switch (notification.notificationType) {
      case 'friend-request':
        return 'plus-circle';
      case 'accepted-friend-request':
        return notification.isRead ? 'envelope-open' : 'envelope';
      case 'rejected-friend-request':
        return 'envelope';
      default:
        return 'envelope';
    }
  };

  const handleNotificationPress = (notification: ISystemNotification) => {
    switch (notification.notificationType) {
      case 'friend-request':
        acceptFriendship({
          variables: {
            input: {
              friendshipId: notification.linkId,
              notificationId: notification.id,
            },
          },
        });
        break;
      case 'accepted-friend-request':
        updateNotification({
          variables: {
            input: {
              isRead: !notification.isRead,
              notificationId: notification.id,
            },
          },
        });
        break;
      default:
        break;
    }
  };

  return (
    <ListItem
      key={item.id}
      bottomDivider
      style={{
        marginBottom: 5,
        backgroundColor: theme.light,
        width: '100%',
      }}
    >
      <ListItem.Content>
        <ListItem.Title>
          <Text
            style={{
              fontFamily: 'MontserratMedium',
              fontSize: 12,
            }}
          >
            {title}
          </Text>
        </ListItem.Title>
      </ListItem.Content>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={theme.dark.hex}
          style={{ flex: 1 }}
          size={34}
        />
      ) : (
        <Fragment>
          <ListItem.Chevron
            style={{ marginHorizontal: 7 }}
            name={getIconNameForNotificationType(item)}
            type="font-awesome-5"
            size={22}
            color={theme.dark.hex}
            onPress={() => {
              handleNotificationPress(item);
            }}
          />
          {item.notificationType === 'friend-request' ? (
            <ListItem.Chevron
              style={{ marginHorizontal: 7 }}
              name="times-circle"
              type="font-awesome-5"
              size={22}
              color={theme.dark.hex}
              onPress={() => {
                rejectFriendship({
                  variables: {
                    input: {
                      friendshipId: item.linkId,
                      notificationId: item.id,
                    },
                  },
                });
              }}
            />
          ) : null}
        </Fragment>
      )}
    </ListItem>
  );
};

export default SystemNotificationListItem;
