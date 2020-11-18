import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { useRoute } from '@react-navigation/native';

import styles from './styles';
import {
  getCompaniesByProductTypeCompleted,
  getCompaniesByProductTypeError,
  GET_COMPANIES_BY_PRODUCT_TYPE,
} from '../../graphql/queries/company';
import { useLazyQuery } from '@apollo/react-hooks';
import { CompaniesList } from '../../components/Lists';
import { StandardContainer } from '../../components/Containers';
import { NavHeader } from '../../components/Headers';
import { AppContext } from '../../config/context';

const Companies: FC = () => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState('');
  const { dispatch, state } = useContext(AppContext);
  const [companies, setCompanies] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [category] = useState(route.params.category);

  const [getCompaniesByProductType] = useLazyQuery(
    GET_COMPANIES_BY_PRODUCT_TYPE,
    {
      fetchPolicy: 'network-only',
      onError: getCompaniesByProductTypeError(
        setCompanies,
        setFilteredList,
        setIsLoading,
        dispatch,
        state.alertVisible
      ),
      onCompleted: getCompaniesByProductTypeCompleted(
        setCompanies,
        setFilteredList,
        setIsLoading
      ),
    }
  );

  useEffect(() => {
    (async () => {
      if (category.id) {
        await getCompaniesByProductType({
          variables: {
            id: category.id,
          },
        });
      }
    })();
  }, [category]);

  useEffect(() => {
    const searchLowercase = searchQuery.toLowerCase();
    const newList = companies.filter((c) =>
      c.name.toLowerCase().includes(searchLowercase)
    );

    setFilteredList(newList);
  }, [searchQuery]);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <NavHeader goBack title="Brands" subTitle={category.name} />

        <CompaniesList
          list={filteredList}
          loading={loading}
          searchQuery={searchQuery}
          onChangeSearch={onChangeSearch}
        />
      </View>
    </StandardContainer>
  );
};
export default Companies;
