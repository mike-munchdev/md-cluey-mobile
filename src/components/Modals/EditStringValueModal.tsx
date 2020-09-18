import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';
import {
  Button,
  Card,
  Modal,
  Paragraph,
  Portal,
  TextInput,
  Title,
} from 'react-native-paper';
import theme from '../../constants/theme';
import { AnimatableTextInput } from '../TextInput';

import styles from './styles';
export interface IEditStringValueModalProps {
  isVisible: boolean;
  hideModal: (() => void) | undefined;
  value: string;
  title: string;
}
const EditStringValueModal: FC<IEditStringValueModalProps> = ({
  isVisible,
  hideModal,
  value,
  title,
}) => {
  const [modalValue, setModalValue] = useState(value);
  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={hideModal}>
        <Card style={{ marginHorizontal: 10 }}>
          <Card.Title title={`Edit ${title}`} />
          <Card.Content>
            <TextInput
              mode="outlined"
              left={
                <TextInput.Icon
                  name="pencil"
                  color={theme.dark.hex}
                  size={20}
                />
              }
              theme={{ colors: { primary: theme.dark.hex } }}
              placeholderTextColor={theme.text}
              placeholder={title}
              autoCapitalize="none"
              value={modalValue}
              underlineColorAndroid={theme.text}
              onChangeText={(v) => setModalValue(v)}
            />
          </Card.Content>
          <Card.Actions>
            <Button onPress={hideModal} color={theme.dark.hex}>
              Cancel
            </Button>
            <Button onPress={hideModal} color={theme.dark.hex}>
              Ok
            </Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};
export default EditStringValueModal;
