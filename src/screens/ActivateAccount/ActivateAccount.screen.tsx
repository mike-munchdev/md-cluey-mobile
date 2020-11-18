import React, { useContext, FC, useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';

import { Formik } from 'formik';

import styles from './styles';

import { AnimatableTextInput } from '../../components/TextInput/';
import { AppContext, AuthContext } from '../../config/context';
import theme from '../../constants/theme';
import { ActionButton, NavBackButton } from '../../components/Buttons';

import activateAccountSchema from '../../validation/activateAccount';
import {
  ACTIVATE_USER_ACCOUNT,
  activateUserAccountError,
  activateUserAccountCompleted,
} from '../../graphql/queries/user';
import { LogoText } from '../../components/Text';
import { StandardContainer } from '../../components/Containers';

const ActivateAccount: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useContext(AuthContext);
  const { dispatch, state } = useContext(AppContext);
  const navigation = useNavigation();

  const [activateUserAccount] = useMutation(ACTIVATE_USER_ACCOUNT, {
    fetchPolicy: 'no-cache',
    onError: activateUserAccountError(
      dispatch,
      state.alertVisible,
      setIsLoading
    ),
    onCompleted: activateUserAccountCompleted(
      signIn,
      navigation,
      'App',
      setIsLoading
    ),
  });

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <NavBackButton />
        <View style={styles.top}>
          <LogoText
            animation="fadeIn"
            textStyle={{
              color: theme.dark.hex,
            }}
          />
        </View>

        <Formik
          initialValues={{
            confirmToken: '',
            email: '',
          }}
          validationSchema={activateAccountSchema}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true);
            const { email, confirmToken } = values;

            activateUserAccount({
              variables: { input: { confirmToken, email } },
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
                    leftIconName="email"
                    name="email"
                    value={values.email}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('email')}
                    containerStyles={{ marginTop: 10 }}
                    autoCompleteType="email"
                  />
                  <AnimatableTextInput
                    label="Token"
                    placeholder="Enter confirm token"
                    leftIconName="ticket-confirmation"
                    name="confirmToken"
                    value={values.confirmToken}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('confirmToken')}
                  />
                  <ActionButton
                    handlePress={() => handleSubmit()}
                    textColor={theme.buttonText}
                    color={theme.dark.hex}
                    title="Activate Account"
                    buttonStyles={{ marginTop: 20 }}
                    isLoading={isLoading}
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
export default ActivateAccount;
