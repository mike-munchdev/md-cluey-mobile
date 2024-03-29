import React, { FC, useState, useContext, Fragment } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import * as EmailValidator from 'email-validator';
import { isDate, capitalize } from 'lodash';

import styles from './styles';
import theme from '../../constants/theme';
import schema from '../../validation/passwordSchema';

import { List, Paragraph } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import {
  EditDateValueModal,
  EditOptionsValueModal,
  EditStringValueModal,
} from '../../components/Modals';
import { useMutation } from '@apollo/react-hooks';

import {
  updateUserCompleted,
  updateUserError,
  updateUserPasswordCompleted,
  updateUserPasswordError,
  updateUserPasswordInternalCompleted,
  updateUserPasswordInternalError,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
} from '../../graphql/queries/user/user';
import { AppContext, AuthContext } from '../../config/context';
import { passwordRequirments } from '../../validation/passwordSchema';
import moment from 'moment';
import {
  genderOptions,
  getCityOptionsFromStateName,
  stateOptions,
} from '../../utils/optionLists';
import { StandardContainer } from '../../components/Containers';

export interface IOptionsProps {
  name: string;
  value: string;
}
export interface IStringFieldProps {
  fieldLabel: string;
  fieldName: string;
  fieldValue: string | undefined;
  secureTextEntry: boolean;
  isValid: (value: string) => boolean;
  captionText?: string[];
  options: IOptionsProps[] | undefined;
  placeholder: string;
  emptyText?: string;
}

export interface IDateFieldProps {
  fieldLabel: string;
  fieldName: string;
  fieldValue: Date | undefined | null;
  secureTextEntry: boolean;
  isValid: (value: Date | undefined | null) => boolean;
  captionText?: string[];
  options: IOptionsProps[] | undefined;
  placeholder: string;
  emptyText?: string;
}

const initialStringFieldProps = {
  fieldLabel: '',
  fieldName: '',
  fieldValue: '',
  secureTextEntry: false,
  isValid: () => {
    return false;
  },
  captionText: [],
  placeholder: '',
  emptyText: '',
  options: [],
};

const initialDateFieldProps = {
  fieldLabel: '',
  fieldName: '',
  fieldValue: null,
  secureTextEntry: false,
  isValid: () => {
    return false;
  },
  captionText: [],
  placeholder: '',
  emptyText: '',
  options: [],
};

