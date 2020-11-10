import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { StandardContainer } from '../../components/Containers';
import { NavHeader } from '../../components/Headers';

import { LogoText } from '../../components/Text';
import theme from '../../constants/theme';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { ClueyInfoModal } from '../../components/Modals';
import { ClueyInfoIcon } from '../../components/Icons';

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
            <ClueyInfoIcon
              onPress={async () => {
                setIsFirstLogin(false);
                await AsyncStorage.setItem('isFirstLogin', '0');

                setOverlayVisible(true);
              }}
            />
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
      <ClueyInfoModal
        isVisible={overlayVisible}
        setVisible={setOverlayVisible}
      />
    </StandardContainer>
  );
};
export default Home;
