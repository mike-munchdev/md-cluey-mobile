import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Dialog,
  Paragraph,
  Portal,
  TextInput,
  Title,
} from 'react-native-paper';
import { MaskService } from 'react-native-masked-text';
import { isDate } from 'lodash';
import moment from 'moment';
import theme from '../../constants/theme';

export interface IEditStringValueModalProps {
  isVisible: boolean;
  isSaving: boolean;
  cancel: () => void;
  success: (updatedValue: string) => void;
  value: string | undefined;
  title: string;
  secure: boolean;
  isValid: (value: string) => boolean;
  captionText?: string[];
  placeholder: string;
}
const EditStringValueModal: FC<IEditStringValueModalProps> = ({
  isVisible,
  isSaving,
  cancel,
  success,
  value,
  title,
  secure,
  isValid,
  captionText,
  placeholder,
}) => {
  const [modalValue, setModalValue] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  useEffect(() => {
    setModalValue(value ? value.toString() : '');
  }, [value]);

  useEffect(() => {
    setSecureTextEntry(secure);
  }, [secure]);

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={cancel}>
        <Dialog.Title>{`Edit ${title}`}</Dialog.Title>
        <Dialog.Content>
          {isSaving ? (
            <ActivityIndicator
              animating={true}
              style={{ height: 70 }}
              color={theme.dark.hex}
            />
          ) : (
            <TextInput
              mode="outlined"
              left={
                <TextInput.Icon
                  name="pencil"
                  color={theme.dark.hex}
                  size={20}
                  onPress={() => {
                    if (secure) {
                      setSecureTextEntry(!secureTextEntry);
                    }
                  }}
                />
              }
              theme={{ colors: { primary: theme.dark.hex } }}
              placeholderTextColor={theme.opaque}
              placeholder={placeholder}
              autoCapitalize="none"
              value={modalValue || ''}
              underlineColorAndroid={theme.text}
              onChangeText={(v) => setModalValue(v)}
              secureTextEntry={secureTextEntry}
            />
          )}
          {captionText
            ? captionText.map((c, index) => (
                <Paragraph key={index}>{`- ${c}`}</Paragraph>
              ))
            : null}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => cancel()} color={theme.dark.hex}>
            Cancel
          </Button>
          <Button
            disabled={!isValid(modalValue)}
            onPress={() => {
              success(modalValue);
            }}
            color={theme.dark.hex}
          >
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default EditStringValueModal;
