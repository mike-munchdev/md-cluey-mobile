import React, { FC, useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
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
} from '../../graphql/queries/company';
import { StandardContainer } from '../../components/Containers';
import { AppContext } from '../../config/context';
import { CompanyLogo } from '../../components/Images';
import { NavHeader } from '../../components/Headers';
import { ParentCompaniesText } from '../../components/Text';
import { ActionButton } from '../../components/Buttons';

const Company: FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const route = useRoute();
  const navigation = useNavigation();
  const [company, setCompany] = useState<ICompany | undefined>();

  const [isLoading, setIsLoading] = useState(false);
  const [imageErrored, setImageErrored] = useState(false);
  const [getCompanyById] = useLazyQuery(GET_COMPANY_BY_ID, {
    fetchPolicy: 'network-only',
    onError: getCompanyByIdError(
      setCompany,
      setIsLoading,
      dispatch,
      state.alertVisible
    ),
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
                {state.user ? (
                  <ActionsView company={company} />
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                    }}
                  >
                    <ActionButton
                      handlePress={() => navigation.popToTop()}
                      textColor={theme.buttonText}
                      color={theme.dark.hex}
                      title="For full features, sign up or sign in"
                      buttonStyles={{ marginTop: -100 }}
                    />
                  </View>
                )}
              </View>
            </View>
          </StandardContainer>
        );
      }}
    </Formik>
  );
};
export default Company;
