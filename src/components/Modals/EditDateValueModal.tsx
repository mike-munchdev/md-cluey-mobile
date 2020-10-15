import React, { useState, useEffect, FC } from 'react';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import theme from '../../constants/theme';
import { isDate } from 'lodash';

export interface IEditDateValueModalProps {
  isVisible: boolean;
  isSaving: boolean;
  cancel: () => void;
  success: (updatedValue: Date | undefined) => void;
  value: Date | undefined | null;
  title: string;
  secure: boolean;
  isValid: (value: Date | undefined | null) => boolean;
  captionText?: string[];
  placeholder: string;
}
const EditDateValueModal: FC<IEditDateValueModalProps> = ({
  isVisible,
  isSaving,
  cancel,
  success,
  title,
  secure,
  isValid,
  captionText,
  value,
}) => {
  const [modalValue, setModalValue] = useState<Date | undefined>();

  useEffect(() => {
    if (isDate(value)) {
      setModalValue(new Date(value));
    }
  }, [value]);

  const onChange = (event: Event, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || modalValue;
    setModalValue(currentDate);
  };

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
            <DateTimePicker
              testID="dateTimePicker"
              value={modalValue || new Date()}
              mode={'date'}
              is24Hour={false}
              display="default"
              onChange={onChange}
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
export default EditDateValueModal;
