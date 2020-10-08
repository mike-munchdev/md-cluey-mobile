import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Avatar } from 'react-native-elements';
import { StandardContainer } from '../../components/Containers';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { LogoText } from '../../components/Text';
import theme from '../../constants/theme';

import styles from './styles';

const Home = () => {
  const navigation = useNavigation();
  return (
    <StandardContainer isLoading={false}>
      <View style={styles.overlayContainer}>
        <NavigationHeader showMenu />
        <View style={styles.linksContainer}>
          <View
            style={{
              height: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
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
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: 'MontserratBold',
                  fontSize: 24,
                  color: theme.dark.hex,
                }}
              >
                Search by Name
              </Text>
            </View>
          </View>
          <View
            style={{
              height: '50%',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
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
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: 'MontserratBold',
                  fontSize: 24,
                  color: theme.dark.hex,
                }}
              >
                Search by Category
              </Text>
            </View>
          </View>
          <View style={styles.top}>
            <LogoText
              animation="fadeIn"
              textStyle={{ color: theme.dark.hex }}
            />
          </View>
        </View>
      </View>
    </StandardContainer>
  );
};
export default Home;
