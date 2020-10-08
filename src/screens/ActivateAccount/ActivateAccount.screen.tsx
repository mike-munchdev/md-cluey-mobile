import React, { useContext, FC, useState } from 'react';
import { View } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';

import { Formik } from 'formik';

import styles from './styles';

import { AnimatableTextInput } from '../../components/TextInput/';
import { AuthContext } from '../../config/context';
import theme from '../../constants/theme';
import ActivateAccountContainer from './ActivateAccountContainer';
import { ActionButton } from '../../components/Buttons';

import { activateAccountSchema } from '../../validation/activateAccount';
import {
  ACTIVATE_USER_ACCOUNT,
  activateUserAccountError,
  activateUserAccountCompleted,
} from '../../graphql/queries/user/user';
import { LogoText } from '../../components/Text';

const ActivateAccount: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { activateAccount } = useContext(AuthContext);
  const navigation = useNavigation();

  const [activateUserAccount] = useMutation(ACTIVATE_USER_ACCOUNT, {
    fetchPolicy: 'no-cache',
    onError: activateUserAccountError(setIsLoading),
    onCompleted: activateUserAccountCompleted(
      activateAccount,
      setIsLoading,
      navigation
    ),
  });

  return (
    <ActivateAccountContainer>
      <View style={styles.overlayContainer}>
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
          }}
          validationSchema={activateAccountSchema}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true);
            const { confirmToken } = values;

            activateUserAccount({
              variables: { confirmToken },
            });
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, errors, touched, values, handleChange }) => {
            return (
              <View style={styles.formContainer}>
                <View style={styles.inputView}>
                  <AnimatableTextInput
                    label="Token"
                    placeholder="Enter confirm token"
                    iconName="ticket-confirmation"
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
    </ActivateAccountContainer>
  );
};
export default ActivateAccount;
