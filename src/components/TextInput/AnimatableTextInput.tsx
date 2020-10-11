import React, { Fragment, FC } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import theme from '../../constants/theme';
import styles from './styles';

import { TextInput } from 'react-native-paper';

interface ITextInputProps {
  placeholder?: string;
  label?: string;
  secureTextEntry?: boolean;
  leftIconName?: string;
  leftIconSize?: number;
  rightIcon?: React.ReactNode;
  name: string;
  value: string;
  errors: any[];
  touched: any[];
  handleChange: (name: string) => void;
  handleLeftIconPress?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  textInputRef:
    | ((instance: TextInput | null) => void)
    | React.RefObject<TextInput>
    | null
    | undefined;
  autoCompleteType?:
    | 'name'
    | 'username'
    | 'password'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'off'
    | undefined;
}

const AnimatableTextInput: FC<ITextInputProps> = ({
  placeholder,
  secureTextEntry,
  leftIconName,
  leftIconSize,
  rightIcon,
  name,
  value,
  errors,
  touched,
  handleChange,
  containerStyles,
  textInputRef,
  handleLeftIconPress,
  autoCompleteType,
}) => {
  const showErrorState = (touched: any, errors: any, name: string) => {
    return touched[name] !== undefined && errors[name] !== undefined;
  };

  return (
    <Fragment>
      <View style={[containerStyles]}>
        <TextInput
          mode="outlined"
          left={
            leftIconName ? (
              <TextInput.Icon
                onPress={() => {
                  if (handleLeftIconPress) {
                    handleLeftIconPress();
                  }
                }}
                name={leftIconName || ''}
                color={theme.dark.hex}
                size={leftIconSize || 20}
              />
            ) : null
          }
          autoCompleteType={autoCompleteType}
          right={rightIcon || null}
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
      </View>
    </Fragment>
  );
};

export default AnimatableTextInput;
