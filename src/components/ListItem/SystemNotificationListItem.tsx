import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import theme from '../../constants/theme';
import { useMutation } from '@apollo/react-hooks';
import {
  acceptFriendshipError,
  acceptFriendshipCompleted,
  ACCEPT_FRIENDSHIP,
} from '../../graphql/queries/friends';
import { AppContext } from '../../config/context';
import { ActivityIndicator } from 'react-native-paper';

export interface ISystemNotificationListItemProps {
  item: any;
  title: string;
}

const SystemNotificationListItem: FC<ISystemNotificationListItemProps> = ({
  item,
  title,
}) => {
  const { state, dispatch } = useContext(AppContext);
  const [notification, setNotification] = useState(item);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  // if (notification) {
  //   const responses = [
  //     ...user?.companyResponses.filter((r) => r.id !== notification.id),
  //     notification,
  //   ];
  //   const updatedUser = { ...user };
  //   updatedUser.companyResponses = responses;

  //   setUser(updatedUser);
  // }
  // }, [notification]);

  const [acceptFriendship] = useMutation(ACCEPT_FRIENDSHIP, {
    onError: acceptFriendshipError(dispatch, setIsLoading),
    onCompleted: acceptFriendshipCompleted(dispatch, setIsLoading),
  });

  // const updateResponse = (response: string, companyId: string) => {
  //   setIsLoading(true);
  //   updateCompanyResponseForUser({
  //     variables: {
  //       input: {
  //         userId: user?.id,
  //         companyId,
  //         response,
  //       },
  //     },
  //   });
  // };

  return (
    <ListItem
      key={notification.id}
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
          {/* <ListItem.Chevron
            style={{ marginHorizontal: 7 }}
            name="envelope"
            type="font-awesome-5"
            size={22}
            color={theme.dark.hex}
            onPress={
              () => console.log('unread')
              // updateResponse('will-not-buy', notification.company.id)
            }
          /> */}
          <ListItem.Chevron
            style={{ marginHorizontal: 7 }}
            name="plus-circle"
            type="font-awesome-5"
            size={22}
            color={theme.dark.hex}
            onPress={
              () => console.log('read')
              // updateResponse('will-not-buy', notification.company.id)
            }
          />
          <ListItem.Chevron
            style={{ marginHorizontal: 7 }}
            name="times-circle"
            type="font-awesome-5"
            size={22}
            color={theme.dark.hex}
            onPress={
              () => console.log('delete')
              // updateResponse('will-not-buy', notification.company.id)
            }
          />
        </Fragment>
      )}
    </ListItem>
  );
};

export default SystemNotificationListItem;
