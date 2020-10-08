import React, { useState, useEffect, FC } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Dialog,
  Paragraph,
  Portal,
  RadioButton,
  TextInput,
  Title,
} from 'react-native-paper';

import { isDate } from 'lodash';
import moment from 'moment';
import theme from '../../constants/theme';
import { IOptionsProps } from '../../screens/Profile/Profile';
import { ListItem } from 'react-native-elements';
import { OptionListItem } from '../ListItem';

export interface IEditOptionsValueModalProps {
  isVisible: boolean;
  isSaving: boolean;
  cancel: () => void;
  success: (updatedValue: string) => void;
  value: string | undefined;
  title: string;
  secure: boolean;
  isValid: (value: string) => boolean;

  options: IOptionsProps[];
}
const EditOptionsValueModal: FC<IEditOptionsValueModalProps> = ({
  isVisible,
  isSaving,
  cancel,
  success,
  value,
  title,
  secure,
  isValid,

  options,
}) => {
  const [modalValue, setModalValue] = useState('');

  useEffect(() => {
    setModalValue(value ? value.toString() : '');
  }, [value]);

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={cancel}>
        <Dialog.Title>{`Edit ${title}`}</Dialog.Title>
        <Dialog.ScrollArea style={{ maxHeight: 200 }}>
          {isSaving ? (
            <ActivityIndicator
              animating={true}
              style={{ height: 70 }}
              color={theme.dark.hex}
            />
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 24,
              }}
            >
              {options.map((o, index) => (
                <OptionListItem
                  key={index.toString()}
                  selected={modalValue === o.value}
                  title={o.name}
                  onPress={() => setModalValue(o.value)}
                />
              ))}
            </ScrollView>
          )}
        </Dialog.ScrollArea>

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
export default EditOptionsValueModal;
