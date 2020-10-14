import React, { useContext, FC, useState, useEffect, Fragment } from 'react';
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

import signinSchema from '../../validation/signin';

import AnimatableTextInput from '../../components/TextInput/AnimatableTextInput';
import { AuthContext } from '../../config/context';
import { useServerInfo } from '../../hooks/serverInfo';
import theme from '../../constants/theme';
import SignInContainer from './SignInContainer';
import { ActionButton } from '../../components/Buttons';
import TextButton from '../../components/Buttons/TextButton';
import { HrText, LogoText } from '../../components/Text';
import { AlertHelper } from '../../utils/alert';
import {
  facebookAuthentication,
  googleAuthentication,
} from '../../utils/socialAuth';
import {
  KeyboardAvoidingContainer,
  StandardContainer,
} from '../../components/Containers';
import Bugsnag from '@bugsnag/expo';
import { DismissKeyboard } from '../../components/TextInput';

const SignIn: FC = () => {
  const [signInLoading, setSignInLoading] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const [getUserToken] = useLazyQuery(GET_USER_TOKEN, {
    fetchPolicy: 'network-only',
    onError: getUserTokenError(setSignInLoading),
    onCompleted: getUserTokenCompleted(
      signIn,
      navigation,
      'App',
      setSignInLoading
    ),
  });

  const googleSignin = async () => {
    try {
      const { data, token } = await googleAuthentication();
      const { id, email, family_name, give_name } = data;
      setSignInLoading(true);
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
      setSignInLoading(true);
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
    <KeyboardAvoidingContainer isLoading={signInLoading}>
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
            <LogoText
              animation="fadeIn"
              textStyle={{
                color: theme.dark.hex,
                marginTop: 5,
                justifyContent: 'center',
              }}
            />
          </View>
        </View>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={signinSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSignInLoading(true);
            const { email, password } = values;
            await getUserToken({
              variables: { email, password },
            });
            // setSubmitting(false);
          }}
        >
          {({ handleSubmit, errors, touched, values, handleChange }) => {
            return (
              <View style={styles.formContainer}>
                <Fragment>
                  <View style={styles.inputView}>
                    <AnimatableTextInput
                      label="E-MAIL"
                      placeholder="Enter email"
                      leftIconName="email"
                      name="email"
                      value={values.email}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('email')}
                      autoCompleteType="email"
                    />
                    <AnimatableTextInput
                      placeholder="Enter password"
                      leftIconName="lock"
                      name="password"
                      value={values.password}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('password')}
                      secureTextEntry
                      containerStyles={{ marginTop: 10 }}
                      autoCompleteType="password"
                    />
                    <ActionButton
                      handlePress={() => handleSubmit()}
                      textColor={theme.buttonText}
                      color={theme.dark.hex}
                      title="Sign In"
                      buttonStyles={{ marginTop: 20 }}
                      isLoading={signInLoading}
                    />
                    <TextButton
                      handlePress={() => navigation.navigate('ResetPassword')}
                      title="Forgot your Password?"
                      textStyles={{
                        fontSize: 18,
                        color: theme.text,
                        fontWeight: 'bold',
                      }}
                      buttonStyles={{ marginTop: 15 }}
                    />
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
                </Fragment>

                <View style={styles.buttonsView}>
                  <ActionButton
                    handlePress={async () => {
                      await facebookSignin();
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
                    handlePress={async () => {
                      await googleSignin();
                    }}
                    buttonStyles={{ marginTop: 10 }}
                    textColor={theme.buttonText}
                    color={theme.googleBlue}
                    title="Sign In with Google"
                    leftIcon={
                      <FontAwesome5 name="google" size={24} color="white" />
                    }
                  />
                  <ActionButton
                    handlePress={() => navigation.navigate('SignUp')}
                    textColor={theme.buttonText}
                    color={theme.dark.hex}
                    title="Sign Up"
                    buttonStyles={{ marginTop: 10 }}
                    isLoading={signInLoading}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </KeyboardAvoidingContainer>
  );
};
export default SignIn;
