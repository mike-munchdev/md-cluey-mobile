import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import {
  getCompaniesByProductTypeCompleted,
  getCompaniesByProductTypeError,
  GET_COMPANIES_BY_PRODUCT_TYPE,
} from '../../graphql/queries/company/companies';
import { useLazyQuery } from '@apollo/react-hooks';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { CompaniesList } from '../../components/Lists';
import { StandardContainer } from '../../components/Containers';
import { PageHeaderText } from '../../components/Text';

const Companies: FC = () => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState('');

  const [companies, setCompanies] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [, setIsLoading] = useState(false);
  const [category] = useState(route.params.category);

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
