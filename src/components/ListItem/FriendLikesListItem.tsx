import React, { FC, Fragment, useState } from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import theme from '../../constants/theme';

import { ActivityIndicator } from 'react-native-paper';

export interface IFriendLikesListItemProps {
  item: any;
  title: string;
}

const FriendLikesListItem: FC<IFriendLikesListItemProps> = ({ item }) => {
  const [companyResponse] = useState(item);
  const [isLoading] = useState(false);

  const getIconName = (response: string) => {
    switch (response) {
      case 'will-buy':
        return 'laugh';

      case 'will-buy-later':
        return 'emoji-happy';

      case 'will-not-buy-later':
        return 'emoji-neutral';

      case 'will-not-buy':
        return 'emoji-sad';

      default:
        return 'emoji-happy';
    }
  };

  return (
    <ListItem
      key={companyResponse.id}
      bottomDivider
      style={{
        marginBottom: 5,
        backgroundColor: theme.light,
        width: '100%',
      }}
    >
      <ListItem.Content>
        <ListItem.Title>
          <Text
            style={{
              fontFamily: 'MontserratMedium',
              fontSize: 18,
              color: theme.dark.hex,
            }}
          >
            {companyResponse.company.name}
          </Text>
        </ListItem.Title>
      </ListItem.Content>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={theme.dark.hex}
          style={{ flex: 1 }}
          size={34}
        />
      ) : (
        <Fragment>
          <ListItem.Chevron
            style={{ marginHorizontal: 7 }}
            name={getIconName(companyResponse.response)}
            type={
              companyResponse.response === 'will-buy'
                ? 'font-awesome-5'
                : 'entypo'
            }
            size={companyResponse.response === 'will-buy' ? 34 : 30}
            color={theme.dark.hex}
          />
        </Fragment>
      )}
    </ListItem>
  );
};

export default FriendLikesListItem;
