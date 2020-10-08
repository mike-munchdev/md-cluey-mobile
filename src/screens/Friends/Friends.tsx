import React, { FC, useEffect, useState } from 'react';
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

export interface IFriend {
  id: number;
  name: string;
  avatar_url: string;
  userName: string;
}

export const friends: IFriend[] = [
  {
    id: 1,
    name: 'Maryclaire Manard',
    avatar_url:
      'https://media-exp1.licdn.com/dms/image/C5603AQGd-l7aP66k6Q/profile-displayphoto-shrink_400_400/0?e=1605744000&v=beta&t=IJWMidEMvulNe9cge1DE3o627NInvt7I8IUAt76AExY',
    userName: 'maryclairemanard',
  },
  {
    id: 2,
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    userName: 'amyfarha',
  },
  {
    id: 3,
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    userName: 'chris.jackson',
  },
];
const Friends: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState(friends);
  const navigation = useNavigation();

  useEffect(() => {
    const searchLowercase = searchQuery.toLowerCase();
    const newList = friends.filter(
      (f) =>
        f.name.toLowerCase().includes(searchLowercase) ||
        f.userName.toLowerCase().includes(searchLowercase)
    );
    setFilteredList(newList);
  }, [searchQuery]);

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
                    <ListItem
                      key={item.id}
                      bottomDivider
                      style={{ marginBottom: 5 }}
                    >
                      <Avatar source={{ uri: item.avatar_url }} />
                      <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{`@${item.userName}`}</ListItem.Subtitle>
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
