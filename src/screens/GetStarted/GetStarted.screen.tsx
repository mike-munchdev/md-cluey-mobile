import React, { useState, useEffect, useContext } from 'react';

import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';
import colors from '../../constants/colors';
import { useNavigation, StackActions } from '@react-navigation/native';

import { AuthContext } from '../../config/context';

const GetStarted = () => {
  const [isDeciding, setIsDeciding] = useState(true);
  const { setIsStarted, getIsStarted, isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const isUserLoggedIn = await isLoggedIn();
      const isStarted = await getIsStarted();
      if (isUserLoggedIn) {
        navigation.dispatch(StackActions.replace('Rx'));
      } else if (isStarted) {
        navigation.dispatch(StackActions.replace('SignIn'));
      } else {
        setIsDeciding(false);
      }
    })();
  }, []);
  if (isDeciding) return null;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        {/* <Animatable.Image
          animation="bounceIn"
          source={require('../../../assets/logo2.png')}
          style={styles.logo}
          resizeMode="stretch"
        /> */}
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.title}>Get your Rx delivered to your door!</Text>
        <Text style={styles.subTitle}>Sign in with account</Text>
        <TouchableOpacity
          onPress={() => {
            setIsStarted(true);
            navigation.navigate('SignIn');
          }}
        >
          <View style={styles.button}>
            <Text style={styles.textSign}>Get Started</Text>
            <MaterialIcons
              name="navigate-next"
              size={20}
              color={colors.white.normal}
            />
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};
export default GetStarted;
