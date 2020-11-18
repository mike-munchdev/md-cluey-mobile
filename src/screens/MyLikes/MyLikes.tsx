import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import styles from './styles';

import { StandardContainer } from '../../components/Containers';
import { useLazyQuery } from '@apollo/react-hooks';
import {
  getUserCompanyResponsesCompleted,
  getUserCompanyResponsesError,
  GET_USER_COMPANY_RESPONSES,
} from '../../graphql/queries/user';
import { AppContext } from '../../config/context';
import MyLikesList from '../../components/Lists/MyLikesList';
import { NavHeader } from '../../components/Headers';
import { ICompanyReponse } from '../../interfaces';

const MyLikes: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const { user } = state;

  const reset = () => {
    setIsLoading(false);
  };
  const [getUserCompanyResponses] = useLazyQuery(GET_USER_COMPANY_RESPONSES, {
    fetchPolicy: 'network-only',
    onError: getUserCompanyResponsesError(dispatch, state.alertVisible, reset),
    onCompleted: getUserCompanyResponsesCompleted(
      reset,
      dispatch,
      setFilteredList
    ),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getUserCompanyResponses({
        variables: {
          userId: user?.id,
        },
      });
    })();
  }, []);

  const filterList = (query: String) => {
    const searchLowercase = query.toLowerCase();

    const newList = state.companyResponses.filter((f: ICompanyReponse) =>
      f.company.name.toLowerCase().includes(searchLowercase)
    );

    return newList;
  };

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <NavHeader title="My Likes" showMenu />
        <MyLikesList
          loading={isLoading}
          list={searchQuery ? filterList(searchQuery) : state.companyResponses}
          searchQuery={searchQuery}
          onChangeSearch={onChangeSearch}
          refreshing={isLoading}
          handleRefresh={async () => {
            await getUserCompanyResponses({
              variables: {
                userId: user?.id,
              },
            });
          }}
        />
      </View>
    </StandardContainer>
  );
};
export default MyLikes;
