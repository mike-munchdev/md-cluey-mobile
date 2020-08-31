import React, { FC, useContext, useRef } from 'react';
import { View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Autocomplete from 'react-native-autocomplete-input';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Formik } from 'formik';
import SearchContainer from './SearchContainer';
import styles from './styles';
import theme from '../../constants/theme';
import { ActionButton } from '../../components/Buttons';
import { HrText } from '../../components/Text';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { AnimatableTextInput } from '../../components/TextInput';
import {
  moveUpAndFadeIn,
  fadeOutAndGrow,
  moveDownAndFadeOut,
  fadeInAndShrink,
} from './animations';

const Search: FC = () => {
  const navigation = useNavigation();
  const buttonView = useRef(null);
  const searchView = useRef(null);
  const searchTextInputRef = useRef(null);
  const magnifyingGlassImageRef = useRef(null);

  const moveIn = async () => {
    const endState = buttonView.current.fadeOut(800);
    buttonView.current.bounceOutLeft(100);
    const searchViewEndState = searchView.current.animate(moveUpAndFadeIn);
    const magnifyingGlassImageEndState = magnifyingGlassImageRef.current.animate(
      fadeOutAndGrow
    );

    searchTextInputRef.current.focus();
  };
  const moveOut = async () => {
    searchTextInputRef.current.blur();
    const searchViewEndState = searchView.current.animate(moveDownAndFadeOut);
    buttonView.current.bounceInRight(100);
    buttonView.current.fadeIn(800);

    const magnifyingGlassImageEndState = magnifyingGlassImageRef.current.animate(
      fadeInAndShrink
    );
  };
  return (
    <SearchContainer>
      <View style={styles.overlayContainer}>
        <TouchableOpacity
          style={{ marginLeft: 20, marginTop: 20 }}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <FontAwesome5 name="bars" size={24} color={theme.dark.hex} />
        </TouchableOpacity>

        <Animatable.View
          style={{
            // backgroundColor: 'red',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            top: 270,
            zIndex: 99,
          }}
          ref={buttonView}
        >
          <ActionButton
            handlePress={moveIn}
            textColor={theme.buttonText}
            color={theme.dark.hex}
            title="Search By Name"
            buttonStyles={{ marginHorizontal: 100 }}
          />

          <HrText
            text="Or"
            containerStyles={{ marginTop: 10, marginHorizontal: 100 }}
          />

          <ActionButton
            handlePress={() => console.log('yo')}
            textColor={theme.buttonText}
            color={theme.dark.hex}
            title="Search By Category"
            buttonStyles={{ marginTop: 20, marginHorizontal: 100 }}
          />
        </Animatable.View>

        <Animatable.Image
          ref={magnifyingGlassImageRef}
          source={require('../../../assets/images/magnifying-glass.png')}
          style={{
            position: 'absolute',
            left: 0,
            top: 140,
            width: 550,
            height: 550,
            overlayColor: theme.dark.hex,
          }}
          resizeMode="cover"
        ></Animatable.Image>
        <Animatable.View
          style={{
            // alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            top: 100,
            opacity: 0,
          }}
          ref={searchView}
        >
          <AnimatableTextInput
            containerStyles={{
              marginBottom: 20,
              marginHorizontal: 40,
            }}
            label="FIRST NAME"
            placeholder="Search Products, Brands and Retailers"
            iconName="arrow-left"
            iconSize={24}
            name="firstName"
            value={''}
            errors={{}}
            touched={{}}
            handleChange={() => console.log('changing')}
            textInputRef={searchTextInputRef}
            handleIconPress={moveOut}
          />

          {/* <Autocomplete
            data={{{id: 'test'}}}
            defaultValue={query}
            onChangeText={(text) => this.setState({ query: text })}
            renderItem={({ item, i }) => (
              <TouchableOpacity onPress={() => this.setState({ query: item })}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          /> */}
        </Animatable.View>
        <View style={styles.top}>
          <Animatable.Text
            animation="fadeIn"
            style={{
              fontFamily: 'CoinyRegular',
              fontSize: 72,
              color: theme.text,
            }}
          >
            Cluey
          </Animatable.Text>
        </View>
      </View>
    </SearchContainer>
  );
};
export default Search;
