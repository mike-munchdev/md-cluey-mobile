import React, { FC, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';

import { ActivityIndicator, Avatar } from 'react-native-paper';
import { useLazyQuery } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import styles from './styles';
import theme from '../../constants/theme';

import { searchSchema } from '../../validation/searchSchema';
import {
  PoliticalScoreCard,
  PeopleScoreCard,
  PlanetScoreCard,
} from '../../components/Cards';
import { ICompany } from '../../interfaces';
import { HorizontalRule } from '../../components/HorizontalRule';

import { RoundedIconButton } from '../../components/Buttons';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { ActionsView } from '../../components/Actions';
import {
  getCompanyByIdCompleted,
  getCompanyByIdError,
  GET_COMPANIES_BY_CATEGORY,
  GET_COMPANY_BY_ID,
} from '../../graphql/queries/company/companies';
import { StandardContainer } from '../../components/Containers';
import { NODE_ENV } from '../../hooks/serverInfo';

const Company: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [company, setCompany] = useState<ICompany | undefined>();

  const [companyId, setCompanyId] = useState<string | undefined>(
    route.params.companyId ? route.params.companyId : null
  );

  const [isLoading, setIsLoading] = useState(false);

  const [getCompanyById] = useLazyQuery(GET_COMPANY_BY_ID, {
    fetchPolicy: 'network-only',
    onError: getCompanyByIdError(setCompany, setIsLoading),
    onCompleted: getCompanyByIdCompleted(setCompany, setIsLoading),
  });

  useEffect(() => {
    console.log('company', company);
    console.log(
      `${
        Constants.manifest.extra.appVariables[String(NODE_ENV)]
          .brandLogoUrlPrefix
      }${company?.brandLogoUrl}`
    );
  }, [company]);
  useEffect(() => {
    (async () => {
      if (companyId) {
        await getCompanyById({ variables: { id: companyId } });
      }
    })();
  }, [companyId]);

  return (
    <Formik
      initialValues={{
        searchText: '',
      }}
      validationSchema={searchSchema}
      onSubmit={async () => {
        // const { search } = values;
        // await userSignup({
        //   variables: { input: { email, password, firstName, lastName } },
        // });
      }}
    >
      {({}) => {
        return (
          <StandardContainer>
            <View style={styles.overlayContainer}>
              <NavigationHeader goBack />
              <View style={styles.brandContainer}>
                {company?.brandLogoUrl ? (
                  <Image
                    source={{
                      uri: `${
                        Constants.manifest.extra.appVariables[String(NODE_ENV)]
                          .brandLogoUrlPrefix
                      }${company?.brandLogoUrl}`,
                    }}
                    style={{
                      width: '100%',
                      height: 200,
                      resizeMode: 'contain',
                    }}
                    PlaceholderContent={
                      <ActivityIndicator color={theme.dark.hex} />
                    }
                  />
                ) : (
                  <View>
                    <Text>{company?.name}</Text>
                  </View>
                )}
              </View>

              <View style={styles.infoContainer}>
                <View>
                  <PoliticalScoreCard company={company} />
                  <HorizontalRule
                    styles={{
                      marginTop: 20,
                      marginBottom: 20,
                      backgroundColor: theme.dark.hex,
                    }}
                  />
                  <PeopleScoreCard company={company} />
                  <HorizontalRule
                    styles={{
                      marginTop: 20,
                      marginBottom: 20,
                      backgroundColor: theme.dark.hex,
                    }}
                  />
                  <PlanetScoreCard company={company} />
                </View>
                <View style={styles.actionButtonContainer}></View>
              </View>
            </View>
            <ActionsView company={company} />
          </StandardContainer>
        );
      }}
    </Formik>
  );
};
export default Company;
