import React, { FC, useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';

import CompaniesContainer from './CompaniesContainer';
import styles from './styles';
import theme from '../../constants/theme';
import {
  getCompaniesByProductTypeCompleted,
  getCompaniesByProductTypeError,
  GET_COMPANIES_BY_PRODUCT_TYPE,
} from '../../graphql/queries/company/companies';
import { useLazyQuery } from '@apollo/react-hooks';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { CompaniesList } from '../../components/Lists';

const Companies: FC = () => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState('');

  const [companies, setCompanies] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(
    route.params.categoryId ? route.params.categoryId : null
  );

  const navigation = useNavigation();
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
    <CompaniesContainer>
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
    </CompaniesContainer>
  );
};
export default Companies;
