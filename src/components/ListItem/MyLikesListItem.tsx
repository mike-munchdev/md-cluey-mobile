import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import theme from '../../constants/theme';
import { useMutation } from '@apollo/react-hooks';
import {
  deleteCompanyResponseCompleted,
  deleteCompanyResponseError,
  DELETE_COMPANY_RESPONSE,
  updateCompanyResponseForUserCompleted,
  updateCompanyResponseForUserError,
  UPDATE_COMPANY_RESPONSE_FOR_USER,
} from '../../graphql/queries/user';
import { AppContext } from '../../config/context';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ICompanyReponse } from '../../interfaces';

export interface IMyLikesListItemProps {
  item: any;
}

const MyLikesListItem: FC<IMyLikesListItemProps> = ({ item }) => {
  const { state, dispatch } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (item) {
  //     const responses = [
  //       ...state.companyResponses.filter((r) => r.id !== item.id),
  //       companyResponse,
  //     ];

  //     dispatch({ type: 'UPDATE_USER_COMPANY_RESPONSES', payload: responses });
  //   }
  // }, [companyResponse]);

  const [updateCompanyResponseForUser] = useMutation(
    UPDATE_COMPANY_RESPONSE_FOR_USER,
    {
      onError: updateCompanyResponseForUserError(
        dispatch,
        state.alertVisible,
        setIsLoading
      ),
      onCompleted: updateCompanyResponseForUserCompleted(
        dispatch,
        setIsLoading
      ),
    }
  );

  const [deleteCompanyResponse] = useMutation(DELETE_COMPANY_RESPONSE, {
    onError: deleteCompanyResponseError(
      dispatch,
      state.alertVisible,
      setIsLoading
    ),
    onCompleted: deleteCompanyResponseCompleted(dispatch, setIsLoading),
  });

  const updateResponse = async (response: string, item: ICompanyReponse) => {
    setIsLoading(true);
    if (item.response === response) {
      await deleteCompanyResponse({
        variables: {
          input: {
            responseId: item.id,
          },
        },
      });
    } else {
      await updateCompanyResponseForUser({
        variables: {
          input: {
            responseId: item.id,
            response,
          },
        },
      });
    }
  };

  return (
    <ListItem
      onPress={() => navigation.navigate('Company', { company: item.company })}
      key={item.id}
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
            {item.company.name}
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
            name="emoji-sad"
            type="entypo"
            size={item.response === 'will-not-buy' ? 30 : 22}
            color={theme.dark.hex}
            onPress={() => updateResponse('will-not-buy', item)}
          />
          <ListItem.Chevron
            style={{ marginHorizontal: 7 }}
            name="emoji-neutral"
            type="entypo"
            size={item.response === 'will-not-buy-later' ? 30 : 22}
            color={theme.dark.hex}
            onPress={() => updateResponse('will-not-buy-later', item)}
          />

          <ListItem.Chevron
            style={{ marginHorizontal: 7 }}
            name="emoji-happy"
            type="entypo"
            size={item.response === 'will-buy-later' ? 30 : 22}
            color={theme.dark.hex}
            onPress={() => updateResponse('will-buy-later', item)}
          />
          <ListItem.Chevron
            style={{ marginHorizontal: 7 }}
            name="laugh"
            type="font-awesome-5"
            size={item.response === 'will-buy' ? 34 : 22}
            color={theme.dark.hex}
            onPress={() => updateResponse('will-buy', item)}
          />
        </Fragment>
      )}
    </ListItem>
  );
};

export default MyLikesListItem;
