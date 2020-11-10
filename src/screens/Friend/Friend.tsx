import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { useRoute } from '@react-navigation/native';
import styles from './styles';
import theme from '../../constants/theme';

import { Button } from 'react-native-paper';
import { Avatar } from 'react-native-elements';

import { HorizontalRule } from '../../components/HorizontalRule';
import { StandardContainer } from '../../components/Containers';
import {
  getUserByIdCompleted,
  getUserByIdError,
  GET_USER_BY_ID,
} from '../../graphql/queries/user/';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { NavHeader } from '../../components/Headers';
import { FriendLikesList } from '../../components/Lists';
import { AppContext } from '../../config/context';
import {
  getFriendshipBetweenUsersCompleted,
  getFriendshipBetweenUsersError,
  GET_FRIENDSHIP_BETWEEN_USERS,
  requestFriendshipCompleted,
  requestFriendshipError,
  REQUEST_FRIENDSHIP,
} from '../../graphql/queries/friends/';

const Friend: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const [iconName, setIconName] = useState('account-plus-outline');
  const [buttonText, setButtonText] = useState('Add Friend');
  const route = useRoute();
  const { friend, user, friendship } = state;

  const [getUserById] = useLazyQuery(GET_USER_BY_ID, {
    fetchPolicy: 'network-only',
    onError: getUserByIdError(dispatch, setIsLoading),
    onCompleted: getUserByIdCompleted(dispatch, setIsLoading),
  });

  const [requestFriendship] = useMutation(REQUEST_FRIENDSHIP, {
    onError: requestFriendshipError(dispatch, setIsLoading),
    onCompleted: requestFriendshipCompleted(dispatch, setIsLoading),
  });

  const [getFriendshipBetweenUsers] = useLazyQuery(
    GET_FRIENDSHIP_BETWEEN_USERS,
    {
      fetchPolicy: 'network-only',
      onError: getFriendshipBetweenUsersError(dispatch, setIsLoading),
      onCompleted: getFriendshipBetweenUsersCompleted(dispatch, setIsLoading),
    }
  );
  const updateFriendship = async () => {
    if (!friendship) {
      await requestFriendship({
        variables: {
          input: {
            requestorId: user?.id,
            recipientId: friend?.id,
          },
        },
      });
    }
  };

  useEffect(() => {
    (async () => {
      console.log('useEffect', route.params.friend);
      if (route.params.friend) {
        await getUserById({ variables: { userId: route.params.friend.id } });
        await getFriendshipBetweenUsers({
          variables: { userId1: route.params.friend.id, userId2: user?.id },
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (friend && friendship) {
      console.log('friendship', friendship);

      if (friendship) {
        switch (friendship.status) {
          case 'accepted':
            setIconName('account-check-outline');
            setButtonText('Friends');

            break;
          case 'requested':
            setIconName('account-clock-outline');
            setButtonText('Requested');

            break;
          default:
            setIconName('account-plus-outline');
            setButtonText('Add Friend');
        }
      } else {
        setIconName('account-plus-outline');
        setButtonText('Add Friend');
      }
    }
  }, [friend, friendship]);

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <NavHeader goBack />
        <View style={styles.friendsContainer}>
          <Avatar
            icon={{
              name: 'user',
              type: 'font-awesome',
              size: 36,
            }}
            overlayContainerStyle={{
              backgroundColor: theme.dark.hex,
            }}
            size="large"
            rounded
          />
          <View style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, color: theme.dark.hex }}>
                {friend ? `${friend.firstName} ${friend.lastName}` : ''}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: theme.dark.hex }}>
                {friend?.username ? `@${friend.username}` : ''}
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  width: '50%',

                  alignItems: 'flex-end',
                }}
              >
                <Button
                  contentStyle={{ backgroundColor: theme.dark.hex }}
                  labelStyle={{ color: theme.text }}
                  color={theme.text}
                  style={{ marginRight: 10, width: 150 }}
                  icon={iconName}
                  mode="contained"
                  onPress={() => updateFriendship()}
                >
                  {buttonText}
                </Button>
              </View>
              <View
                style={{
                  width: '50%',
                  alignItems: 'flex-start',
                }}
              >
                <Button
                  contentStyle={{ backgroundColor: theme.white.hex }}
                  labelStyle={{ color: theme.dark.hex }}
                  color={theme.text}
                  style={{ marginLeft: 10, width: 150 }}
                  mode="contained"
                >
                  {friend?.friendCount || 0}
                </Button>
              </View>
            </View>

            <HorizontalRule
              styles={{
                marginVertical: 20,
                backgroundColor: theme.dark.rgba(0.4),
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <FriendLikesList
              list={friend?.companyResponses}
              loading={isLoading}
            />
          </View>
        </View>
      </View>
    </StandardContainer>
  );
};
export default Friend;
