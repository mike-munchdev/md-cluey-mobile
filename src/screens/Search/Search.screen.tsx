import React, { FC, useContext, useRef, useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { throttle, debounce } from 'throttle-debounce';

import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Formik } from 'formik';
import SearchContainer from './SearchContainer';
import styles from './styles';
import theme from '../../constants/theme';
import { ActionButton, RoundedIconButton } from '../../components/Buttons';
import { HrText } from '../../components/Text';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  AnimatableTextInput,
  AutoCompleteTextInput,
} from '../../components/TextInput';
import {
  moveUpAndFadeIn,
  fadeOutAndGrow,
  moveDownAndFadeOut,
  fadeInAndShrink,
  getOutOfTheWay,
  buttonViewAnimateOut,
  searchViewGetOutOfTheWay,
  fadeIn,
} from './animations';
import { searchSchema } from '../../validation/searchSchema';
import { useLazyQuery } from '@apollo/react-hooks';
import {
  GET_COMPANIES_BY_NAME,
  getCompaniesByNameError,
  getCompaniesByNameCompleted,
} from '../../graphql/queries/company/companies';
import { sortByFieldName } from '../../utils/sort';
import { IAutoCompleteItemProps } from '../../components/TextInput/AutoCompleteTextInput';
import { Button } from 'react-native-paper';

