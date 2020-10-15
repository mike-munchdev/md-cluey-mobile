import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import { StandardContainer } from '../../components/Containers';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { useLazyQuery } from '@apollo/react-hooks';
import {
  getUserCompanyResponsesCompleted,
  getUserCompanyResponsesError,
  GET_USER_COMPANY_RESPONSES,
} from '../../graphql/queries/user/user';
import { AppContext } from '../../config/context';
import MyLikesList from '../../components/Lists/MyLikesList';
import { PageHeaderText } from '../../components/Text';
import { NavHeader } from '../../components/Headers';

const MyLikes: FC = () => {
  const { user } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <StandardContainer isLoading={isLoading}>
      <View style={styles.overlayContainer}>
        <NavHeader title="My Likes" />

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
