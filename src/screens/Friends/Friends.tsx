import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { View, SectionList, RefreshControl } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import theme from '../../constants/theme';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { Avatar, ListItem } from 'react-native-elements';
import { StandardContainer } from '../../components/Containers';

import { useLazyQuery } from '@apollo/react-hooks';
import {
  getUserFriendsCompleted,
  getUserFriendsError,
  GET_USER_FRIENDS,
} from '../../graphql/queries/friends/';
import {
  getUserSystemNotificationsCompleted,
  getUserSystemNotificationsError,
  GET_USER_SYSTEM_NOTIFICATIONS,
} from '../../graphql/queries/systemnotifications';

import { AppContext } from '../../config/context';
import { FlatListHeader, NavHeader } from '../../components/Headers';
import {
  getPublicAndActiveNonFriendsByNameCompleted,
  getPublicAndActiveNonFriendsByNameError,
  GET_PUBLIC_AND_ACTVE_NON_FRIENDS_BY_NAME,
} from '../../graphql/queries/user/';
import { throttle, debounce } from 'throttle-debounce';
import ListEmptyView from '../../components/ListItem/ListEmptyView';
import { NotificationsIcon } from '../../components/Icons';

const Friends: FC = () => {
  const [, setIsPublicUsersLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  const [, setFilteredList] = useState([]);
  const [, setFriendships] = useState([]);
  const [data, setData] = useState([
    { title: 'Friends', data: [] },
    { title: 'Public Users', data: [] },
  ]);

  const [autoCompleteCache, setAutoCompleteCache] = useState({});
  const { state, dispatch } = useContext(AppContext);

  const { friends, publicUsers, user } = state;
  const navigation = useNavigation();

  useEffect(() => {
    setData([
      {
        title: 'Friends',
        data: friends || [],
        renderItem: renderFriendItem,
        ListEmptyComponent: <ListEmptyView title="No Friends Found" />,
      },
      {
        title: 'Users',
        data: publicUsers || [],
        renderItem: renderOtherUserItem,
        ListEmptyComponent: <ListEmptyView title="No Users Found" />,
      },
    ]);
  }, [friends, publicUsers]);

  const [getUserFriends] = useLazyQuery(GET_USER_FRIENDS, {
    fetchPolicy: 'network-only',
    onError: getUserFriendsError(
      setFriendships,
      setIsPublicUsersLoading,
      dispatch,
      state.alertVisible
    ),
    onCompleted: getUserFriendsCompleted(
      dispatch,
      setFilteredList,
      setIsLoading
    ),
  });

  const [getPublicAndActiveNonFriendsByName] = useLazyQuery(
    GET_PUBLIC_AND_ACTVE_NON_FRIENDS_BY_NAME,
    {
      fetchPolicy: 'network-only',
      onError: getPublicAndActiveNonFriendsByNameError(
        dispatch,
        state.alertVisible,
        setIsPublicUsersLoading
      ),
      onCompleted: getPublicAndActiveNonFriendsByNameCompleted(
        dispatch,
        setIsPublicUsersLoading,
        setAutoCompleteCache,
        autoCompleteCache
      ),
    }
  );

  const [getSystemNotifications] = useLazyQuery(GET_USER_SYSTEM_NOTIFICATIONS, {
    fetchPolicy: 'network-only',
    onError: getUserSystemNotificationsError(
      dispatch,
      state.alertVisible,
      setNotificationsLoading
    ),
    onCompleted: getUserSystemNotificationsCompleted(
      dispatch,
      setNotificationsLoading
    ),
  });

  const onRefresh = async () => {
    if (user) {
      await getUserFriends({
        variables: {
          userId: user.id,
        },
      });

      await getSystemNotifications({
        variables: {
          userId: user.id,
        },
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (user) {
        await getUserFriends({
          variables: {
            userId: user.id,
          },
        });
      }
    })();
  }, []);

  const isTextFound = (value:string, searchText:string ):boolean => {
    if (!value) return false;
    return value.toLowerCase().includes(searchText.toLowerCase());
  }
  const filterFriends = () => {
    const searchLowercase = searchQuery.toLowerCase();
    const newList = state.friends.filter((f) => {
      const friend = f.requester.id === user?.id ? f.recipient : f.requester;
      return (
        isTextFound(friend.firstName, searchQuery) ||
        isTextFound(friend.lastName, searchQuery) ||
        isTextFound(`${friend.firstName.toLowerCase()} ${friend.lastName.toLowerCase()}`, searchQuery) ||
        isTextFound(friend.userName, searchQuery)
        
      );
    });
    setFilteredList(newList);
  };

  const searchPublicUsers = () => {
    if (searchQuery.length < 5 && searchQuery.length >= 3) {
      const cached = autoCompleteCache[searchQuery];
      if (cached) {
        dispatch({ type: 'UPDATE_PUBLIC_USERS', payload: cached });
        setIsPublicUsersLoading(false);
      } else {
        setIsPublicUsersLoading(true);
        autocompleteSearchThrottled(searchQuery);
      }
    } else if (searchQuery.length >= 5) {
      const cached = autoCompleteCache[searchQuery];
      if (cached) {
        dispatch({ type: 'UPDATE_PUBLIC_USERS', payload: cached });
        setIsPublicUsersLoading(false);
      } else {
        setIsPublicUsersLoading(true);
        autocompleteSearchDebounced(searchQuery);
      }
    } else {
      dispatch({ type: 'UPDATE_PUBLIC_USERS', payload: [] });
    }
  };

  useEffect(() => {
    // filter friends
    filterFriends();
    // search Public Users
    searchPublicUsers();
  }, [searchQuery]);

  const autocompleteSearch = () => {
    getPublicAndActiveNonFriendsByName({
      variables: {
        name: searchQuery,
        exact: false,
      },
    });
  };

  const renderFriendItem = ({ item }) => {
    const friend =
      item.requester.id === user?.id ? item.recipient : item.requester;

    return (
      <ListItem
        style={{ marginBottom: 5 }}
        onPress={() => navigation.navigate('Friend', { friend: friend })}
      >
        <Avatar
          icon={{
            name: 'user',
            type: 'font-awesome',
            size: 20,
          }}
          overlayContainerStyle={{
            backgroundColor: theme.dark.hex,
          }}
          size="small"
          rounded
        />
        <ListItem.Content>
          <ListItem.Title>{`${friend.firstName} ${friend.lastName}`}</ListItem.Title>
          <ListItem.Subtitle>
            {friend.username ? `@${friend.username}` : ''}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  const renderOtherUserItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Friend', { friend: item })}
      >
        <ListItem style={{ marginBottom: 5 }}>
          <Avatar
            icon={{
              name: 'user',
              type: 'font-awesome',
              size: 20,
            }}
            overlayContainerStyle={{
              backgroundColor: theme.dark.hex,
            }}
            size="small"
            rounded
          />
          <ListItem.Content>
            <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
            <ListItem.Subtitle>
              {item.username ? `@${item.username}` : ''}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  };

  const autocompleteSearchDebounced = debounce(500, autocompleteSearch);
  const autocompleteSearchThrottled = throttle(500, autocompleteSearch);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <NavHeader
          showMenu
          title="Friends"
          rightIcon={() => (
            <NotificationsIcon
              onPress={() => {
                navigation.navigate('SystemNotifications');
              }}
            />
          )}
        />

        <View style={styles.friendsContainer}>
          <Searchbar
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="off"
            placeholder="Name or @username"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{ marginHorizontal: 10 }}
          />
          <Fragment>
            {isLoading ? (
              <ActivityIndicator color={theme.dark.hex} size="large" />
            ) : (
              <SectionList
                style={{
                  height: '85%',
                  width: '100%',

                  marginTop: 10,
                }}
                sections={data}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                  />
                }
                renderSectionHeader={({ section }) => {
                  if (searchQuery.length < 3 && section.title === 'Users')
                    return null;
                  return (
                    <FlatListHeader
                      title={section.title}
                      containerStyle={{ backgroundColor: theme.gray.hex }}
                      textStyle={{ color: theme.opaqueText.hex }}
                    />
                  );
                }}
                renderSectionFooter={({ section }) => {
                  if (searchQuery.length < 3 && section.title === 'Users') {
                    return null;
                  } else if (section.data.length === 0) {
                    return section.ListEmptyComponent;
                  } else {
                    return null;
                  }
                }}
                ListEmptyComponent={() => {
                  return <ListEmptyView title="No data" />;
                }}
                stickySectionHeadersEnabled
              />
            )}
          </Fragment>
        </View>
      </View>
    </StandardContainer>
  );
};
export default Friends;
