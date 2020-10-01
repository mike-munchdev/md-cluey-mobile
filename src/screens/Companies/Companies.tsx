import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import theme from '../../constants/theme';
import {
  getCompaniesByProductTypeCompleted,
  getCompaniesByProductTypeError,
  GET_COMPANIES_BY_PRODUCT_TYPE,
} from '../../graphql/queries/company/companies';
import { useLazyQuery } from '@apollo/react-hooks';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { CompaniesList } from '../../components/Lists';
import { StandardContainer } from '../../components/Containers';

const Companies: FC = () => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState('');

  const [companies, setCompanies] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [, setIsLoading] = useState(false);
  const [categoryId] = useState(
    route.params.categoryId ? route.params.categoryId : null
  );

  const [getCompaniesByProductType] = useLazyQuery(
    GET_COMPANIES_BY_PRODUCT_TYPE,
    {
      fetchPolicy: 'network-only',
      onError: getCompaniesByProductTypeError(
        setCompanies,
        setFilteredList,
        setIsLoading
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
      if (categoryId) {
        await getCompaniesByProductType({
          variables: {
            id: categoryId,
          },
        });
      }
    })();
  }, [categoryId]);

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
              fontSize: 50,
              color: theme.dark.hex,
            }}
          >
            Companies
          </Text>
        </View>
        <CompaniesList
          list={filteredList}
          searchQuery={searchQuery}
          onChangeSearch={onChangeSearch}
        />
      </View>
    </StandardContainer>
  );
};
export default Companies;
