import React, { FC } from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

import theme from '../../constants/theme';

export interface IOptionListItemProps {
  title: string;
  subTitle?: string;
  onPress: Function;
  selected: boolean;
}

const OptionListItem: FC<IOptionListItemProps> = ({
  title,
  subTitle,
  onPress,
  selected,
}) => {
  return (
    <ListItem
      onPress={() => onPress()}
      bottomDivider
      style={{
        marginBottom: 5,

        width: '100%',
      }}
    >
      {selected ? <FontAwesome5 name="check" color={theme.googleBlue} /> : null}
      <ListItem.Content>
        <ListItem.Title>
          <Text
            style={{
              fontFamily: 'MontserratMedium',
              fontSize: 18,
            }}
          >
            {title}
          </Text>
        </ListItem.Title>
        {subTitle && <ListItem.Subtitle>{subTitle}</ListItem.Subtitle>}
      </ListItem.Content>
    </ListItem>
  );
};

export default OptionListItem;