const Profile: FC = () => {
  const { user, setUser } = useContext(AppContext);
  const { signOut } = useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);
  const [isStringDialogVisible, setIsStringDialogVisible] = useState(false);
  const [isOptionsDialogVisible, setIsOptionsDialogVisible] = useState(false);
  const [isDateDialogVisible, setIsDateDialogVisible] = useState(false);
  const [stringFieldProps, setStringFieldProps] = useState<IStringFieldProps>(
    initialStringFieldProps
  );
  const [dateFieldProps, setDateFieldProps] = useState<IDateFieldProps>(
    initialDateFieldProps
  );

  const resetDialog = () => {
    setIsStringDialogVisible(false);
    setIsOptionsDialogVisible(false);
    setIsDateDialogVisible(false);
    setIsSaving(false);
  };

  const [updateUser] = useMutation(UPDATE_USER, {
    onError: updateUserError(resetDialog),
    onCompleted: updateUserCompleted(resetDialog, setUser),
  });

  const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD, {
    onError: updateUserPasswordInternalError(resetDialog),
    onCompleted: updateUserPasswordInternalCompleted(resetDialog, setUser),
  });

  const updateDateValue = (updatedValue: Date | undefined) => {
    updateValue(updatedValue);
  };
  const updateStringValue = (updatedValue: String) => {
    updateValue(updatedValue);
  };

  const updateValue = (updatedValue: String | Date | null | undefined) => {
    (async () => {
      setIsSaving(true);
      if (stringFieldProps.fieldName === 'password') {
        await updateUserPassword({
          variables: {
            input: {
              userId: user?.id,
              password: updatedValue,
            },
          },
        });
      } else {
        let updateObject = {
          [stringFieldProps.fieldName ||
          dateFieldProps.fieldName]: updatedValue,
        };

        if (stringFieldProps.fieldName === 'state') {
          if (updatedValue !== user?.state)
            updateObject = { ...updateObject, city: null };
        }
        await updateUser({
          variables: {
            input: {
              userId: user?.id,
              ...updateObject,
            },
          },
        });
      }
      setStringFieldProps(initialStringFieldProps);
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
                setStringFieldProps({
                  fieldName: 'firstName',
                  fieldLabel: 'First Name',
                  fieldValue: user?.firstName || '',
                  secureTextEntry: false,
                  isValid: (value: string) => {
                    return value ? value.length > 0 : false;
                  },
                  captionText: [],
                  placeholder: 'First Name',

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
                setStringFieldProps({
                  fieldName: 'lastName',
                  fieldLabel: 'Last Name',
                  fieldValue: user ? user.lastName : '',
                  secureTextEntry: false,
                  isValid: (value: string) => {
                    return value ? value.length > 0 : false;
                  },
                  captionText: [],
                  placeholder: 'Last Name',

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
            <ListItem
              style={{
                marginHorizontal: 10,
              }}
              bottomDivider
              onPress={() => {
                setStringFieldProps({
                  fieldName: 'username',
                  fieldLabel: 'Username',
                  fieldValue: user ? user.username : '',
                  secureTextEntry: false,
                  isValid: (value: string) => {
                    return value ? value.length > 0 : false;
                  },
                  captionText: [],
                  placeholder: 'Username',
                  options: [],
                });

                setIsStringDialogVisible(true);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{user?.username}</ListItem.Title>
                <ListItem.Subtitle>Username</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
            {user?.facebookId || user?.googleId || user?.appleId ? null : (
              <Fragment>
                <ListItem
                  style={{
                    marginHorizontal: 10,
                  }}
                  bottomDivider
                  onPress={() => {
                    setStringFieldProps({
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
                    setStringFieldProps({
                      fieldName: 'password',
                      fieldLabel: 'Password',
                      fieldValue: '************',
                      secureTextEntry: true,
                      isValid: (value: string) => {
                        return value.length > 0 && schema.validate(value);
                      },
                      captionText: passwordRequirments,
                      placeholder: 'Password',

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
                setDateFieldProps({
                  fieldName: 'dob',
                  fieldLabel: 'Age',
                  fieldValue: user?.dob,
                  secureTextEntry: false,
                  isValid: (value: string) => {
                    return isDate(value);
                  },
                  captionText: [],
                  placeholder: 'MM/DD/YYYY',
                  options: [],
                });
                setIsDateDialogVisible(true);
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
                setStringFieldProps({
                  fieldName: 'gender',
                  fieldLabel: 'Gender',
                  fieldValue: user ? user.gender : '',
                  secureTextEntry: false,
                  isValid: (value: string) => {
                    return value ? value.length > 0 : false;
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
                setStringFieldProps({
                  fieldName: 'city',
                  fieldLabel: 'City',
                  fieldValue: user ? user.city : '',
                  secureTextEntry: false,
                  isValid: (value: string) => {
                    return value ? value.length > 0 : false;
                  },
                  captionText: [],
                  placeholder: 'City',
                  emptyText: 'Must Select State First',
                  options: getCityOptionsFromStateName(user?.state),
                });

                setIsOptionsDialogVisible(true);
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
                setStringFieldProps({
                  fieldName: 'state',
                  fieldLabel: 'State',
                  fieldValue: user ? user.state : '',
                  secureTextEntry: false,
                  isValid: (value: string) => {
                    return value ? value.length > 0 : false;
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
            <ListItem
              containerStyle={{
                backgroundColor: theme.buttonTransparentBackground,
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Paragraph
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  lineHeight: 14,
                  color: theme.dark.hex,
                  fontSize: 12,
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>
                  Why am I being asked for this information?{' '}
                </Text>
                When Cluey users choose to make their likes and dislikes public
                to companies, Cluey uses the information provided in this
                section (age, gender, and region) to send on your behalf to
                companies so they have an anonymized demographic profile behind
                the likes and dislikes data. This allows your message to
                companies and the data they receive to be more meaningful. We
                will never share any account information such as usernames or
                emails to companies or any third parties.
              </Paragraph>
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
        </ScrollView>
      </View>
      <EditDateValueModal
        isVisible={isDateDialogVisible}
        isSaving={isSaving}
        isValid={dateFieldProps.isValid}
        success={updateDateValue}
        cancel={() => {
          setStringFieldProps(initialDateFieldProps);
          setIsDateDialogVisible(false);
        }}
        value={dateFieldProps.fieldValue}
        title={dateFieldProps.fieldLabel}
        secure={dateFieldProps.secureTextEntry}
        captionText={dateFieldProps.captionText}
        placeholder={dateFieldProps.placeholder}
      />
      <EditStringValueModal
        isVisible={isStringDialogVisible}
        isSaving={isSaving}
        isValid={stringFieldProps.isValid}
        success={updateStringValue}
        cancel={() => {
          setStringFieldProps(initialStringFieldProps);
          setIsStringDialogVisible(false);
        }}
        value={
          stringFieldProps.fieldValue
            ? String(stringFieldProps.fieldValue)
            : undefined
        }
        title={stringFieldProps.fieldLabel}
        secure={stringFieldProps.secureTextEntry}
        captionText={stringFieldProps.captionText}
        placeholder={stringFieldProps.placeholder}
      />
      <EditOptionsValueModal
        isVisible={isOptionsDialogVisible}
        isSaving={isSaving}
        isValid={stringFieldProps.isValid}
        success={updateStringValue}
        cancel={() => {
          setStringFieldProps(initialStringFieldProps);
          setIsOptionsDialogVisible(false);
        }}
        value={
          stringFieldProps.fieldValue
            ? String(stringFieldProps.fieldValue)
            : undefined
        }
        title={stringFieldProps.fieldLabel}
        secure={stringFieldProps.secureTextEntry}
        captionText={stringFieldProps.captionText}
        options={stringFieldProps.options}
        placeholder={stringFieldProps.placeholder}
        emptyText={stringFieldProps.emptyText}
      />
    </StandardContainer>
  );
};
export default Profile;
