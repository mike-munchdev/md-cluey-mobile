import React, { useContext, FC, useState } from 'react';

import { View, TouchableOpacity } from 'react-native';

import styles from './styles';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../config/context';

import { Formik } from 'formik';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMutation } from '@apollo/react-hooks';

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
import {
  facebookAuthentication,
  googleAuthentication,
} from '../../utils/socialAuth';
import { StandardContainer } from '../../components/Containers';

const SignUp: FC = () => {
  const { signUp } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const [userSignup] = useMutation(USER_SIGNUP, {
    onError: userSignupError,
    onCompleted: userSignupCompleted(signUp, navigation),
  });

  const googleSignup = async () => {
    try {
      const { data, token } = await googleAuthentication();
      const { id, email, familyName, givenName } = data;
      await userSignup({
        variables: {
          input: {
            email,
            firstName: givenName,
            lastName: familyName,
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

  return (
    <StandardContainer isLoading={isLoading}>
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
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ position: 'absolute', left: 15 }}
            >
              <FontAwesome5
                name="angle-left"
                size={24}
                color={theme.dark.hex}
              />
            </TouchableOpacity>
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
                    handlePress={() => {
                      facebookSignup();
                    }}
                    textColor={theme.buttonText}
                    color={theme.facebookBlue}
                    title="Sign Up with Facebook"
                    leftIcon={
                      <FontAwesome5 name="facebook" size={24} color="white" />
                    }
                  />
                  <ActionButton
                    handlePress={() => {
                      googleSignup();
                    }}
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
    </StandardContainer>
  );
};
export default SignUp;
