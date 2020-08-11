import React, { useState, useContext, Fragment, useEffect, FC } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/react-hooks';
import { TextInput } from 'react-native-paper';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';

import {
  GET_USER_TOKEN_BY_EMAIL_AND_PASSWORD,
  getUserTokenByEmailAndPasswordCompleted,
  getUserTokenByEmailAndPasswordError,
} from '../../graphql/queries/token/tokens';
import styles from './styles';
import colors from '../../constants/colors';

import { signinSchema } from '../../validation/signin';

import { DismissKeyboard } from '../../components/TextInput';
import AnimatableTextInput from '../../components/TextInput/AnimatableTextInput';
import { AuthContext } from '../../config/context';
import { useServerInfo } from '../../hooks/serverInfo';
import theme from '../../constants/theme';
import { RoundedIconButton } from '../../components/Buttons';

const AnimatedTextInput = Animatable.createAnimatableComponent(Input);
const SignIn: FC = () => {
  const { signIn, isLoggedIn } = useContext(AuthContext);
  const [httpLinkUri, wsLinkUri] = useServerInfo();
  const navigation = useNavigation();

  const [getUserTokenByEmailAndPassword, { loading }] = useLazyQuery(
    GET_USER_TOKEN_BY_EMAIL_AND_PASSWORD,
    {
      fetchPolicy: 'network-only',
      onError: getUserTokenByEmailAndPasswordError,
      onCompleted: getUserTokenByEmailAndPasswordCompleted(signIn),
    }
  );

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
      >
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

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={signinSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { email, password } = values;
            getUserTokenByEmailAndPassword({
              variables: { email, password },
            });
            setSubmitting(false);
          }}
        >
          {({
            handleSubmit,
            handleReset,
            isSubmitting,
            errors,
            touched,
            values,
            handleChange,
            isValid,
          }) => {
            return (
              <Fragment>
                <Animatable.View animation="fadeInLeft">
                  {/* <AnimatedTextInput
                    style={{ fontFamily: 'CoinyRegular' }}
                    label="E-MAIL"
                    placeholder="Enter email"
                    value={values.email}
                  /> */}
                  <AnimatableTextInput
                    label="E-MAIL"
                    placeholder="Enter email"
                    iconName="user-o"
                    name="email"
                    value={values.email}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('email')}
                  />
                </Animatable.View>
                <Animatable.View animation="fadeInRight">
                  <AnimatableTextInput
                    label="E-MAIL"
                    placeholder="Enter password"
                    iconName="lock"
                    name="email"
                    value={values.email}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('password')}
                    secureTextEntry
                  />
                </Animatable.View>
                <Animatable.View animation="fadeIn" style={styles.buttons}>
                  <RoundedIconButton
                    size={56}
                    borderColor={theme.button}
                    backgroundColor={theme.text}
                    iconName="user-plus"
                    iconSize={24}
                    iconColor={theme.background}
                    onPress={() => alert('Register')}
                    text="Register"
                  />
                  <RoundedIconButton
                    size={56}
                    borderColor={theme.button}
                    backgroundColor={theme.text}
                    iconName="sign-in"
                    iconSize={24}
                    iconColor={theme.background}
                    onPress={() => alert('Sign In')}
                    text="Sign In"
                  />
                  <RoundedIconButton
                    size={56}
                    borderColor={theme.button}
                    backgroundColor={theme.text}
                    iconName="unlock"
                    iconSize={24}
                    iconColor={theme.background}
                    onPress={() => alert('Forgot')}
                    text="Forgot?"
                  />
                </Animatable.View>
                <Animatable.View animation="fadeInUp" style={styles.buttons}>
                  <RoundedIconButton
                    size={56}
                    borderColor={theme.button}
                    backgroundColor={theme.text}
                    iconName="facebook"
                    iconSize={24}
                    iconColor={theme.background}
                    onPress={() => alert('Facebook Signin')}
                    text="Facebook"
                  />
                  <RoundedIconButton
                    size={56}
                    borderColor={theme.button}
                    backgroundColor={theme.text}
                    iconName="google-plus"
                    iconSize={24}
                    iconColor={theme.background}
                    onPress={() => alert('Google Signin')}
                    text="Google"
                  />
                </Animatable.View>
              </Fragment>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};
export default SignIn;
