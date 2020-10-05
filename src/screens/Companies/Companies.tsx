import React, { FC, useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';

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
import { StandardContainer } from '../../components/Containers';
import { PageHeaderText } from '../../components/Text';

const Companies: FC = () => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState('');

  const [companies, setCompanies] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(route.params.category);

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
        <NavigationHeader goBack />
        <PageHeaderText title="Brands" subTitle={category.name} />
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
