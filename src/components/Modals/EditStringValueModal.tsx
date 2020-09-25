import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';
import {
  Button,
  Card,
  Dialog,
  Paragraph,
  Portal,
  TextInput,
  Title,
} from 'react-native-paper';
import theme from '../../constants/theme';
import { AnimatableTextInput } from '../TextInput';

import styles from './styles';
export interface IEditStringValueDialogProps {
  isVisible: boolean;
  hideDialog: (() => void) | undefined;
  value: string;
  title: string;
  secure?: boolean;
}
const EditStringValueDialog: FC<IEditStringValueDialogProps> = ({
  isVisible,
  hideDialog,
  value,
  title,
  secure,
}) => {
  const [modalValue, setDialogValue] = useState(value);
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={hideDialog}>
        <Dialog.Title>{`Edit ${title}`}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            left={
              <TextInput.Icon name="pencil" color={theme.dark.hex} size={20} />
            }
            theme={{ colors: { primary: theme.dark.hex } }}
            placeholderTextColor={theme.text}
            placeholder={title}
            autoCapitalize="none"
            value={modalValue}
            underlineColorAndroid={theme.text}
            onChangeText={(v) => setDialogValue(v)}
            secureTextEntry={secure}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} color={theme.dark.hex}>
            Cancel
          </Button>
          <Button onPress={hideDialog} color={theme.dark.hex}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default EditStringValueDialog;
