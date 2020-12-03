import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { useRoute } from '@react-navigation/native';
import styles from './styles';
import theme from '../../constants/theme';

import { Button } from 'react-native-paper';
import { Avatar } from 'react-native-elements';

import { HorizontalRule } from '../../components/HorizontalRule';
import { StandardContainer } from '../../components/Containers';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import {
  getUserByIdCompleted,
  getUserByIdError,
  GET_USER_BY_ID,
  getUserCompanyResponsesCompleted,
  getUserCompanyResponsesError,
  GET_USER_COMPANY_RESPONSES,
} from '../../graphql/queries/user/';
import { NavHeader } from '../../components/Headers';
import { FriendLikesList } from '../../components/Lists';
import { AppContext } from '../../config/context';
import {
  deleteFriendshipByIdCompleted,
  deleteFriendshipByIdError,
  DELETE_FRIENDSHIP_BY_ID,
  getFriendshipBetweenUsersCompleted,
  getFriendshipBetweenUsersError,
  GET_FRIENDSHIP_BETWEEN_USERS,
  requestFriendshipCompleted,
  requestFriendshipError,
  REQUEST_FRIENDSHIP,
  getUserFriendsCompleted,
  getUserFriendsError,
  GET_USER_FRIENDS,
} from '../../graphql/queries/friends';

const Friend: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [friendshipLoading, setFriendshipLoading] = useState(true);

  const [friendships, setFriendships] = useState([]);
  const [companyResponses, setCompanyResponses] = useState([]);
  const [isCompanyResponsesLoading, setIsCompanyResponsesLoading] = useState(
    true
  );
  const [iconName, setIconName] = useState('account-plus-outline');
  const [iconColor, setIconColor] = useState(theme.dark.hex);
  const [buttonText, setButtonText] = useState('Add Friend');
  const route = useRoute();
  const { friend, user, friendship } = state;

  const reset = () => {
    setIsCompanyResponsesLoading(false);
  };

  const [getUserCompanyResponses] = useLazyQuery(GET_USER_COMPANY_RESPONSES, {
    fetchPolicy: 'network-only',
    onError: getUserCompanyResponsesError(dispatch, state.alertVisible, reset),
    onCompleted: getUserCompanyResponsesCompleted(
      reset,
      dispatch,
      setCompanyResponses
    ),
  });

  const [getUserById] = useLazyQuery(GET_USER_BY_ID, {
    fetchPolicy: 'network-only',
    onError: getUserByIdError(dispatch, state.alertVisible, setIsLoading),
    onCompleted: getUserByIdCompleted(dispatch, setIsLoading),
  });

  const [requestFriendship] = useMutation(REQUEST_FRIENDSHIP, {
    onError: requestFriendshipError(dispatch, state.alertVisible, setIsLoading),
    onCompleted: requestFriendshipCompleted(dispatch, setIsLoading),
  });

  const [deleteFriendshipById] = useMutation(DELETE_FRIENDSHIP_BY_ID, {
    onError: deleteFriendshipByIdError(
      dispatch,
      state.alertVisible,
      setIsLoading
    ),
    onCompleted: deleteFriendshipByIdCompleted(dispatch, setIsLoading),
  });

  const [getFriendshipBetweenUsers] = useLazyQuery(
    GET_FRIENDSHIP_BETWEEN_USERS,
    {
      fetchPolicy: 'network-only',
      onError: getFriendshipBetweenUsersError(
        dispatch,
        state.alertVisible,
        setIsLoading
      ),
      onCompleted: getFriendshipBetweenUsersCompleted(dispatch, setIsLoading),
    }
  );

  const [getUserFriends] = useLazyQuery(GET_USER_FRIENDS, {
    fetchPolicy: 'network-only',
    onError: getUserFriendsError(
      setFriendships,
      setFriendshipLoading,
      dispatch,
      state.alertVisible
    ),
    onCompleted: getUserFriendsCompleted(null, setFriendships, setIsLoading),
  });

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
    } else {
      switch (friendship.status) {
        case 'accepted':
          await deleteFriendshipById({
            variables: {
              input: {
                friendshipId: friendship.id,
              },
            },
          });
          await getUserFriends({
            variables: {
              userId: friend?.id,
            },
          });
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (route.params.friend) {
        await getUserById({ variables: { userId: route.params.friend.id } });
        await getFriendshipBetweenUsers({
          variables: { userId1: route.params.friend.id, userId2: user?.id },
        });
        await getUserFriends({
          variables: {
            userId: route.params.friend.id,
          },
        });
        setIsCompanyResponsesLoading(true);
        await getUserCompanyResponses({
          variables: {
            userId: route.params.friend.id,
          },
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (friendship) {
      switch (friendship.status) {
        case 'accepted':
          setIconName('account-remove-outline');
          setButtonText('Unfriend');
          setIconColor(theme.errorText);

          break;
        case 'requested':
          setIconName('account-clock-outline');
          setButtonText('Requested');
          setIconColor(theme.dark.hex);

          break;
        default:
          setIconName('account-plus-outline');
          setButtonText('Add Friend');
          setIconColor(theme.dark.hex);
      }
    } else {
      setIconName('account-plus-outline');
      setButtonText('Add Friend');
    }
  }, [friendship]);

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
                  contentStyle={{ backgroundColor: iconColor }}
                  labelStyle={{ color: theme.text }}
                  color={theme.dark.hex}
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
                  {`${friendships ? friendships.length : 0} Friends`}
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
              list={companyResponses}
              loading={isCompanyResponsesLoading}
            />
          </View>
        </View>
      </View>
    </StandardContainer>
  );
};
export default Friend;
