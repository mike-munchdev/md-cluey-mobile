import React, { FC, useState } from 'react';
import { FlatList, View, Text } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';
import theme from '../../constants/theme';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { Button, List } from 'react-native-paper';
import { Avatar } from 'react-native-elements';

import { HorizontalRule } from '../../components/HorizontalRule';
import { StandardContainer } from '../../components/Containers';
import { IFriend } from '../../interfaces';

const Friend: FC = () => {
  const [] = useState('');
  const [areWeFriends, setAreWeFriends] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const [friend] = useState<IFriend | undefined>(
    route.params.friendId
      ? friends.find((f) => f.id === route.params.friendId)
      : null
  );
  const toggleFriendship = () => {
    setAreWeFriends(!areWeFriends);
  };

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ marginLeft: 20, marginTop: 20 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome5 name="angle-left" size={24} color={theme.dark.hex} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 20, marginTop: 20 }}
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <FontAwesome5 name="bars" size={24} color={theme.dark.hex} />
          </TouchableOpacity>
        </View>
        <View style={styles.friendsContainer}>
          <Avatar
            size="xlarge"
            rounded
            source={{
              uri: friend.avatar_url,
            }}
          />
          <View style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, color: theme.dark.hex }}>
                {friend.name}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{ fontSize: 14, color: theme.dark.rgba(0.6) }}
              >{`@${friend.userName}`}</Text>
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
                  icon={
                    areWeFriends
                      ? 'account-check-outline'
                      : 'account-plus-outline'
                  }
                  mode="contained"
                  onPress={() => toggleFriendship()}
                >
                  {areWeFriends ? 'Friends' : 'Add Friend'}
                </Button>
              </View>
              <View
                style={{
                  width: '50%',
                  alignItems: 'flex-start',
                }}
              >
                <Button
                  contentStyle={{ backgroundColor: theme.dark.hex }}
                  labelStyle={{ color: theme.text }}
                  color={theme.text}
                  style={{ marginLeft: 10, width: 150 }}
                  mode="contained"
                  onPress={() => console.log('friends')}
                >
                  {`500 Friends`}
                </Button>
              </View>
            </View>

            <HorizontalRule
              styles={{
                marginVertical: 20,
                backgroundColor: theme.dark.rgba(0.4),
              }}
            />
            <View
              style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}
            >
              <FlatList
                data={[]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <List.Item
                      a
                      style={{ backgroundColor: 'white' }}
                      title={item.title}
                      description={item.brand ? item.brand.name : ''}
                      // left={(props) => <List.Icon {...props} icon="folder" />}
                    />
                  );
                }}
                //   renderItem={({ item }) => (
                //     <TouchableOpacity onPress={() => handleItemPress(item)}>
                //       <Text>{item}</Text>
                //     </TouchableOpacity>
                //   )}
              />
            </View>
          </View>
        </View>
      </View>
    </StandardContainer>
  );
};
export default Friend;
