import React, { useState, useContext } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';

import { AppContext } from '../../config/context';

import SidebarMenuItem from './SidebarMenuItem';
import { HorizontalRule } from '../HorizontalRule/';
import { useNavigation } from '@react-navigation/native';
import theme from '../../constants/theme';
import { AlertHelper } from '../../utils/alert';
import { useMutation } from '@apollo/react-hooks';
import {
  updateUserCompleted,
  updateUserError,
  UPDATE_USER,
} from '../../graphql/queries/user/user';

const Sidebar = () => {
  const navigation = useNavigation();

  const { user, setUser } = useContext(AppContext);

  const [, setIsLoading] = useState(false);

  const [updateUser] = useMutation(UPDATE_USER, {
    onError: updateUserError(setIsLoading),
    onCompleted: updateUserCompleted(setIsLoading, setUser),
  });
  const onIsMakeLikesPublicToggleSwitch = async () => {
    // check for consumer profile settings
    if (user?.username && user.dob && user.gender && user.city && user.state) {
      await updateUser({
        variables: {
          input: {
            userId: user?.id,
            isProfilePublic: !user?.isProfilePublic,
          },
        },
      });
    } else {
      AlertHelper.show(
        'error',
        'Profile',
        'Cluey Consuer Profile must be set in order to make likes/dislikes public'
      );
    }
  };

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
              user ? `${user.firstName} ${user.lastName}` : ''
            }`}</Text>

            <Text style={{ fontSize: 14 }}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <HorizontalRule styles={{ marginBottom: 20 }} />
      <View style={{ marginLeft: 10, marginBottom: 20 }}>
        <SidebarMenuItem
          onPress={() => navigation.navigate('Search')}
          iconName="search"
          iconSize={20}
          title="Search"
          iconColor={theme.dark.hex}
        />
        {/* <SidebarMenuItem
          onPress={async () => {
            alert('Under Development');
          }}
          iconName="building"
          iconColor={theme.dark.hex}
          iconSize={20}
          title="Pharmacy"
          viewStyles={{ marginTop: 20 }}
        /> */}
      </View>
      <HorizontalRule styles={{ marginBottom: 20 }} />
      <View style={{ marginLeft: 10, marginBottom: 20 }}>
        <SidebarMenuItem
          onPress={async () => {
            navigation.navigate('Friends');
          }}
          iconName="user-friends"
          iconSize={20}
          title="Manage Cluey Friends"
          iconColor={theme.dark.hex}
        />

        <SidebarMenuItem
          onPress={async () => {
            navigation.navigate('MyLikes');
          }}
          iconName="thumbs-up"
          iconSize={20}
          title="My likes and dislikes"
          iconColor={theme.dark.hex}
          viewStyles={{ marginTop: 20 }}
        />
        <SidebarMenuItem
          onPress={onIsMakeLikesPublicToggleSwitch}
          icon={() => (
            <MaterialCommunityIcons
              name={
                user?.isProfilePublic ? 'toggle-switch' : 'toggle-switch-off'
              }
              size={20}
              color={
                user?.isProfilePublic ? theme.successText : theme.errorText
              }
            />
          )}
          title="Make Likes/Dislikes Public"
          viewStyles={{ marginTop: 20 }}
        />
        {/* <SidebarMenuItem
          onPress={async () => {
            navigation.navigate('Settings');
          }}
          iconName="cog"
          iconColor={theme.dark.hex}
          iconSize={20}
          title="Settings"
        /> */}
        {/* <SidebarMenuItem
          onPress={async () => {
            AlertHelper.show(
              'info',
              'Under Development',
              'Feature is currently under development!'
            );
          }}
          iconName="flag-usa"
          iconSize={20}
          title="Manage Political Preferences"
          iconColor={theme.dark.hex}
          viewStyles={{ marginTop: 20 }}
        /> */}

        {/* <SidebarMenuItem
          onPress={async () => {
            await signOut(navigation);
          }}
          iconName="sign-out-alt"
          iconColor={theme.dark.hex}
          iconSize={20}
          title="Logout"
          viewStyles={{ marginTop: 20 }}
        /> */}
      </View>
      <HorizontalRule styles={{ marginBottom: 20 }} />
      <View style={{ marginLeft: 10, marginBottom: 20 }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 14 }}>Coming Soon</Text>
        </View>
        <SidebarMenuItem
          onPress={async () => {
            AlertHelper.show(
              'info',
              'Under Development',
              'Feature is currently under development!'
            );
          }}
          iconName="globe-americas"
          iconColor={theme.disabledText}
          iconSize={20}
          title="Manage Planet Preferences"
        />
        <SidebarMenuItem
          onPress={async () => {
            AlertHelper.show(
              'info',
              'Under Development',
              'Feature is currently under development!'
            );
          }}
          iconName="users"
          iconSize={20}
          iconColor={theme.disabledText}
          viewStyles={{ marginTop: 20 }}
          title="Manage People Preferences"
        />
        <SidebarMenuItem
          onPress={async () => {
            AlertHelper.show(
              'info',
              'Under Development',
              'Feature is currently under development!'
            );
          }}
          iconName="clipboard-list"
          iconSize={20}
          title="Create Shopping List"
          iconColor={theme.disabledText}
          viewStyles={{ marginTop: 20 }}
        />
      </View>

      <HorizontalRule styles={{ marginBottom: 20 }} />
    </SafeAreaView>
  );
};
export default Sidebar;
