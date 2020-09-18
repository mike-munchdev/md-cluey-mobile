import React, { Fragment, useState, FC, useCallback } from 'react';
import { FieldProps } from 'formik';
import {
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import colors from '../../constants/colors';
import theme from '../../constants/theme';
import styles from './styles';

import { TextInput } from 'react-native-paper';

interface ITextInputProps {
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
}

const AnimatableTextInput: FC<ITextInputProps> = ({
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
}) => {
  const showErrorState = (touched: any, errors: any, name: string) => {
    return touched[name] !== undefined && errors[name] !== undefined;
  };

  return (
    <View style={[containerStyles]}>
      <TextInput
        mode="outlined"
        left={
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
        }
        ref={textInputRef}
        theme={{ colors: { primary: theme.dark.hex } }}
        placeholderTextColor={theme.text}
        placeholder={placeholder}
        style={styles.textInput}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange}
        autoCapitalize="none"
        value={value}
        underlineColorAndroid={theme.text}
        error={showErrorState(touched, errors, name)}
      />
    </View>
  );
};

export default AnimatableTextInput;
