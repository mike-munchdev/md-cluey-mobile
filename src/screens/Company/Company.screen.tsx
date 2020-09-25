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

const Company: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [company] = useState<ICompany | undefined>(
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
            <View style={styles.likesContainer}>
              <RoundedIconButton
                onPress={() => alert('search by category')}
                backgroundColor={theme.buttonTransparentBackground}
                borderColor={theme.buttonTransparentBackground}
                borderWidth={0}
                icon={
                  <Avatar.Icon
                    size={64}
                    color={theme.white.hex}
                    icon="thumb-up"
                    style={{ backgroundColor: theme.willBuy }}
                  />
                }
                textStyle={{ fontSize: 14 }}
              />
              <RoundedIconButton
                onPress={() => alert('search by category')}
                backgroundColor={theme.buttonTransparentBackground}
                borderColor={theme.buttonTransparentBackground}
                borderWidth={0}
                icon={
                  <Avatar.Icon
                    size={48}
                    color={theme.white.hex}
                    icon="thumb-up"
                    style={{ backgroundColor: theme.willBuyLater }}
                  />
                }
                textStyle={{ fontSize: 14 }}
              />
              <RoundedIconButton
                onLongPress={() => growAndShowToolTip()}
                onPress={() => alert('search by category')}
                backgroundColor={theme.buttonTransparentBackground}
                borderWidth={0}
                borderColor={theme.buttonTransparentBackground}
                size={60}
                icon={
                  <Avatar.Icon
                    size={48}
                    color={theme.white.hex}
                    icon="thumb-down"
                    style={{ backgroundColor: theme.willNotBuyLater }}
                  />
                }
                textStyle={{ fontSize: 14 }}
              />
              <RoundedIconButton
                onPress={() => alert('search by category')}
                backgroundColor={theme.buttonTransparentBackground}
                borderWidth={0}
                borderColor={theme.buttonTransparentBackground}
                size={60}
                icon={
                  <Avatar.Icon
                    size={64}
                    color={theme.white.hex}
                    icon="thumb-down"
                    style={{ backgroundColor: theme.willNotBuy }}
                  />
                }
                textStyle={{ fontSize: 14 }}
              />
            </View>
          </CompanyContainer>
        );
      }}
    </Formik>
  );
};
export default Company;
