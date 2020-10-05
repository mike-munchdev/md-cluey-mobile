import React, { FC, useState, useContext, Fragment } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import * as EmailValidator from 'email-validator';
import { isDate, capitalize } from 'lodash';

import styles from './styles';
import theme from '../../constants/theme';
import schema from '../../validation/passwordSchema';

import { List, Paragraph } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import {
  EditOptionsValueModal,
  EditStringValueModal,
} from '../../components/Modals';
import { useMutation } from '@apollo/react-hooks';
import {
  updateUserCompleted,
  updateUserError,
  updateUserPasswordCompleted,
  updateUserPasswordError,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
} from '../../graphql/queries/user/user';
import { AppContext, AuthContext } from '../../config/context';
import { passwordRequirments } from '../../validation/passwordSchema';
import moment from 'moment';
import { genderOptions, stateOptions } from '../../utils/optionLists';
import colors from '../../constants/colors';
import { StandardContainer } from '../../components/Containers';

export interface IOptionsProps {
  name: string;
  value: string;
}
export interface IFieldProps {
  fieldLabel: string;
  fieldName: string;
  fieldValue: string | Date;
  secureTextEntry: boolean;
  isValid: (value: string) => boolean;
  captionText?: string[];
  options: IOptionsProps[] | undefined;
  placeholder: string;
  maskType?: 'phone' | 'date' | 'money' | 'none' | undefined;
}

