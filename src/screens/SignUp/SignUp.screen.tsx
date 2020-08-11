import React, { useState, useEffect, useContext, Fragment, FC } from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './styles';
import colors from '../../constants/colors';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../config/context';

import { DismissKeyboard } from '../../components/TextInput';
import { Formik } from 'formik';
import { signupSchema } from '../../validation/signup';
import AnimatableTextInput from '../../components/TextInput/AnimatableTextInput';
import { useMutation } from '@apollo/react-hooks';
import {
  userSignupError,
  userSignupCompleted,
  USER_SIGNUP,
} from '../../graphql/queries/user/user';

const SignUp: FC = () => {
  const [checkTextInputChange, setCheckTextInputChange] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const { signUp } = useContext(AuthContext);

  const navigation = useNavigation();

  const [userSignup] = useMutation(USER_SIGNUP, {
    onError: userSignupError,
    onCompleted: userSignupCompleted(signUp, navigation),
  });

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
      >
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={signupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const { email, password, firstName, lastName } = values;
              await userSignup({
                variables: { input: { email, password, firstName, lastName } },
              });
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
                  <View>
                    <AnimatableTextInput
                      label="FIRST NAME"
                      placeholder="Enter First Name"
                      iconName="user-o"
                      name="firstName"
                      value={values.firstName}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('firstName')}
                    />
                    <AnimatableTextInput
                      label="LAST NAME"
                      placeholder="Enter Last Name"
                      iconName="user-o"
                      name="lastName"
                      value={values.lastName}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('lastName')}
                      headerStyles={{ marginTop: 35 }}
                    />
                    <AnimatableTextInput
                      label="E-MAIL"
                      placeholder="Enter email"
                      iconName="envelope-o"
                      name="email"
                      value={values.email}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('email')}
                      headerStyles={{ marginTop: 35 }}
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
                      headerStyles={{ marginTop: 35 }}
                    />
                    <AnimatableTextInput
                      label="CONFIRM PASSWORD"
                      placeholder="Confirm password"
                      iconName="lock"
                      name="passwordConfirmation"
                      value={values.passwordConfirmation}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('passwordConfirmation')}
                      secureTextEntry={true}
                      headerStyles={{ marginTop: 35 }}
                    />
                    <View style={styles.textPrivate}>
                      <Text style={styles.textPrivateColor}>
                        By signing up you agree to our
                      </Text>
                      <Text> Terms of Service</Text>
                      <Text style={styles.textPrivateColor}>and</Text>
                      <Text> Privacy Policy</Text>
                    </View>
                    <View style={styles.buttons}>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.button}
                        disabled={isSubmitting || !isValid}
                      >
                        <Text
                          style={[
                            styles.textSign,
                            { color: colors.white.normal },
                          ]}
                        >
                          Sign Up
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Fragment>
              );
            }}
          </Formik>
        </Animatable.View>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};
export default SignUp;
