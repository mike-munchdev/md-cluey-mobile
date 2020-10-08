import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from '../../constants/theme';
import { useMutation } from '@apollo/react-hooks';
import {
  updateCompanyResponseForUserCompleted,
  updateCompanyResponseForUserError,
  UPDATE_COMPANY_RESPONSE_FOR_USER,
} from '../../graphql/queries/user/user';
import { AppContext } from '../../config/context';
import { ActivityIndicator } from 'react-native-paper';

export interface IMyLikesListItemProps {
  item: any;
  title: string;
}

const MyLikesListItem: FC<IMyLikesListItemProps> = ({ item, title }) => {
  const { user, setUser } = useContext(AppContext);
  const navigation = useNavigation();
  const [companyResponse, setCompanyResponse] = useState(item);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (companyResponse) {
      const responses = [
        ...user?.companyResponses.filter((r) => r.id !== companyResponse.id),
        companyResponse,
      ];
      const updatedUser = { ...user };
      updatedUser.companyResponses = responses;

      setUser(updatedUser);
    }
  }, [companyResponse]);

  useEffect(() => {
    // console.log('MyLikesListItem: user changed', user);
    // const getUserCompanyResponse = user?.companyResponses.find(
    //   (r) => r.id === companyResponse?.id
    // );
    // if (getUserCompanyResponse) {
    //   console.log('getUserCompanyResponse', getUserCompanyResponse);
    //   setCompanyResponse(getUserCompanyResponse);
    // }
  }, [user]);

  const [updateCompanyResponseForUser] = useMutation(
    UPDATE_COMPANY_RESPONSE_FOR_USER,
    {
      onError: updateCompanyResponseForUserError(
        setCompanyResponse,
        setIsLoading
      ),
      onCompleted: updateCompanyResponseForUserCompleted(
        setCompanyResponse,
        setIsLoading
      ),
    }
  );

  const updateResponse = (response: string, companyId: string) => {
    setIsLoading(true);
    updateCompanyResponseForUser({
      variables: {
        input: {
          userId: user?.id,
          companyId,
          response,
        },
      },
    });
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
            }}
          >
            {title}
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
            name="laugh"
            type="font-awesome-5"
            size={companyResponse.response === 'will-buy' ? 34 : 22}
            color={theme.successText}
            onPress={() =>
              updateResponse('will-buy', companyResponse.company.id)
            }
          />
          <ListItem.Chevron
            style={{ marginHorizontal: 7 }}
            name="emoji-happy"
            type="entypo"
            size={companyResponse.response === 'will-buy-later' ? 30 : 22}
            color={theme.successText}
            onPress={() =>
              updateResponse('will-buy-later', companyResponse.company.id)
            }
          />
          <ListItem.Chevron
            style={{ marginHorizontal: 7 }}
            name="emoji-neutral"
            type="entypo"
            size={companyResponse.response === 'will-not-buy-later' ? 30 : 22}
            color={theme.successText}
            onPress={() =>
              updateResponse('will-not-buy-later', companyResponse.company.id)
            }
          />
          <ListItem.Chevron
            style={{ marginHorizontal: 7 }}
            name="emoji-sad"
            type="entypo"
            size={companyResponse.response === 'will-not-buy' ? 30 : 22}
            color={theme.successText}
            onPress={() =>
              updateResponse('will-not-buy', companyResponse.company.id)
            }
          />
        </Fragment>
      )}
    </ListItem>
  );
};

export default MyLikesListItem;
