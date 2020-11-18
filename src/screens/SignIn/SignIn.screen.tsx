import React, { useContext, FC, useState, Fragment } from 'react';
import { View, Platform } from 'react-native';

import * as AppleAuthentication from 'expo-apple-authentication';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/react-hooks';

import { Formik } from 'formik';
import { FontAwesome5 } from '@expo/vector-icons';
import Bugsnag from '@bugsnag/expo';

import {
  getUserTokenCompleted,
  getUserTokenError,
  GET_USER_TOKEN,
} from '../../graphql/queries/token';
import styles from './styles';

import signinSchema from '../../validation/signin';

import AnimatableTextInput from '../../components/TextInput/AnimatableTextInput';
import { AppContext, AuthContext } from '../../config/context';
import theme from '../../constants/theme';
import { ActionButton, NavBackButton } from '../../components/Buttons';
import TextButton from '../../components/Buttons/TextButton';
import { HrText, LogoText } from '../../components/Text';
import { AlertHelper } from '../../utils/alert';
import {
  facebookAuthentication,
  googleAuthentication,
} from '../../utils/socialAuth';
import { StandardContainer } from '../../components/Containers';
import { AppleAuthenticationScope } from 'expo-apple-authentication';

const SignIn: FC = () => {
  const [signInLoading, setSignInLoading] = useState(false);
  const index = useNavigationState((state) => state.index);
  const [myIndex] = useState(index);
  const { signIn } = useContext(AuthContext);
  const { dispatch, state } = useContext(AppContext);
  const navigation = useNavigation();

  const [getUserToken] = useLazyQuery(GET_USER_TOKEN, {
    fetchPolicy: 'network-only',
    onError: getUserTokenError(dispatch, state.alertVisible, setSignInLoading),
    onCompleted: getUserTokenCompleted(
      signIn,
      navigation,
      'App',
      setSignInLoading
    ),
  });

  const appleSignin = async () => {
    try {
      const response = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthenticationScope.FULL_NAME,
          AppleAuthenticationScope.EMAIL,
        ],
      });

      const { email, authorizationCode, identityToken, user } = response;

      // signed in
      await getUserToken({
        variables: {
          email,
          appleId: user,
          appleAuthToken: authorizationCode,
          appleIdentityToken: identityToken,
        },
      });
    } catch (e) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
        AlertHelper.show(
          'info',
          'Apple Login Cancelled',
          'Apple login cancelled'
        );
      } else {
        // handle other errors
        Bugsnag.notify(e);
        AlertHelper.show(
          'error',
          'Apple Login Error',
          'Error logging into Apple'
        );
      }
    }
  };
  const facebookSignin = async () => {
    try {
      const { data, token } = await facebookAuthentication();

      const { id, email } = data;
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
  const googleSignin = async () => {
    try {
      const { data, token } = await googleAuthentication();
      const { id, email } = data;
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

  return (
    <StandardContainer isLoading={signInLoading}>
      <View style={styles.overlayContainer}>
        <View style={styles.top}>
          {myIndex > 0 ? <NavBackButton /> : null}
          <View
            style={{
              flex: 1,
              marginLeft: myIndex > 0 ? -40 : 0,
              alignItems: 'center',
              justifyContent: 'center',
              // flexDirection: 'row',
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
          onSubmit={async (values, {}) => {
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
                  {Platform.OS === 'ios' ? (
                    <AppleAuthentication.AppleAuthenticationButton
                      buttonType={
                        AppleAuthentication.AppleAuthenticationButtonType
                          .SIGN_IN
                      }
                      buttonStyle={
                        AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                      }
                      cornerRadius={5}
                      style={{ width: '100%', height: 50, marginTop: 10 }}
                      onPress={async () => {
                        await appleSignin();
                      }}
                    />
                  ) : null}

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
    </StandardContainer>
  );
};
export default SignIn;
