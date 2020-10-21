import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Avatar, ListItem, Overlay } from 'react-native-elements';
import {
  AntDesign,
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { StandardContainer } from '../../components/Containers';
import { NavHeader } from '../../components/Headers';

import { LogoText } from '../../components/Text';
import theme from '../../constants/theme';

import styles from './styles';
import { ActionButton } from '../../components/Buttons';
import { List, Paragraph } from 'react-native-paper';
import { AuthContext } from '../../config/context';
import AsyncStorage from '@react-native-community/async-storage';

const AnimatedAntDesign = Animatable.createAnimatableComponent(AntDesign);
const Home = () => {
  const navigation = useNavigation();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  useEffect(() => {
    (async () => {
      const firstLogin = await AsyncStorage.getItem('isFirstLogin');
      setIsFirstLogin(!!Number(firstLogin));
    })();
  }, []);

  return (
    <StandardContainer isLoading={false}>
      <View style={styles.overlayContainer}>
        <NavHeader
          title={
            isFirstLogin ? (
              <Animatable.Text
                animation="shake"
                iterationCount={10}
                style={{
                  fontFamily: 'MontserratBold',
                  fontSize: 20,
                  color: theme.dark.hex,
                  marginBottom: 10,
                }}
              >
                New to Cluey Click Here{' '}
                <AntDesign name="arrowright" size={18} />
              </Animatable.Text>
            ) : null
          }
          showMenu
          rightIcon={() => (
            <Fragment>
              <TouchableOpacity
                onPress={async () => {
                  setIsFirstLogin(false);
                  await AsyncStorage.setItem('isFirstLogin', '0');

                  setOverlayVisible(true);
                }}
              >
                <AntDesign
                  name="infocirlceo"
                  size={28}
                  color={theme.dark.hex}
                />
              </TouchableOpacity>
            </Fragment>
          )}
        />
        <View style={styles.linksContainer}>
          <View style={styles.topViewContainer}>
            <Avatar
              size="xlarge"
              rounded
              icon={{
                name: 'search',
                type: 'font-awesome',
                color: theme.dark.hex,
              }}
              onPress={() => navigation.navigate('Search')}
              overlayContainerStyle={{ backgroundColor: 'white' }}
              activeOpacity={0.7}
            />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Search by Name</Text>
            </View>
          </View>
          <View style={styles.bottomViewContainer}>
            <Avatar
              size="xlarge"
              rounded
              icon={{
                name: 'shop',
                type: 'entypo',
                color: theme.dark.hex,
              }}
              onPress={() => navigation.navigate('Categories')}
              overlayContainerStyle={{ backgroundColor: 'white' }}
              activeOpacity={0.7}
            />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Search by Category</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <LogoText animation="fadeIn" textStyle={styles.logoText} />
          </View>
        </View>
      </View>
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => setOverlayVisible(false)}
        overlayStyle={{ width: '90%', height: '80%' }}
      >
        <Fragment>
          <ScrollView>
            <List.Item
              titleNumberOfLines={10}
              titleStyle={{ color: theme.dark.hex }}
              title="Welcome to Cluey, an app that brings more transparency to the
            impacts of your consumer purchases. This is an early stage app
            release. It focuses on political contributions given by the
            companies that make the products and services you buy every day."
              left={(props) => (
                <MaterialIcons
                  name="attach-money"
                  size={36}
                  color={theme.dark.hex}
                />
              )}
            />
            <List.Item
              titleNumberOfLines={10}
              titleStyle={{ color: theme.dark.hex }}
              title="Candidates running for office in 2020 have raised more funding
            than ever before in U.S. history. Corporate donations make up a
            big part of that. You may not realize it, but you vote with your
            wallet every time you make a purchase."
              left={(props) => (
                <Entypo name="wallet" size={36} color={theme.dark.hex} />
              )}
            />
            <List.Item
              titleStyle={{ color: theme.dark.hex, fontWeight: 'bold' }}
              title="How to use this ap in three simple steps:"
              titleNumberOfLines={2}
            />
            <List.Item
              titleNumberOfLines={10}
              titleStyle={{ color: theme.dark.hex }}
              title="Determine your personal comfort level of funding given to Democrat or Republican candidates."
              left={(props) => (
                <MaterialCommunityIcons
                  name="numeric-1-circle"
                  size={36}
                  color={theme.dark.hex}
                />
              )}
            />
            <List.Item
              titleNumberOfLines={10}
              titleStyle={{ color: theme.dark.hex }}
              title="Use this app to search for brands you buy every day."
              left={(props) => (
                <MaterialCommunityIcons
                  name="numeric-2-circle"
                  size={36}
                  color={theme.dark.hex}
                />
              )}
            />
            <List.Item
              titleNumberOfLines={10}
              titleStyle={{ color: theme.dark.hex }}
              title="Make a decision to continue buying those brands or transition to other brands based on the information you learn on the app."
              left={(props) => (
                <MaterialCommunityIcons
                  name="numeric-3-circle"
                  size={36}
                  color={theme.dark.hex}
                />
              )}
            />
          </ScrollView>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}
          >
            <ActionButton
              title="I want to learn more, take me to Cluey’s website"
              handlePress={() => {
                setOverlayVisible(false);
                Linking.openURL('https://clueyconsumer.com/about-us-1');
              }}
              buttonStyles={{ marginTop: 15 }}
              textColor={theme.buttonText}
              color={theme.dark.hex}
              textStyle={{ fontFamily: 'Montserrat', fontSize: 16 }}
            />
            <ActionButton
              title="Makes sense, take me back to the app"
              handlePress={() => {
                setOverlayVisible(false);
              }}
              buttonStyles={{ marginTop: 15 }}
              textColor={theme.buttonText}
              color={theme.dark.hex}
              textStyle={{ fontFamily: 'Montserrat', fontSize: 16 }}
            />
          </View>
        </Fragment>
      </Overlay>
    </StandardContainer>
  );
};
export default Home;
