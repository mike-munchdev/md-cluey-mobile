import React, { FC, useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { Formik } from 'formik';

import { useLazyQuery } from '@apollo/react-hooks';

import styles from './styles';
import theme from '../../constants/theme';

import searchSchema from '../../validation/searchSchema';
import {
  PoliticalScoreCard,
  PeopleScoreCard,
  PlanetScoreCard,
} from '../../components/Cards';
import { ICompany } from '../../interfaces';
import { HorizontalRule } from '../../components/HorizontalRule';

import { ActionsView } from '../../components/Actions';
import {
  getCompanyByIdCompleted,
  getCompanyByIdError,
  GET_COMPANY_BY_ID,
} from '../../graphql/queries/company/companies';
import { StandardContainer } from '../../components/Containers';
import { AppContext } from '../../config/context';
import { CompanyLogo } from '../../components/Images';
import { NavHeader } from '../../components/Headers';
import { ParentCompaniesText } from '../../components/Text';

const Company: FC = () => {
  const { user } = useContext(AppContext);

  const route = useRoute();
  const [company, setCompany] = useState<ICompany | undefined>();

  const [isLoading, setIsLoading] = useState(false);
  const [imageErrored, setImageErrored] = useState(false);
  const [getCompanyById] = useLazyQuery(GET_COMPANY_BY_ID, {
    fetchPolicy: 'network-only',
    onError: getCompanyByIdError(setCompany, setIsLoading),
    onCompleted: getCompanyByIdCompleted(setCompany, setIsLoading),
  });

  useEffect(() => {
    (async () => {
      if (route.params.company) {
        await getCompanyById({ variables: { id: route.params.company.id } });
      }
    })();
  }, []);

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
          <StandardContainer isLoading={isLoading}>
            <View style={styles.overlayContainer}>
              <NavHeader goBack />
              <View style={styles.brandContainer}>
                <CompanyLogo
                  logoUri={company?.brandLogoUrl}
                  text={company?.name}
                  imageErrored={imageErrored}
                  setImageErrored={setImageErrored}
                />
              </View>
              <View style={styles.parentCompanyContainer}>
                <ParentCompaniesText company={company} />
              </View>
              <ScrollView style={styles.infoContainer}>
                <PoliticalScoreCard company={company} />
                <HorizontalRule
                  styles={{
                    marginTop: 5,

                    backgroundColor: theme.dark.hex,
                  }}
                />
                <PeopleScoreCard company={company} />
                <HorizontalRule
                  styles={{
                    marginTop: 5,

                    backgroundColor: theme.dark.hex,
                  }}
                />
                <PlanetScoreCard company={company} />
              </ScrollView>
              <View style={styles.actionButtonContainer}>
                <ActionsView company={company} />
              </View>
            </View>
          </StandardContainer>
        );
      }}
    </Formik>
  );
};
export default Company;
