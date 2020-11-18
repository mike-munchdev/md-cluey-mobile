import React, { useContext, FC, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Formik } from 'formik';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMutation } from '@apollo/react-hooks';
import { Overlay, Button } from 'react-native-elements';

import styles from './styles';
import { AppContext, AuthContext } from '../../config/context';

import signupSchema from '../../validation/signup';
import AnimatableTextInput from '../../components/TextInput/AnimatableTextInput';
import {
  userSignupError,
  userSignupCompleted,
  USER_SIGNUP,
} from '../../graphql/queries/user';
import theme from '../../constants/theme';
import { ActionButton, NavBackButton } from '../../components/Buttons';
import { HrText, LogoText } from '../../components/Text';
import { AlertHelper } from '../../utils/alert';
import {
  facebookAuthentication,
  googleAuthentication,
} from '../../utils/socialAuth';
import { KeyboardAvoidingContainer } from '../../components/Containers';
import { passwordRequirments } from '../../validation/passwordSchema';
import { AppleAuthenticationScope } from 'expo-apple-authentication';
import Bugsnag from '@bugsnag/expo';

const SignUp: FC = () => {
  const { signUp } = useContext(AuthContext);
  const { dispatch, state } = useContext(AppContext);
  const [isLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [passwordSnackVisible, setPasswordSnackVisible] = useState(false);
  const [] = useState(true);
  const navigation = useNavigation();

  const [userSignup] = useMutation(USER_SIGNUP, {
    onError: userSignupError(dispatch, state.alertVisible, setSignInLoading),
    onCompleted: userSignupCompleted(signUp, navigation, setSignInLoading),
  });

  const googleSignup = async () => {
    try {
      const { data, token } = await googleAuthentication();

      const { id, email, family_name, given_name } = data;

      await userSignup({
        variables: {
          input: {
            email,
            firstName: given_name,
            lastName: family_name,
            googleId: id,
            googleAuthToken: token,
          },
        },
      });
    } catch ({ message }) {
      AlertHelper.show('error', 'Google Login Error', message);
    }
  };
  const facebookSignup = async () => {
    try {
      const { data, token } = await facebookAuthentication();
      const { id, email, password, first_name, last_name } = data;
      await userSignup({
        variables: {
          input: {
            email,
            password,
            firstName: first_name,
            lastName: last_name,
            facebookId: id,
            facebookAuthToken: token,
          },
        },
      });
    } catch ({ message }) {
      AlertHelper.show('error', 'Facebook Login Error', message);
    }
  };

  const appleSignup = async () => {
    try {
      const response = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthenticationScope.FULL_NAME,
          AppleAuthenticationScope.EMAIL,
        ],
      });

      const {
        email,
        authorizationCode,
        identityToken,
        user,
        fullName,
      } = response;

      await userSignup({
        variables: {
          input: {
            email: email || '',
            firstName: fullName?.givenName || 'Apple',
            lastName: fullName?.familyName || 'User',
            appleId: user,
            appleAuthToken: authorizationCode,
            appleIdentityToken: identityToken,
          },
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

  return (
    <KeyboardAvoidingContainer isLoading={isLoading}>
      <View style={styles.overlayContainer}>
        <View style={styles.top}>
          <NavBackButton />
          <View
            style={{
              flex: 1,
              marginLeft: -40,
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
        <ScrollView>
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
            }}
            validationSchema={signupSchema}
            onSubmit={async (values) => {
              const { email, firstName, lastName } = values;
              setSignInLoading(true);
              await userSignup({
                variables: { input: { email, firstName, lastName } },
              });
            }}
          >
            {({ errors, touched, values, handleChange, handleSubmit }) => {
              return (
                <View style={styles.formContainer}>
                  <View style={styles.inputView}>
                    <AnimatableTextInput
                      label="FIRST NAME"
                      placeholder="Enter First Name"
                      leftIconName="account-circle"
                      name="firstName"
                      value={values.firstName}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('firstName')}
                      autoCompleteType="name"
                    />
                    <AnimatableTextInput
                      label="LAST NAME"
                      placeholder="Enter Last Name"
                      leftIconName="account-circle"
                      name="lastName"
                      value={values.lastName}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('lastName')}
                      containerStyles={{ marginTop: 10 }}
                      autoCompleteType="name"
                    />
                    <AnimatableTextInput
                      label="E-MAIL"
                      placeholder="Enter email"
                      leftIconName="email"
                      name="email"
                      value={values.email}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('email')}
                      containerStyles={{ marginTop: 10 }}
                      autoCompleteType="email"
                    />
                    <ActionButton
                      handlePress={() => handleSubmit()}
                      textColor={theme.buttonText}
                      color={theme.dark.hex}
                      title="Sign Up"
                      buttonStyles={{ marginTop: 30 }}
                      isLoading={signInLoading}
                    />
                  </View>
                  <View style={{ height: 20 }}>
                    <HrText text="Or" />
                  </View>
                  <View style={styles.buttonsView}>
                    <ActionButton
                      handlePress={async () => {
                        await facebookSignup();
                      }}
                      textColor={theme.buttonText}
                      color={theme.facebookBlue}
                      title="Sign Up with Facebook"
                      leftIcon={
                        <FontAwesome5 name="facebook" size={24} color="white" />
                      }
                    />
                    <ActionButton
                      handlePress={async () => {
                        await googleSignup();
                      }}
                      buttonStyles={{ marginTop: 10 }}
                      textColor={theme.buttonText}
                      color={theme.googleBlue}
                      title="Sign Up with Google"
                      leftIcon={
                        <FontAwesome5 name="google" size={24} color="white" />
                      }
                    />
                    <AppleAuthentication.AppleAuthenticationButton
                      buttonType={
                        AppleAuthentication.AppleAuthenticationButtonType
                          .SIGN_UP
                      }
                      buttonStyle={
                        AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                      }
                      cornerRadius={5}
                      style={{ width: '100%', height: 50, marginTop: 10 }}
                      onPress={async () => {
                        await appleSignup();
                      }}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
          <Overlay
            isVisible={passwordSnackVisible}
            onBackdropPress={() => setPasswordSnackVisible(false)}
            overlayStyle={{ width: '90%' }}
          >
            <View>
              <Text
                style={{
                  color: theme.dark.hex,
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                Password Requirements
              </Text>
              {passwordRequirments.map((r, index) => (
                <Text
                  key={index.toString()}
                  style={{
                    color: theme.dark.hex,
                    fontSize: 16,
                  }}
                >{`${index + 1}. ${r}`}</Text>
              ))}
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                <Button
                  onPress={() => setPasswordSnackVisible(false)}
                  title="Close"
                  buttonStyle={{
                    backgroundColor: theme.dark.hex,
                    width: 100,
                  }}
                  titleStyle={{ color: theme.white.hex }}
                />
              </View>
            </View>
          </Overlay>
        </ScrollView>
      </View>
    </KeyboardAvoidingContainer>
  );
};
export default SignUp;
