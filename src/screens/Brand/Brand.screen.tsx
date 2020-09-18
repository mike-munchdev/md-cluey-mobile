import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Formik } from 'formik';
import BrandContainer from './BrandContainer';
import styles from './styles';
import theme from '../../constants/theme';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { searchSchema } from '../../validation/searchSchema';
import {
  PoliticalScoreCard,
  ParentOrganizationCard,
  PeopleScoreCard,
  PlanetScoreCard,
} from '../../components/Cards';
import { ICompany } from '../../interfaces';
import { HorizontalRule } from '../../components/HorizontalRule';

const Brand: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [company, setCompany] = useState<ICompany | undefined>(
    route.params.company ? route.params.company : null
  );

  const [, setCompanyImageVisible] = useState(true);
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
    if (company && company.brandUrl) {
      setImageUri(
        `https://img1.wsimg.com/isteam/ip/562a710e-a7a5-44d1-aa8d-cfa6312092eb/revlon.com.png`
      );
    }
  }, []);
  return (
    <BrandContainer>
      <View style={styles.overlayContainer}>
        <View style={{ flexDirection: 'row' }}>
          {/* <TouchableOpacity
            style={{ marginLeft: 20, marginTop: 20 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome5 name="angle-left" size={24} color={theme.dark.hex} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{ marginLeft: 20, marginTop: 20 }}
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <FontAwesome5 name="bars" size={24} color={theme.dark.hex} />
          </TouchableOpacity>
        </View>
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
              <View style={styles.infoContainer}>
                <ParentOrganizationCard
                  company={company}
                  setCompany={setCompany}
                />
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
                <View style={styles.actionButtonContainer}></View>
              </View>
            );
          }}
        </Formik>
      </View>
    </BrandContainer>
  );
};
export default Brand;
