import React from 'react';

import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import theme from '../../constants/theme';
import { ActionButton } from '../../components/Buttons';
import { LogoText } from '../../components/Text';

const GetStarted = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/images/jeshoots-com-__ZMnefoI3k-unsplash.jpg')}
      style={styles.container}
    >
      <View style={styles.overlayContainer}>
        <View style={styles.top}>
          <LogoText animation="fadeIn" />
        </View>
        <View style={styles.sloganContainer}>
          <Text style={styles.slogan}>Informed and Conscious Consumerism</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ActionButton
            title="Get Started"
            handlePress={() => {
              navigation.navigate('SignUp');
            }}
            buttonStyles={{ marginTop: 15 }}
            textColor={theme.buttonText}
            color={theme.dark.hex}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignIn');
            }}
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Categories');
            }}
            style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.skipText}>Skip for now {'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default GetStarted;