const Search: FC = () => {
  const navigation = useNavigation();
  const buttonView = useRef(null);
  const searchView = useRef(null);
  const categoryView = useRef(null);
  const searchTextInputRef = useRef(null);
  const magnifyingGlassImageRef = useRef(null);
  const [companies, setCompanies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [waitingFor, setWaitingFor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoCompleteCache, setAutoCompleteCache] = useState({});
  const [
    selectedCompany,
    setSelectedCompany,
  ] = useState<IAutoCompleteItemProps | null>(null);

  useEffect(() => {
    if (selectedCompany) {
      const company = companies.find((p) => p.id === selectedCompany.id);
      setSearchText('');
      navigation.navigate('Brand', { company });
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (searchText.length < 5 && searchText.length >= 3) {
      const cached = autoCompleteCache[searchText];
      if (cached) {
        setCompanies(cached);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        autocompleteSearchThrottled(searchText);
      }
    } else if (searchText.length >= 5) {
      const cached = autoCompleteCache[searchText];
      if (cached) {
        setCompanies(cached);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        autocompleteSearchDebounced(searchText);
      }
    }
  }, [searchText]);

  const [getCompanysByName] = useLazyQuery(GET_COMPANIES_BY_NAME, {
    fetchPolicy: 'network-only',
    onError: getCompaniesByNameError(setCompanies, setIsLoading),
    onCompleted: getCompaniesByNameCompleted(
      setCompanies,
      setIsLoading,
      setAutoCompleteCache,
      autoCompleteCache
    ),
  });

  const autocompleteSearch = (query: string) => {
    getCompanysByName({
      variables: {
        name: searchText,
        exact: false,
      },
    });
  };

  const autocompleteSearchDebounced = debounce(500, autocompleteSearch);
  const autocompleteSearchThrottled = throttle(500, autocompleteSearch);

  const searchByNameTransitionIn = async () => {
    const buttonViewEndState = await buttonView.current.fadeOut(400);

    const searchViewEndState = searchView.current.animate(moveUpAndFadeIn);
    if (buttonViewEndState.finished) {
      buttonView.current.animate(buttonViewAnimateOut);
    }
    const magnifyingGlassImageEndState = await magnifyingGlassImageRef.current.animate(
      fadeOutAndGrow
    );

    if (magnifyingGlassImageEndState.finished) {
      magnifyingGlassImageRef.current.animate(getOutOfTheWay);
    }

    searchTextInputRef.current.focus();
  };
  const searchByNameTransitionOut = async () => {
    searchTextInputRef.current.blur();
    buttonView.current.bounceInRight(100);
    buttonView.current.fadeIn(1000);
    const magnifyingGlassImageEndState = magnifyingGlassImageRef.current.animate(
      fadeInAndShrink
    );
    const searchViewEndState = await searchView.current.animate(
      moveDownAndFadeOut
    );

    if (searchViewEndState.finished) {
      searchView.current.animate(searchViewGetOutOfTheWay);
    }
  };

  const searchByCategoryTransitionIn = async () => {
    const buttonViewEndState = await buttonView.current.fadeOut(400);

    const searchViewEndState = categoryView.current.animate(fadeIn);
    if (buttonViewEndState.finished) {
      buttonView.current.animate(buttonViewAnimateOut);
    }
    // const magnifyingGlassImageEndState = await magnifyingGlassImageRef.current.animate(
    //   fadeOutAndGrow
    // );

    // if (magnifyingGlassImageEndState.finished) {
    //   magnifyingGlassImageRef.current.animate(getOutOfTheWay);
    // }

    // searchTextInputRef.current.focus();
  };

  const searchByCategoryTransitionOut = async () => {
    buttonView.current.bounceInRight(100);
    buttonView.current.fadeIn(1000);

    const magnifyingGlassImageEndState = magnifyingGlassImageRef.current.animate(
      fadeInAndShrink
    );
    const categoryViewEndState = await categoryView.current.animate(
      moveDownAndFadeOut
    );

    if (categoryViewEndState.finished) {
      categoryView.current.animate(searchViewGetOutOfTheWay);
    }
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
            //
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
            handlePress={searchByNameTransitionIn}
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
            handlePress={searchByCategoryTransitionIn}
            textColor={theme.buttonText}
            color={theme.dark.hex}
            title="Search By Category"
            buttonStyles={{ marginTop: 20, marginHorizontal: 100 }}
          />
        </Animatable.View>

        <Animatable.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            top: 215,
            opacity: 1,
            left: -5000,
            // backgroundColor: 'red',
          }}
          ref={categoryView}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '50%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <RoundedIconButton
              onPress={() => alert('search by category')}
              backgroundColor={theme.text}
              borderColor={theme.dark.hex}
              text="Oral Care"
              icon={
                <FontAwesome5 name="tooth" size={24} color={theme.dark.hex} />
              }
              textStyle={{ fontSize: 14 }}
            />
            <RoundedIconButton
              onPress={() => alert('search by category')}
              backgroundColor={theme.text}
              borderColor={theme.dark.hex}
              text="Oral Care"
              icon={
                <FontAwesome5 name="tooth" size={24} color={theme.dark.hex} />
              }
            />
            <RoundedIconButton
              onPress={() => alert('search by category')}
              backgroundColor={theme.text}
              borderColor={theme.dark.hex}
              icon={
                <FontAwesome5 name="tooth" size={24} color={theme.dark.hex} />
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '50%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <RoundedIconButton
              onPress={() => alert('search by category')}
              backgroundColor={theme.text}
              borderColor={theme.dark.hex}
              text="Oral Care"
              icon={
                <FontAwesome5 name="tooth" size={24} color={theme.dark.hex} />
              }
              textStyle={{ fontSize: 14 }}
            />
            <RoundedIconButton
              onPress={() => alert('search by category')}
              backgroundColor={theme.text}
              borderColor={theme.dark.hex}
              text="Oral Care"
              icon={
                <FontAwesome5 name="tooth" size={24} color={theme.dark.hex} />
              }
            />
            <RoundedIconButton
              onPress={() => alert('search by category')}
              backgroundColor={theme.text}
              borderColor={theme.dark.hex}
              icon={
                <FontAwesome5 name="tooth" size={24} color={theme.dark.hex} />
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '50%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RoundedIconButton
              onPress={() => alert('search by category')}
              backgroundColor={theme.text}
              borderColor={theme.dark.hex}
              text="Oral Care"
              icon={
                <FontAwesome5 name="tooth" size={24} color={theme.dark.hex} />
              }
              textStyle={{ fontSize: 14 }}
            />
            <RoundedIconButton
              onPress={() => alert('search by category')}
              backgroundColor={theme.text}
              borderColor={theme.dark.hex}
              text="Oral Care"
              icon={
                <FontAwesome5 name="tooth" size={24} color={theme.dark.hex} />
              }
            />
            <RoundedIconButton
              onPress={() => alert('search by category')}
              backgroundColor={theme.text}
              borderColor={theme.dark.hex}
              icon={
                <FontAwesome5 name="tooth" size={24} color={theme.dark.hex} />
              }
            />
          </View>
        </Animatable.View>
        <Animatable.Image
          ref={magnifyingGlassImageRef}
          source={require('../../../assets/images/magnifying-glass-larger.png')}
          style={{
            position: 'absolute',
            left: 0,
            top: 140,
            width: 550,
            height: 550,
            overlayColor: theme.dark.hex,
            zIndex: -10,
          }}
          resizeMode="cover"
        />

        <Formik
          initialValues={{
            searchText: '',
          }}
          validationSchema={searchSchema}
          onSubmit={async (values) => {
            // const { search } = values;
            // await userSignup({
            //   variables: { input: { email, password, firstName, lastName } },
            // });
          }}
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleSubmit,
            resetForm,
          }) => {
            return (
              <Animatable.View
                style={{
                  // alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  width: '100%',
                  top: 100,
                  opacity: 1,
                  left: -5000,
                }}
                ref={searchView}
              >
                <AutoCompleteTextInput
                  containerStyles={{
                    marginBottom: 20,
                    marginHorizontal: 40,
                  }}
                  isLoading={isLoading}
                  label="SEARCH TEXT"
                  placeholder="Search Companys, Brands and Retailers"
                  iconName="arrow-left"
                  iconSize={24}
                  name="searchText"
                  value={values.searchText}
                  errors={errors}
                  touched={touched}
                  handleChange={(e) => {
                    handleChange('searchText')(e);
                    setSearchText(e);
                  }}
                  handleItemPress={(item) => setSelectedCompany(item)}
                  textInputRef={searchTextInputRef}
                  handleIconPress={() => {
                    searchByNameTransitionOut();
                    setCompanies([]);
                    resetForm();
                  }}
                  data={sortByFieldName(
                    companies.map((p) => ({
                      id: p.id,
                      title: p.name,
                      description: 'description',
                      value: p.id,
                    })),
                    'name',
                    'asc'
                  )}
                />
              </Animatable.View>
            );
          }}
        </Formik>

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
