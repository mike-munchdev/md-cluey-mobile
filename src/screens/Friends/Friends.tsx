import React, { FC, useContext, useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import FriendsContainer from './FriendsContainer';
import styles from './styles';
import theme from '../../constants/theme';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { Searchbar } from 'react-native-paper';
import { Avatar, ListItem } from 'react-native-elements';
import { StandardContainer } from '../../components/Containers';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { PageHeaderText } from '../../components/Text';
import { useLazyQuery } from '@apollo/react-hooks';
import {
  getUserFriendsCompleted,
  getUserFriendsError,
  GET_USER_FRIENDS,
} from '../../graphql/queries/friends/friends';
import { AppContext } from '../../config/context';

const Friends: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [publicUsers, setPublicUsers] = useState([]);
  const { user, setUser } = useContext(AppContext);

  const navigation = useNavigation();

  const [getUserFriends] = useLazyQuery(GET_USER_FRIENDS, {
    fetchPolicy: 'network-only',
    onError: getUserFriendsError(setFriends, setIsLoading),
    onCompleted: getUserFriendsCompleted(
      setFriends,
      setFilteredList,
      setIsLoading
    ),
  });

  useEffect(() => {
    (async () => {
      if (user) {
        console.log('user', user);
        await getUserFriends({
          variables: {
            userId: user.id,
          },
        });
      }
    })();
  }, []);
  // useEffect(() => {
  //   const searchLowercase = searchQuery.toLowerCase();
  //   const newList = friends.filter(
  //     (f) =>
  //       f.name.toLowerCase().includes(searchLowercase) ||
  //       f.userName.toLowerCase().includes(searchLowercase)
  //   );
  //   setFilteredList(newList);
  // }, [searchQuery]);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <NavigationHeader goBack />
        <PageHeaderText title="Friends" />
        <View style={styles.friendsContainer}>
          <Searchbar
            placeholder="Name or @username"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <View style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}>
            <FlatList
              data={filteredList}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Friend', { friendId: item.id })
                    }
                  >
                    <ListItem style={{ marginBottom: 5 }}>
                      <Avatar
                        icon={{ name: 'user', type: 'font-awesome', size: 20 }}
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
                return (
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        fontFamily: 'MontserratMedium',
                        fontSize: 24,
                        color: theme.dark.hex,
                      }}
                    >
                      No users
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </StandardContainer>
  );
};
export default Friends;
