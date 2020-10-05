import React, { useContext, FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { StackActions, useNavigation } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/react-hooks';

import { Formik } from 'formik';
import { FontAwesome5 } from '@expo/vector-icons';

import {
  getUserTokenCompleted,
  getUserTokenError,
  GET_USER_TOKEN,
} from '../../graphql/queries/token/tokens';
import styles from './styles';

import { signinSchema } from '../../validation/signin';

import AnimatableTextInput from '../../components/TextInput/AnimatableTextInput';
import { AuthContext } from '../../config/context';
import { useServerInfo } from '../../hooks/serverInfo';
import theme from '../../constants/theme';
import SignInContainer from './SignInContainer';
import { ActionButton } from '../../components/Buttons';
import TextButton from '../../components/Buttons/TextButton';
import { HrText } from '../../components/Text';
import { AlertHelper } from '../../utils/alert';
import {
  facebookAuthentication,
  googleAuthentication,
} from '../../utils/socialAuth';
import { StandardContainer } from '../../components/Containers';
import Bugsnag from '@bugsnag/expo';

const SignIn: FC = () => {
  const [signInLoading, setSignInLoading] = useState(false);
  const { signIn } = useContext(AuthContext);
  const [httpLink] = useServerInfo();
  const navigation = useNavigation();

  const [getUserToken] = useLazyQuery(GET_USER_TOKEN, {
    fetchPolicy: 'network-only',
    onError: getUserTokenError(setSignInLoading),
    onCompleted: getUserTokenCompleted(
      signIn,
      navigation,
      'Search',
      setSignInLoading
    ),
  });

  const googleSignin = async () => {
    try {
      const { data, token } = await googleAuthentication();
      const { id, email, familyName, givenName } = data;
      await getUserToken({
        variables: {
          email,
          googleId: id,
          googleAuthToken: token,
        },
      });
    } catch (error) {
      Bugsnag.notify(error);
      AlertHelper.show(
        'error',
        'Google Login Error',
        'Error logging into Google'
      );
    }
  };
  const facebookSignin = async () => {
    try {
      const { data, token } = await facebookAuthentication();

      const { id, email, first_name, last_name } = data;

      await getUserToken({
        variables: {
          email,
          facebookId: id,
          facebookAuthToken: token,
        },
      });
    } catch (error) {
      Bugsnag.notify(error);
      AlertHelper.show(
        'error',
        'Facebook Login Error',
        'Error logging into Facebook'
      );
    }
  };

  return (
    <StandardContainer isLoading={signInLoading}>
      <View style={styles.overlayContainer}>
        <View style={styles.top}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            {/* <TouchableOpacity
              onPress={() => {
                navigation.dispatch(StackActions.replace('GetStarted'));
              }}
              style={{ position: 'absolute', left: 15 }}
            >
              <FontAwesome5
                name="angle-left"
                size={24}
                color={theme.dark.hex}
              />
            </TouchableOpacity> */}
            <Animatable.Text
              animation="fadeIn"
              style={{
                fontFamily: 'CoinyRegular',
                fontSize: 72,
                color: theme.dark.hex,
                marginTop: 5,
                justifyContent: 'center',
              }}
            >
              Cluey
            </Animatable.Text>
          </View>
        </View>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={signinSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSignInLoading(true);
            const { email, password } = values;
            getUserToken({
              variables: { email, password },
            });
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, errors, touched, values, handleChange }) => {
            return (
              <View style={styles.formContainer}>
                <View style={styles.inputView}>
                  <AnimatableTextInput
                    label="E-MAIL"
                    placeholder="Enter email"
                    iconName="email"
                    name="email"
                    value={values.email}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('email')}
                  />
                  <AnimatableTextInput
                    placeholder="Enter password"
                    iconName="lock"
                    name="password"
                    value={values.password}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('password')}
                    secureTextEntry
                    containerStyles={{ marginTop: 10 }}
                  />
                  <ActionButton
                    handlePress={() => handleSubmit()}
                    textColor={theme.buttonText}
                    color={theme.dark.hex}
                    title="Sign In"
                    buttonStyles={{ marginTop: 20 }}
                    isLoading={signInLoading}
                  />
                  {/* <TextButton
                    handlePress={() => navigation.navigate('ForgotPassword')}
                    title="Forgot your Password?"
                    textStyles={{
                      fontSize: 18,
                      color: theme.text,
                      fontWeight: 'bold',
                    }}
                    buttonStyles={{ marginTop: 15 }}
                  /> */}
                  <TextButton
                    handlePress={() => navigation.navigate('ActivateAccount')}
                    title="Activate Your Account"
                    textStyles={{
                      fontSize: 18,
                      color: theme.dark.hex,
                      fontWeight: 'bold',
                    }}
                    buttonStyles={{ marginTop: 15 }}
                  />
                </View>
                <View style={{ height: 20 }}>
                  <HrText text="Or" />
                </View>
                <View style={styles.buttonsView}>
                  <ActionButton
                    handlePress={() => {
                      (async () => {
                        await facebookSignin();
                      })();
                    }}
                    buttonStyles={{ marginTop: 10 }}
                    textColor={theme.buttonText}
                    color={theme.facebookBlue}
                    title="Sign In with Facebook"
                    leftIcon={
                      <FontAwesome5 name="facebook" size={24} color="white" />
                    }
                  />
                  <ActionButton
                    handlePress={() => {
                      (async () => {
                        await googleSignin();
                      })();
                    }}
                    buttonStyles={{ marginTop: 10 }}
                    textColor={theme.buttonText}
                    color={theme.googleBlue}
                    title="Sign In with Google"
                    leftIcon={
                      <FontAwesome5 name="google" size={24} color="white" />
                    }
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </StandardContainer>
  );
};
export default SignIn;
