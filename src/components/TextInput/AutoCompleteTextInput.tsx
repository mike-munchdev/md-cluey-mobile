import React, { Fragment, useState, FC, useCallback } from 'react';
import { FieldProps } from 'formik';
import {
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  FlatList,
  ScrollView,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import colors from '../../constants/colors';
import theme from '../../constants/theme';
import styles from './styles';

import { TextInput, List, ActivityIndicator } from 'react-native-paper';

export interface IAutoCompleteItemProps {
  id: string;
  title: string;
  description: string;
  value: string;
}
export interface IAutoCompleteTextInputProps {
  placeholder?: string;
  label?: string;
  secureTextEntry?: boolean;
  iconName?: string;
  iconSize?: number;
  name: string;
  value: string;
  errors: any[];
  touched: any[];
  handleChange: (name: string) => void;
  handleIconPress?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  textInputRef:
    | ((instance: TextInput | null) => void)
    | React.RefObject<TextInput>
    | null
    | undefined;
  data: IAutoCompleteItemProps[];
  handleItemPress: (item: IAutoCompleteItemProps) => void;
  isLoading: boolean;
}

const AutoCompleteTextInput: FC<IAutoCompleteTextInputProps> = ({
  placeholder,
  label,
  secureTextEntry,
  iconName,
  iconSize,
  name,
  value,
  errors,
  touched,
  handleChange,
  containerStyles,
  textInputRef,
  handleIconPress,
  data,
  handleItemPress,
  isLoading,
}) => {
  const showErrorState = (touched: any, errors: any, name: string) => {
    return touched[name] !== undefined && errors[name] !== undefined;
  };

  return (
    <View style={[containerStyles]}>
      <TextInput
        mode="outlined"
        autoCompleteType="off"
        left={
          iconName ? (
            <TextInput.Icon
              onPress={() => {
                if (handleIconPress) {
                  handleIconPress();
                }
              }}
              name={iconName || ''}
              color={theme.dark.hex}
              size={iconSize || 20}
            />
          ) : null
        }
        ref={textInputRef}
        theme={{ colors: { primary: theme.dark.hex } }}
        placeholderTextColor={theme.opaque}
        placeholder={placeholder}
        style={styles.textInput}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange}
        autoCapitalize="none"
        value={value}
        underlineColorAndroid={theme.text}
        error={showErrorState(touched, errors, name)}
      />
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          style={{ height: 70 }}
          color={theme.dark.hex}
        />
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <List.Item
                  style={{ backgroundColor: 'white' }}
                  title={item.title}
                  description={item.brand ? item.brand.name : ''}
                  // left={(props) => <List.Icon {...props} icon="folder" />}
                />
              </TouchableOpacity>
            );
          }}
          //   renderItem={({ item }) => (
          //     <TouchableOpacity onPress={() => handleItemPress(item)}>
          //       <Text>{item}</Text>
          //     </TouchableOpacity>
          //   )}
        />
      ) : null}
    </View>
  );
};

export default AutoCompleteTextInput;
