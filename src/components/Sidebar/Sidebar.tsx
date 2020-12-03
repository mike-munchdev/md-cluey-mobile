import React, { useState, useContext, Fragment, useEffect } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import styles from './styles';

import { AppContext } from '../../config/context';

import SidebarMenuItem from './SidebarMenuItem';
import { HorizontalRule } from '../HorizontalRule/';
import { StackActions, useNavigation } from '@react-navigation/native';
import theme from '../../constants/theme';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import {
  updateUserCompleted,
  updateUserError,
  UPDATE_USER,
} from '../../graphql/queries/user';
import { Overlay } from 'react-native-elements';
import { ActionButton } from '../Buttons';
import {
  getUserSystemNotificationsCompleted,
  getUserSystemNotificationsError,
  GET_USER_SYSTEM_NOTIFICATIONS,
} from '../../graphql/queries/systemnotifications';

const Sidebar = () => {
  const navigation = useNavigation();

  const { state, dispatch } = useContext(AppContext);

  const [, setIsLoading] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [friendsOverlayVisible, setFriendsOverlayVisible] = useState(false);

  const [updateUser] = useMutation(UPDATE_USER, {
    onError: updateUserError(dispatch, state.alertVisible, setIsLoading),
    onCompleted: updateUserCompleted(setIsLoading, dispatch),
  });

  const [getSystemNotifications] = useLazyQuery(GET_USER_SYSTEM_NOTIFICATIONS, {
    fetchPolicy: 'network-only',
    onError: getUserSystemNotificationsError(
      dispatch,
      state.alertVisible,
      setNotificationsLoading
    ),
    onCompleted: getUserSystemNotificationsCompleted(
      dispatch,
      setNotificationsLoading
    ),
  });

  const onIsMakeLikesPublicToggleSwitch = async () => {
    // check for consumer profile settings
    if (
      state.user?.dob &&
      state.user?.gender &&
      state.user?.city &&
      state.user?.state
    ) {
      await updateUser({
        variables: {
          input: {
            userId: state.user?.id,
            isProfilePublic: !state.user?.isProfilePublic,
          },
        },
      });
    } else {
      setOverlayVisible(true);
    }
  };

  const handleManageFriendsPress = async () => {
    // check for username

    if (state.user?.username) {
      navigation.navigate('Friends');
    } else {
      setFriendsOverlayVisible(true);
    }
  };

  useEffect(() => {
    if (state.user?.mustResetPassword) {
      navigation.dispatch(StackActions.replace('ResetPassword'));
    }
  }, [state.user]);

  useEffect(() => {
    (async () => {
      await getSystemNotifications({
        variables: {
          userId: state.user?.id,
        },
      });
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginLeft: 10, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name="user-circle" color={theme.dark.hex} size={32} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ marginLeft: 15 }}
          >
            <Text style={{ fontSize: 18 }}>{`${
              state.user ? `${state.user.firstName} ${state.user.lastName}` : ''
            }`}</Text>

            <Text style={{ fontSize: 14 }}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <HorizontalRule styles={{ marginBottom: 20 }} />
      <View style={{ marginLeft: 10, marginBottom: 20 }}>
        <SidebarMenuItem
          onPress={() => navigation.navigate('Home')}
          iconName="search"
          iconSize={20}
          title="Search"
          iconColor={theme.dark.hex}
        />
      </View>
      <HorizontalRule styles={{ marginBottom: 20 }} />
      <View style={{ marginLeft: 10, marginBottom: 20 }}>
        <SidebarMenuItem
          onPress={async () => {
            navigation.navigate('MyLikes');
          }}
          iconName="thumbs-up"
          iconSize={20}
          title="My likes and dislikes"
          iconColor={theme.dark.hex}
          // viewStyles={{ marginTop: 20 }}
        />
        <SidebarMenuItem
          onPress={handleManageFriendsPress}
          iconName="user-friends"
          iconSize={20}
          title="Manage Cluey Friends"
          iconColor={theme.dark.hex}
          viewStyles={{ marginTop: 20 }}
          isLoading={notificationsLoading}
          badge={state.notifications && state.notifications.length > 0}
        />

        <SidebarMenuItem
          onPress={onIsMakeLikesPublicToggleSwitch}
          icon={() => (
            <MaterialCommunityIcons
              name={
                state.user?.isProfilePublic
                  ? 'toggle-switch'
                  : 'toggle-switch-off'
              }
              size={20}
              color={
                state.user?.isProfilePublic
                  ? theme.successText
                  : theme.errorText
              }
            />
          )}
          title="Make Likes/Dislikes Public"
          viewStyles={{ marginTop: 20 }}
        />
      </View>
      <HorizontalRule styles={{ marginBottom: 20 }} />
      <View style={{ marginLeft: 10, marginBottom: 20 }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 14 }}>Coming Soon</Text>
        </View>

        <SidebarMenuItem
          onPress={() => {}}
          iconName="globe-americas"
          iconColor={theme.disabledText}
          iconSize={20}
          title="Manage Planet Preferences"
        />
        <SidebarMenuItem
          onPress={() => {}}
          iconName="users"
          iconSize={20}
          iconColor={theme.disabledText}
          viewStyles={{ marginTop: 20 }}
          title="Manage People Preferences"
        />
        <SidebarMenuItem
          onPress={() => {}}
          iconName="clipboard-list"
          iconSize={20}
          title="Create Shopping List"
          iconColor={theme.disabledText}
          viewStyles={{ marginTop: 20 }}
        />
      </View>

      <HorizontalRule styles={{ marginBottom: 20 }} />
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => setOverlayVisible(false)}
        overlayStyle={{ width: '90%' }}
      >
        <Fragment>
          <Text style={{ fontSize: 18 }}>
            Cluey Consumer Profile must be set in order to make likes/dislikes
            public. Go to “View Profile”.
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <ActionButton
              title="View Profile"
              handlePress={() => {
                setOverlayVisible(false);
                navigation.navigate('Profile');
              }}
              buttonStyles={{ marginTop: 15 }}
              textColor={theme.buttonText}
              color={theme.dark.hex}
            />
            <ActionButton
              title="Close"
              handlePress={() => {
                setOverlayVisible(false);
              }}
              buttonStyles={{ marginTop: 15 }}
              textColor={theme.buttonText}
              color={theme.dark.hex}
            />
          </View>
        </Fragment>
      </Overlay>
      <Overlay
        isVisible={friendsOverlayVisible}
        onBackdropPress={() => setFriendsOverlayVisible(false)}
        overlayStyle={{ width: '90%' }}
      >
        <Fragment>
          <Text style={{ fontSize: 18 }}>
            Username must be set in order to manage, search, or add friends. Go
            to View Profile.
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <ActionButton
              title="View Profile"
              handlePress={() => {
                setFriendsOverlayVisible(false);
                navigation.navigate('Profile');
              }}
              buttonStyles={{ marginTop: 15 }}
              textColor={theme.buttonText}
              color={theme.dark.hex}
            />
            <ActionButton
              title="Close"
              handlePress={() => {
                setFriendsOverlayVisible(false);
              }}
              buttonStyles={{ marginTop: 15 }}
              textColor={theme.buttonText}
              color={theme.dark.hex}
            />
          </View>
        </Fragment>
      </Overlay>
      <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text>{`Version: ${Constants.manifest.version}`}</Text>
      </View>
    </SafeAreaView>
  );
};
export default Sidebar;
