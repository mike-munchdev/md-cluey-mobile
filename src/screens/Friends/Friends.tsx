import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { FlatList, View, Text, SectionList } from 'react-native';

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
import { AppContext } from '../../config/context';
import { FlatListHeader, NavHeader } from '../../components/Headers';
import {
  getPublicAndActiveNonFriendsByNameCompleted,
  getPublicAndActiveNonFriendsByNameError,
  GET_PUBLIC_AND_ACTVE_NON_FRIENDS_BY_NAME,
} from '../../graphql/queries/user/';
import { throttle, debounce } from 'throttle-debounce';
import ListEmptyView from '../../components/ListItem/ListEmptyView';

const Friends: FC = () => {
  const [isPublicUsersLoading, setIsPublicUsersLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [friendships, setFriendships] = useState([]);
  const [data, setData] = useState([
    { title: 'Friends', data: [] },
    { title: 'Other Users', data: [] },
  ]);

  const [autoCompleteCache, setAutoCompleteCache] = useState({});
  const { state, dispatch } = useContext(AppContext);

  const { friends, publicUsers } = state;
  const navigation = useNavigation();

  useEffect(() => {
    setData([
      {
        title: 'Friends',
        data: friends || [],
        renderItem: renderFriendItem,
        ListEmptyComponent: <ListEmptyView title="No Friends" />,
      },
      {
        title: 'Other Users',
        data: publicUsers || [],
        renderItem: renderOtherUserItem,
        ListEmptyComponent: <ListEmptyView title="No Other Users" />,
      },
    ]);
  }, [friends, publicUsers]);

  const [getUserFriends] = useLazyQuery(GET_USER_FRIENDS, {
    fetchPolicy: 'network-only',
    onError: getUserFriendsError(setFriendships, setIsPublicUsersLoading),
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

  useEffect(() => {
    (async () => {
      if (state.user) {
        // console.log('user', state.user.id);
        await getUserFriends({
          variables: {
            userId: state.user.id,
          },
        });
      }
    })();
  }, []);

  const filterFriends = () => {
    const searchLowercase = searchQuery.toLowerCase();
    const newList = state.friends.filter((f) => {
      const friend = f.requester.id === user?.id ? f.recipient : f.requester;
      return (
        friend.firstName.toLowerCase().includes(searchLowercase) ||
        friend.lastName.toLowerCase().includes(searchLowercase) ||
        `${friend.firstName.toLowerCase()} ${friend.lastName.toLowerCase()}`.includes(
          searchLowercase
        ) ||
        friend.username.toLowerCase().includes(searchLowercase)
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
      <TouchableOpacity
        onPress={() => navigation.navigate('Friend', { friend: friend })}
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
            <ListItem.Title>{`${friend.firstName} ${friend.lastName}`}</ListItem.Title>
            <ListItem.Subtitle>
              {friend.username ? `@${friend.username}` : ''}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
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
        <NavHeader showMenu title="Friends" />

        <View style={styles.friendsContainer}>
          <Searchbar
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="off"
            placeholder="Name or @username"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <Fragment>
            {isLoading ? (
              <ActivityIndicator color={theme.dark.hex} size="large" />
            ) : (
              <SectionList
                style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}
                sections={data}
                keyExtractor={(item, index) => item.id.toString()}
                renderSectionHeader={({ section: { title } }) => (
                  <FlatListHeader title={title} />
                )}
                renderSectionFooter={({ section }) => {
                  if (section.data.length === 0) {
                    return section.ListEmptyComponent;
                  }
                  return null;
                }}
                ListEmptyComponent={() => {
                  return <ListEmptyView title="No data" />;
                }}
              />
            )}
          </Fragment>
        </View>
      </View>
    </StandardContainer>
  );
};
export default Friends;
