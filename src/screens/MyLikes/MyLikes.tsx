import React, { FC, useContext, useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import theme from '../../constants/theme';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { Searchbar } from 'react-native-paper';
import { Avatar, ListItem } from 'react-native-elements';
import { StandardContainer } from '../../components/Containers';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { useLazyQuery } from '@apollo/react-hooks';
import {
  getUserCompanyResponsesCompleted,
  getUserCompanyResponsesError,
  GET_USER_COMPANY_RESPONSES,
} from '../../graphql/queries/user/user';
import { getProductTypesByCategoryCompleted } from '../../graphql/queries/productTypes/productTypes';
import { AppContext } from '../../config/context';
import MyLikesList from '../../components/Lists/MyLikesList';

const MyLikes: FC = () => {
  const { user } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const reset = () => {
    setIsLoading(false);
  };
  const [getUserCompanyResponses] = useLazyQuery(GET_USER_COMPANY_RESPONSES, {
    fetchPolicy: 'network-only',
    onError: getUserCompanyResponsesError(reset),
    onCompleted: getUserCompanyResponsesCompleted(
      reset,
      setResponses,
      setFilteredList
    ),
  });

  useEffect(() => {
    (async () => {
      await getUserCompanyResponses({
        variables: {
          userId: user?.id,
        },
      });
    })();
  }, []);

  useEffect(() => {
    // const searchLowercase = searchQuery.toLowerCase();
    // const newList = friends.filter(
    //   (f) =>
    //     f.name.toLowerCase().includes(searchLowercase) ||
    //     f.userName.toLowerCase().includes(searchLowercase)
    // );
    // setFilteredList(newList);
  }, [searchQuery]);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <NavigationHeader goBack />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'CoinyRegular',
              fontSize: 48,
              color: theme.dark.hex,
            }}
          >
            My Likes
          </Text>
        </View>

        <MyLikesList
          list={filteredList}
          searchQuery={searchQuery}
          onChangeSearch={onChangeSearch}
        />
      </View>
    </StandardContainer>
  );
};
export default MyLikes;
