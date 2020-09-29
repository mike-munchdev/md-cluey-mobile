import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import CompanyContainer from './CompanyContainer';
import styles from './styles';
import theme from '../../constants/theme';

import { TouchableOpacity } from 'react-native-gesture-handler';
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
import { Avatar } from 'react-native-paper';
import { ActionsView } from '../../components/Actions';
import { useLazyQuery } from '@apollo/react-hooks';
import {
  getCompanyByIdCompleted,
  getCompanyByIdError,
  GET_COMPANIES_BY_CATEGORY,
  GET_COMPANY_BY_ID,
} from '../../graphql/queries/company/companies';

const Company: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [company, setCompany] = useState<ICompany | undefined>();

  const [companyId, setCompanyId] = useState<string | undefined>(
    route.params.companyId ? route.params.companyId : null
  );

  const [isLoading, setIsLoading] = useState(false);

  const [companyImageVisible, setCompanyImageVisible] = useState(true);
  const [imageUri, setImageUri] = useState(
    'https://img1.wsimg.com/isteam/ip/562a710e-a7a5-44d1-aa8d-cfa6312092eb/2329154B-D2D8-4A7D-873D-F8A8BF480E00.jpeg/:/rs=w:2046px,cg:true,m'
  );

  const loadFallback = () => {
    setCompanyImageVisible(false);
    setImageUri(
      'https://img1.wsimg.com/isteam/ip/562a710e-a7a5-44d1-aa8d-cfa6312092eb/2329154B-D2D8-4A7D-873D-F8A8BF480E00.jpeg/:/rs=w:2046px,cg:true,m'
    );
  };

  useEffect(() => {
    if (companyId) {
      getCompanyById({
        variables: {
          id: companyId,
        },
      });
      setImageUri(
        `https://img1.wsimg.com/isteam/ip/562a710e-a7a5-44d1-aa8d-cfa6312092eb/revlon.com.png`
      );
    }
  }, []);

  const [getCompanyById] = useLazyQuery(GET_COMPANY_BY_ID, {
    fetchPolicy: 'network-only',
    onError: getCompanyByIdError(setCompany, setIsLoading),
    onCompleted: getCompanyByIdCompleted(setCompany, setIsLoading),
  });

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
          <CompanyContainer>
            <View style={styles.overlayContainer}>
              <NavigationHeader goBack />
              <View style={styles.brandContainer}>
                {/* <Text style={styles.searchCaptionText}>You searched...</Text> */}
                {/* {companyImageVisible ? ( */}
                <Animatable.Image
                  source={{ uri: imageUri }}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  resizeMode="contain"
                  onError={() => loadFallback()}
                />
                {/* ) : (
            <View style={{ height: 100 }}>
              <Text
                style={{
                  fontFamily: 'MontserratBold',
                  fontWeight: 'bold',
                  fontSize: 48,
                }}
              >
                {company ? company.name : ''}
              </Text>
            </View>
          )} */}
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
          </CompanyContainer>
        );
      }}
    </Formik>
  );
};
export default Company;
