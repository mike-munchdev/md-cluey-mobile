import React, { FC, Fragment } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { List } from 'react-native-paper';
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import theme from '../../constants/theme';

import { ActionButton } from '../Buttons';

export interface IClueyInfoModalProps {
  setVisible: (value: boolean) => void;
  isVisible: boolean;
}
const ClueyInfoModal: FC<IClueyInfoModalProps> = ({
  setVisible,
  isVisible,
}) => {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}
      overlayStyle={{ width: '90%', height: '80%', borderRadius: 10 }}
    >
      <Fragment>
        <ScrollView persistentScrollbar={true}>
          <List.Item
            titleNumberOfLines={10}
            titleStyle={{ color: theme.dark.hex }}
            title={
              <Fragment>
                <Text style={{ fontWeight: 'bold' }}>Welcome to Cluey</Text>
                <Text>
                  , an app that brings more transparency to the impacts of your
                  consumer purchases. This is an early stage app release. It
                  focuses on political contributions given by the companies that
                  make the products and services you buy every day.
                </Text>
              </Fragment>
            }
            left={() => (
              <MaterialIcons
                name="attach-money"
                size={36}
                color={theme.dark.hex}
              />
            )}
          />
          <List.Item
            titleNumberOfLines={10}
            titleStyle={{ color: theme.dark.hex }}
            title="Candidates running for office in 2020 have raised more funding than ever before in U.S. history. Corporate donations make up a big part of that. You may not realize it, but you vote with your wallet every time you make a purchase."
            left={() => (
              <Entypo name="wallet" size={36} color={theme.dark.hex} />
            )}
          />
          <List.Item
            titleStyle={{ color: theme.dark.hex, fontWeight: 'bold' }}
            title="How to use this app in three simple steps:"
            titleNumberOfLines={2}
          />
          <List.Item
            titleNumberOfLines={10}
            titleStyle={{ color: theme.dark.hex }}
            title="Search for brands you buy every day"
            left={() => (
              <MaterialCommunityIcons
                name="numeric-1-circle"
                size={36}
                color={theme.dark.hex}
              />
            )}
          />
          <List.Item
            titleNumberOfLines={10}
            titleStyle={{ color: theme.dark.hex }}
            title="Discover which party their corporate dollars are funding"
            left={() => (
              <MaterialCommunityIcons
                name="numeric-2-circle"
                size={36}
                color={theme.dark.hex}
              />
            )}
          />
          <List.Item
            titleNumberOfLines={10}
            titleStyle={{ color: theme.dark.hex }}
            title="Make a decision to continue buying those brands or learn about other brands that better align with your ideals."
            left={() => (
              <MaterialCommunityIcons
                name="numeric-3-circle"
                size={36}
                color={theme.dark.hex}
              />
            )}
          />
        </ScrollView>

        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginTop: 10,
          }}
        >
          <ActionButton
            title="Makes sense, take me to the app"
            handlePress={() => {
              setVisible(false);
            }}
            buttonStyles={{ marginTop: 15 }}
            textColor={theme.dark.hex}
            color={theme.dark.rgba(0.4)}
            textStyle={{ fontFamily: 'MontserratBold', fontSize: 14 }}
          />
          <ActionButton
            title="Take me to Cluey's website"
            handlePress={() => {
              setVisible(false);
              Linking.openURL('https://clueyconsumer.com/faqs');
            }}
            buttonStyles={{ marginTop: 15 }}
            textColor={theme.dark.hex}
            color={theme.dark.rgba(0.4)}
            textStyle={{ fontFamily: 'MontserratBold', fontSize: 14 }}
          />
        </View>
      </Fragment>
    </Overlay>
  );
};

export default ClueyInfoModal;