const Profile: FC = () => {
  const { user, setUser } = useContext(AppContext);
  const { signOut } = useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);
  const [isStringDialogVisible, setIsStringDialogVisible] = useState(false);
  const [isOptionsDialogVisible, setIsOptionsDialogVisible] = useState(false);
  const [fieldProps, setFieldProps] = useState<IFieldProps>({
    fieldLabel: '',
    fieldName: '',
    fieldValue: '',
    secureTextEntry: false,
    isValid: () => {
      return false;
    },
    captionText: [],
    placeholder: '',
    maskType: 'none',
    options: [],
  });

  const resetDialog = () => {
    setIsStringDialogVisible(false);
    setIsOptionsDialogVisible(false);
    setIsSaving(false);
  };

  const [updateUser] = useMutation(UPDATE_USER, {
    onError: updateUserError(resetDialog),
    onCompleted: updateUserCompleted(resetDialog, setUser),
  });

  const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD, {
    onError: updateUserPasswordError(setIsStringDialogVisible),
    onCompleted: updateUserPasswordCompleted(setIsStringDialogVisible, setUser),
  });

  const updateValue = (updatedValue: string) => {
    (async () => {
      setIsSaving(true);
      if (fieldProps.fieldName === 'password') {
        await updateUserPassword({
          variables: {
            input: {
              userId: user?.id,
              password: updatedValue,
            },
          },
        });
      } else {
        await updateUser({
          variables: {
            input: {
              userId: user?.id,
              [fieldProps.fieldName]: updatedValue,
            },
          },
        });
      }
    })();
  };

  const navigation = useNavigation();

  return (
    <StandardContainer>
      <View style={styles.overlayContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ marginHorizontal: 20, marginTop: 20 }}
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <FontAwesome5 name="bars" size={24} color={theme.dark.hex} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <List.Section style={{ width: '100%' }}>
            <List.Subheader
              style={{ fontSize: 16, textTransform: 'uppercase' }}
            >
              account information
            </List.Subheader>
            <ListItem
              style={{
                marginHorizontal: 10,
              }}
              bottomDivider
              onPress={() => {
                setFieldProps({
                  fieldName: 'firstName',
                  fieldLabel: 'First Name',
                  fieldValue: user?.firstName || '',
                  secureTextEntry: false,
                  isValid: (value: string) => {
                    return value.length > 0;
                  },
                  captionText: [],
                  placeholder: 'First Name',
                  maskType: 'none',
                  options: [],
                });
                setIsStringDialogVisible(true);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{user?.firstName}</ListItem.Title>
                <ListItem.Subtitle>First Name</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
            <ListItem
              style={{
                marginHorizontal: 10,
              }}
              bottomDivider
              onPress={() => {
                setFieldProps({
                  fieldName: 'lastName',
                  fieldLabel: 'Last Name',
                  fieldValue: user ? user.lastName : '',
                  secureTextEntry: false,
                  isValid: (value) => {
                    return value.length > 0;
                  },
                  captionText: [],
                  placeholder: 'Last Name',
                  maskType: 'none',
                  options: [],
                });

                setIsStringDialogVisible(true);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{user?.lastName}</ListItem.Title>
                <ListItem.Subtitle>Last Name</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
            {user?.facebookId || user?.googleId ? null : (
              <Fragment>
                <ListItem
                  style={{
                    marginHorizontal: 10,
                  }}
                  bottomDivider
                  onPress={() => {
                    setFieldProps({
                      fieldName: 'email',
                      fieldLabel: 'E-mail',
                      fieldValue: user ? user.email : '',
                      secureTextEntry: false,
                      isValid: (value: string) => {
                        return (
                          value.length > 0 && EmailValidator.validate(value)
                        );
                      },
                      captionText: [],
                      placeholder: 'E-mail',
                      maskType: 'none',
                      options: [],
                    });

                    setIsStringDialogVisible(true);
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title>{user?.email}</ListItem.Title>
                    <ListItem.Subtitle>Email</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>

                <ListItem
                  style={{
                    marginHorizontal: 10,
                  }}
                  bottomDivider
                  onPress={() => {
                    setFieldProps({
                      fieldName: 'password',
                      fieldLabel: 'Password',
                      fieldValue: '************',
                      secureTextEntry: true,
                      isValid: (value: string) => {
                        return value.length > 0 && schema.validate(value);
                      },
                      captionText: passwordRequirments,
                      placeholder: 'Password',
                      maskType: 'none',
                      options: [],
                    });

                    setIsStringDialogVisible(true);
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title>************</ListItem.Title>
                    <ListItem.Subtitle>Password</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </Fragment>
            )}
          </List.Section>
          <List.Section style={{ width: '100%' }}>
            <List.Subheader
              style={{ fontSize: 16, textTransform: 'uppercase' }}
            >
              Cluey Consumer profile
            </List.Subheader>
            <ListItem
              style={{
                marginHorizontal: 10,
              }}
              bottomDivider
              onPress={() => {
                setFieldProps({
                  fieldName: 'dob',
                  fieldLabel: 'Age',
                  fieldValue: user?.dob,
                  secureTextEntry: false,
                  isValid: (value: string) => {
                    return value.length > 0 && isDate(new Date(value));
                  },
                  captionText: [],
                  placeholder: 'MM/DD/YYYY',
                  maskType: 'date',
                  options: [],
                });
                setIsStringDialogVisible(true);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>
                  {user && user.dob
                    ? moment(user.dob).format('MM/DD/YYYY')
                    : null}
                </ListItem.Title>
                <ListItem.Subtitle>Age</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
            <ListItem
              style={{
                marginHorizontal: 10,
              }}
              bottomDivider
              onPress={() => {
                setFieldProps({
                  fieldName: 'gender',
                  fieldLabel: 'Gender',
                  fieldValue: user ? user.gender : '',
                  secureTextEntry: false,
                  isValid: (value) => {
                    return value.length > 0;
                  },
                  captionText: [],
                  placeholder: 'Gender',
                  options: genderOptions,
                });

                setIsOptionsDialogVisible(true);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>
                  {user ? capitalize(user.gender) : ''}
                </ListItem.Title>
                <ListItem.Subtitle>Gender</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
            <ListItem
              style={{
                marginHorizontal: 10,
              }}
              bottomDivider
              onPress={() => {
                setFieldProps({
                  fieldName: 'city',
                  fieldLabel: 'City',
                  fieldValue: user ? user.city : '',
                  secureTextEntry: false,
                  isValid: (value) => {
                    return value.length > 0;
                  },
                  captionText: [],
                  placeholder: 'City',
                  maskType: 'none',
                  options: [],
                });

                setIsStringDialogVisible(true);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{user?.city}</ListItem.Title>
                <ListItem.Subtitle>City</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
            <ListItem
              style={{
                marginHorizontal: 10,
              }}
              bottomDivider
              onPress={() => {
                setFieldProps({
                  fieldName: 'state',
                  fieldLabel: 'State',
                  fieldValue: user ? user.state : '',
                  secureTextEntry: false,
                  isValid: (value) => {
                    return value.length > 0;
                  },
                  captionText: [],
                  placeholder: 'State',
                  options: stateOptions,
                });

                setIsOptionsDialogVisible(true);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>
                  {user && user.state ? user.state.toUpperCase() : ''}
                </ListItem.Title>
                <ListItem.Subtitle>State</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </List.Section>
          <List.Section style={{ width: '100%' }}>
            <List.Subheader
              style={{ fontSize: 16, textTransform: 'uppercase' }}
            >
              Logout
            </List.Subheader>
            <ListItem
              style={{
                marginHorizontal: 10,
              }}
              bottomDivider
              onPress={() => {
                signOut(navigation);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>Logout</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </List.Section>
          <List.Section>
            <ListItem
              containerStyle={{
                backgroundColor: theme.buttonTransparentBackground,
              }}
            >
              <Paragraph style={{ color: theme.dark.hex }}>
                “Why am I being asked for this information? When Cluey users
                choose to make their likes and dislikes public to companies,
                Cluey uses the information provided in this section (age,
                gender, and region) to send on your behalf to companies so they
                have an anonymized demographic profile behind the likes and
                dislikes data. This allows your message to companies and the
                data they receive to be more meaningful. We will never share any
                account information such as usernames or emails to companies or
                any third parties.”
              </Paragraph>
            </ListItem>
          </List.Section>
        </ScrollView>
      </View>
      <EditStringValueModal
        isVisible={isStringDialogVisible}
        isSaving={isSaving}
        isValid={fieldProps.isValid}
        success={updateValue}
        cancel={() => {
          setIsStringDialogVisible(false);
        }}
        maskType={fieldProps.maskType}
        value={fieldProps.fieldValue}
        title={fieldProps.fieldLabel}
        secure={fieldProps.secureTextEntry}
        captionText={fieldProps.captionText}
        placeholder={fieldProps.placeholder}
      />
      <EditOptionsValueModal
        isVisible={isOptionsDialogVisible}
        isSaving={isSaving}
        isValid={fieldProps.isValid}
        success={updateValue}
        cancel={() => {
          setIsOptionsDialogVisible(false);
        }}
        value={fieldProps.fieldValue}
        title={fieldProps.fieldLabel}
        secure={fieldProps.secureTextEntry}
        captionText={fieldProps.captionText}
        options={fieldProps.options}
        placeholder={fieldProps.placeholder}
      />
    </StandardContainer>
  );
};
export default Profile;
