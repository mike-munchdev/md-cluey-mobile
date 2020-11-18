import React, { useContext, FC, useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';

import { Formik } from 'formik';

import styles from './styles';

import { AnimatableTextInput } from '../../components/TextInput';
import { AppContext, AuthContext } from '../../config/context';
import theme from '../../constants/theme';
import { ActionButton } from '../../components/Buttons';

import {
  resetPasswordError,
  resetPasswordCompleted,
  RESET_PASSWORD,
} from '../../graphql/queries/user';
import { LogoText } from '../../components/Text';
import { KeyboardAvoidingContainer } from '../../components/Containers';
import { NavHeader } from '../../components/Headers';
import requestPasswordResetSchema from '../../validation/requestPasswordResetSchema';

const RequestPasswordReset: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { requestPasswordReset } = useContext(AuthContext);
  const { dispatch, state } = useContext(AppContext);
  const navigation = useNavigation();

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    fetchPolicy: 'no-cache',
    onError: resetPasswordError(dispatch, state.alertVisible, setIsLoading),
    onCompleted: resetPasswordCompleted(
      requestPasswordReset,
      setIsLoading,
      navigation
    ),
  });

  return (
    <KeyboardAvoidingContainer isLoading={false}>
      <View style={styles.overlayContainer}>
        <NavHeader goBack />
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
            email: '',
          }}
          validationSchema={requestPasswordResetSchema}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true);
            const { email } = values;

            resetPassword({
              variables: { email },
            });
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, errors, touched, values, handleChange }) => {
            return (
              <View style={styles.formContainer}>
                <View style={styles.inputView}>
                  <AnimatableTextInput
                    autoCompleteType="email"
                    label="Email"
                    placeholder="Enter email"
                    leftIconName="email"
                    name="email"
                    value={values.email}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('email')}
                  />
                  <ActionButton
                    handlePress={() => handleSubmit()}
                    textColor={theme.buttonText}
                    color={theme.dark.hex}
                    title="Reset Password"
                    buttonStyles={{ marginTop: 20 }}
                    isLoading={isLoading}
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
export default RequestPasswordReset;
