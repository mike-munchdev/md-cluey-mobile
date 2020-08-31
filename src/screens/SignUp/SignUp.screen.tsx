import React, { useContext, FC } from 'react';

import { View } from 'react-native';

import styles from './styles';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../config/context';

import { Formik } from 'formik';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMutation } from '@apollo/react-hooks';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { signupSchema } from '../../validation/signup';
import AnimatableTextInput from '../../components/TextInput/AnimatableTextInput';
import {
  userSignupError,
  userSignupCompleted,
  USER_SIGNUP,
} from '../../graphql/queries/user/user';
import SignUpContainer from './SignUpContainer';
import theme from '../../constants/theme';
import { ActionButton } from '../../components/Buttons';
import { HrText } from '../../components/Text';
import { AlertHelper } from '../../utils/alert';

const SignUp: FC = () => {
  const { signUp } = useContext(AuthContext);

  const navigation = useNavigation();

  const [userSignup] = useMutation(USER_SIGNUP, {
    onError: userSignupError,
    onCompleted: userSignupCompleted(signUp, navigation),
  });

  const googleLogIn = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        iosClientId: `854065862128-d6n6v1m2gjf1bgml4am349bf1s43fvkc.apps.googleusercontent.com`,
        androidClientId: `854065862128-c9qbpsi1m8frp0a39n6bqq8dhkp2555f.apps.googleusercontent.com`,
        // iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
        // androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
      });

      console.log('type', type);
      if (type === 'success') {
        // Then you can use the Google REST API
        let userInfoResponse = await fetch(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log('userInfoResponse', userInfoResponse);
      }
    } catch ({ message }) {
      AlertHelper.show('error', 'Google Login Error', message);
    }
  };
  const facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync();
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('897285013968583', {
        permissions: ['public_profile'],
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email`
        )
          .then((response) => response.json())
          .then(async (data) => {
            console.log('data', data);
            const { id, email, password, first_name, last_name } = data;
            await userSignup({
              variables: {
                input: {
                  email,
                  password,
                  firstName: first_name,
                  lastName: last_name,
                  facebookId: id,
                },
              },
            });
          })
          .catch((e) => console.log(e));
      } else {
        AlertHelper.show(
          'error',
          'Facebook Login Error',
          'Could not successfully connect to Facebook Login'
        );
      }
    } catch ({ message }) {
      AlertHelper.show('error', 'Facebook Login Eror', message);
    }
  };

  return (
    <SignUpContainer>
      <View style={styles.overlayContainer}>
        <View style={styles.top}>
          <Animatable.Text
            animation="fadeIn"
            style={{
              fontFamily: 'CoinyRegular',
              fontSize: 72,
              color: theme.dark.hex,
            }}
          >
            Cluey
          </Animatable.Text>
        </View>

        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
          }}
          validationSchema={signupSchema}
          onSubmit={async (values) => {
            const { email, password, firstName, lastName } = values;
            await userSignup({
              variables: { input: { email, password, firstName, lastName } },
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
                    iconName="account-circle"
                    name="firstName"
                    value={values.firstName}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('firstName')}
                  />
                  <AnimatableTextInput
                    label="LAST NAME"
                    placeholder="Enter Last Name"
                    iconName="account-circle"
                    name="lastName"
                    value={values.lastName}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('lastName')}
                    containerStyles={{ marginTop: 10 }}
                  />
                  <AnimatableTextInput
                    label="E-MAIL"
                    placeholder="Enter email"
                    iconName="email"
                    name="email"
                    value={values.email}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('email')}
                    containerStyles={{ marginTop: 10 }}
                  />
                  <AnimatableTextInput
                    label="PASSWORD"
                    placeholder="Enter password"
                    iconName="lock"
                    name="password"
                    value={values.password}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('password')}
                    secureTextEntry={true}
                    containerStyles={{ marginTop: 10 }}
                  />

                  <ActionButton
                    handlePress={() => handleSubmit()}
                    textColor={theme.buttonText}
                    color={theme.dark.hex}
                    title="Sign Up"
                    buttonStyles={{ marginTop: 30 }}
                  />
                </View>
                <View style={{ height: 20 }}>
                  <HrText text="Or" />
                </View>
                <View style={styles.buttonsView}>
                  <ActionButton
                    handlePress={facebookLogIn}
                    textColor={theme.buttonText}
                    color={theme.facebookBlue}
                    title="Sign Up with Facebook"
                    leftIcon={
                      <FontAwesome5 name="facebook" size={24} color="white" />
                    }
                  />
                  <ActionButton
                    handlePress={googleLogIn}
                    buttonStyles={{ marginTop: 10 }}
                    textColor={theme.buttonText}
                    color={theme.googleBlue}
                    title="Sign Up with Google"
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
    </SignUpContainer>
  );
};
export default SignUp;
