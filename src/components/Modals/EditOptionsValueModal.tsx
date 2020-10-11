import React, { useState, useEffect, FC, useCallback } from 'react';
import { FlatList, Text } from 'react-native';
import { ActivityIndicator, Button, Dialog, Portal } from 'react-native-paper';

import theme from '../../constants/theme';
import { IOptionsProps } from '../../screens/Profile/Profile';
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
  emptyText?: string;
  options: IOptionsProps[];
}
const EditOptionsValueModal: FC<IEditOptionsValueModalProps> = ({
  isVisible,
  isSaving,
  cancel,
  success,
  value,
  title,
  isValid,
  options,
  emptyText,
}) => {
  const [modalValue, setModalValue] = useState('');

  const flatListRef = useCallback(
    (node) => {
      if (node !== null) {
        if (isVisible) {
          const selectedIndex = options.findIndex((o) => o.value === value);

          if (selectedIndex >= 0) {
            node.scrollToIndex({
              animated: false,
              index: selectedIndex,
            });
          }
        }
      }
    },
    [value]
  );
  const getItemLayout = (data, index: number) => {
    return {
      length: 51,
      offset: 51 * index,
      index,
    };
  };

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
            <FlatList
              ref={flatListRef}
              style={{}}
              getItemLayout={getItemLayout}
              data={options}
              renderItem={({ item, index }) => {
                return (
                  <OptionListItem
                    selected={modalValue === item.value}
                    title={item.name}
                    onPress={() => setModalValue(item.value)}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={<Text>{emptyText}</Text>}
            />
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
