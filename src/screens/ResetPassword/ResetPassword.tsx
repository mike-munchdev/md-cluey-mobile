import React, { useContext, FC, useState } from 'react';
import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';

import { Formik } from 'formik';

import styles from './styles';

import { AnimatableTextInput } from '../../components/TextInput';
import { AppContext, AuthContext } from '../../config/context';
import theme from '../../constants/theme';
import { ActionButton } from '../../components/Buttons';

import {
  updateUserPasswordCompleted,
  updateUserPasswordError,
  UPDATE_USER_PASSWORD,
} from '../../graphql/queries/user';
import { LogoText } from '../../components/Text';
import { KeyboardAvoidingContainer } from '../../components/Containers';

import updatePasswordSchema from '../../validation/updatePasswordSchema';
import { TextInput } from 'react-native-paper';
import { Button, Overlay } from 'react-native-elements';
import { passwordRequirments } from '../../validation/passwordSchema';

const RequestPasswordReset: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordSnackVisible, setPasswordSnackVisible] = useState(false);
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD, {
    fetchPolicy: 'no-cache',
    onError: updateUserPasswordError(
      dispatch,
      state.alertVisible,
      setIsLoading
    ),
    onCompleted: updateUserPasswordCompleted(
      setIsLoading,
      dispatch,
      navigation,
      'Drawer'
    ),
  });

  return (
    <KeyboardAvoidingContainer isLoading={false}>
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
            password: '',
          }}
          validationSchema={updatePasswordSchema}
          onSubmit={async (values, {}) => {
            setIsLoading(true);
            const { password } = values;

            await updateUserPassword({
              variables: {
                input: {
                  userId: state.user?.id,
                  password,
                  isReset: true,
                },
              },
            });
          }}
        >
          {({ handleSubmit, errors, touched, values, handleChange }) => {
            return (
              <View style={styles.formContainer}>
                <View style={styles.inputView}>
                  <AnimatableTextInput
                    label="PASSWORD"
                    placeholder="Enter password"
                    leftIconName={passwordSecureTextEntry ? 'eye' : 'lock'}
                    rightIcon={
                      <TextInput.Icon
                        onPress={() => {
                          setPasswordSnackVisible(!passwordSnackVisible);
                        }}
                        name="help-circle-outline"
                        color={theme.dark.hex}
                        size={20}
                      />
                    }
                    name="password"
                    value={values.password}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange('password')}
                    secureTextEntry={passwordSecureTextEntry}
                    containerStyles={{ marginTop: 10 }}
                    handleLeftIconPress={() =>
                      setPasswordSecureTextEntry(!passwordSecureTextEntry)
                    }
                    autoCompleteType="password"
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
      </View>
    </KeyboardAvoidingContainer>
  );
};
export default RequestPasswordReset;
