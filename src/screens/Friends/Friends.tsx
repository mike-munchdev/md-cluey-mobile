import React, { FC, useContext, useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

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
} from '../../graphql/queries/friends/friends';
import { AppContext } from '../../config/context';
import { FlatListHeader, NavHeader } from '../../components/Headers';
import {
  getPublicAndActiveNonFriendsByNameCompleted,
  getPublicAndActiveNonFriendsByNameError,
  GET_PUBLIC_AND_ACTVE_NON_FRIENDS_BY_NAME,
} from '../../graphql/queries/user/user';
import { throttle, debounce } from 'throttle-debounce';
import { IFriend } from '../../interfaces';

const Friends: FC = () => {
  const [isPublicUsersLoading, setIsPublicUsersLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [friendships, setFriendships] = useState([]);
  const [publicUsers, setPublicUsers] = useState([]);
  const [filteredUsersList, setFilteredUsersList] = useState([]);
  const [autoCompleteCache, setAutoCompleteCache] = useState({});
  const { user, setUser } = useContext(AppContext);

  const navigation = useNavigation();

  const [getUserFriends] = useLazyQuery(GET_USER_FRIENDS, {
    fetchPolicy: 'network-only',
    onError: getUserFriendsError(setFriendships, setIsPublicUsersLoading),
    onCompleted: getUserFriendsCompleted(
      setFriendships,
      setFilteredList,
      setIsLoading
    ),
  });

  const [getPublicAndActiveNonFriendsByName] = useLazyQuery(
    GET_PUBLIC_AND_ACTVE_NON_FRIENDS_BY_NAME,
    {
      fetchPolicy: 'network-only',
      onError: getPublicAndActiveNonFriendsByNameError(
        setFriendships,
        setIsPublicUsersLoading
      ),
      onCompleted: getPublicAndActiveNonFriendsByNameCompleted(
        setPublicUsers,
        setIsPublicUsersLoading,
        setAutoCompleteCache,
        autoCompleteCache
      ),
    }
  );

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

  const filterFriends = () => {
    const searchLowercase = searchQuery.toLowerCase();
    const newList = friendships.filter((f) => {
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
        setPublicUsers(cached);
        setIsPublicUsersLoading(false);
      } else {
        setIsPublicUsersLoading(true);
        autocompleteSearchThrottled(searchQuery);
      }
    } else if (searchQuery.length >= 5) {
      const cached = autoCompleteCache[searchQuery];
      if (cached) {
        setPublicUsers(cached);
        setIsPublicUsersLoading(false);
      } else {
        setIsPublicUsersLoading(true);
        autocompleteSearchDebounced(searchQuery);
      }
    } else {
      setPublicUsers([]);
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

  const autocompleteSearchDebounced = debounce(500, autocompleteSearch);
  const autocompleteSearchThrottled = throttle(500, autocompleteSearch);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <NavHeader goBack title="Friends" />

        <View style={styles.friendsContainer}>
          <Searchbar
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="off"
            placeholder="Name or @username"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <View style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}>
            <FlatListHeader title="Friends" />
            {isLoading ? (
              <ActivityIndicator color={theme.dark.hex} size="large" />
            ) : (
              <FlatList
                data={filteredList}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => {
                  const friend =
                    item.requester.id === user?.id
                      ? item.recipient
                      : item.requester;

                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Friend', { friend: friend })
                      }
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
                          <ListItem.Subtitle>{`@${friend.username}`}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => {
                  return <View style={{ alignItems: 'center' }}></View>;
                }}
              />
            )}
          </View>
          {searchQuery.length >= 3 ? (
            <View
              style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}
            >
              <FlatListHeader title="Other Users" />
              <FlatList
                data={publicUsers}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Friend', { friend: item })
                      }
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
                          <ListItem.Subtitle>{`@${item.username}`}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => {
                  return <View style={{ alignItems: 'center' }}></View>;
                }}
              />
            </View>
          ) : null}
        </View>
      </View>
    </StandardContainer>
  );
};
export default Friends;
