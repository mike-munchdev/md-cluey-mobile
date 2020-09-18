import React, { FC, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Formik } from 'formik';
import ProfileContainer from './ProfileContainer';
import styles from './styles';
import theme from '../../constants/theme';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { searchSchema } from '../../validation/searchSchema';
import {
  PoliticalScoreCard,
  ParentOrganizationCard,
  PeopleScoreCard,
  PlanetScoreCard,
} from '../../components/Cards';
import { ICompany } from '../../interfaces';
import { HorizontalRule } from '../../components/HorizontalRule';
import {
  Button,
  Card,
  List,
  Modal,
  Paragraph,
  Portal,
  Title,
} from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import { EditStringValueModal } from '../../components/Modals';

const Profile: FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = useState('Michael Griffin');
  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <ProfileContainer>
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
        <List.Section style={{ width: '100%' }}>
          <List.Subheader style={{ fontSize: 16, textTransform: 'uppercase' }}>
            account information
          </List.Subheader>
          <ListItem
            style={{
              marginHorizontal: 10,
            }}
            bottomDivider
            onPress={() => showModal()}
          >
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
              <ListItem.Subtitle>Name</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem
            style={{
              marginHorizontal: 10,
            }}
            bottomDivider
            onPress={() => alert('hello')}
          >
            <ListItem.Content>
              <ListItem.Title>mgriffin.jr@gmail.com</ListItem.Title>
              <ListItem.Subtitle>Email</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem
            style={{
              marginHorizontal: 10,
            }}
            bottomDivider
            onPress={() => alert('hello')}
          >
            <ListItem.Content>
              <ListItem.Title>************</ListItem.Title>
              <ListItem.Subtitle>Password</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </List.Section>
      </View>
      <EditStringValueModal
        isVisible={visible}
        hideModal={hideModal}
        value={name}
        title="Name"
      />
    </ProfileContainer>
  );
};
export default Profile;
