import React, { useEffect, useContext } from 'react';

import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../config/context';
import theme from '../../constants/theme';
import { ActionButton } from '../../components/Buttons';

const GetStarted = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/images/jeshoots-com-__ZMnefoI3k-unsplash.jpg')}
      style={styles.container}
    >
      <View style={styles.overlayContainer}>
        <View style={styles.top}>
          <Animatable.Text
            animation="fadeIn"
            style={{
              fontFamily: 'CoinyRegular',
              fontSize: 72,
              color: theme.text,
            }}
          >
            Cluey
          </Animatable.Text>
        </View>
        <View style={styles.sloganContainer}>
          <Text style={styles.slogan}>Informed and Conscious Consumerism</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ActionButton
            title="Get Started"
            handlePress={() => navigation.navigate('SignUp')}
            buttonStyles={{ marginTop: 15 }}
            textColor={theme.buttonText}
            color={theme.dark.hex}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={[
              styles.signIn,
              {
                borderColor: theme.buttonTransparentBorder,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[styles.textSign, { color: theme.buttonTransparentText }]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default GetStarted;
