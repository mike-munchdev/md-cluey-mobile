import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5, Entypo, FontAwesome } from '@expo/vector-icons';
import { useMutation } from '@apollo/react-hooks';
import theme from '../../constants/theme';
import { RoundedIconButton } from '../Buttons';

import styles from './styles';
import { Tooltip } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  updateCompanyResponseForUserError,
  updateCompanyResponseForUserCompleted,
  UPDATE_COMPANY_RESPONSE_FOR_USER,
  DELETE_COMPANY_RESPONSE,
  deleteCompanyResponseError,
  deleteCompanyResponseCompleted,
} from '../../graphql/queries/user';
import { AppContext } from '../../config/context';
import { ICompany, ICompanyReponse } from '../../interfaces';
import {
  StackActions,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import { MyLikesIcon } from '../Icons';

export interface IActionsViewProps {
  company?: ICompany;
}

const ActionsView: FC<IActionsViewProps> = ({ company }) => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);
  const routes = useNavigationState((state) => state.routes);
  const currentRouteIndex = useNavigationState((state) => state.index);
  const [isLoading, setIsLoading] = useState(false);
  const { companyResponse } = state;
  useEffect(() => {
    if (company) {
      const response = state.companyResponses.find(
        (r) => r.company.id === company.id
      );

      dispatch({ type: 'SET_COMPANY_RESPONSE', payload: response });
    }
  }, [company]);

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

  const updateResponse = async (
    response: string,
    companyResponse: ICompanyReponse | null | undefined
  ) => {
    setIsLoading(true);
    if (companyResponse?.response === response) {
      await deleteCompanyResponse({
        variables: {
          input: {
            responseId: companyResponse?.id,
          },
        },
      });
    } else {
      await updateCompanyResponseForUser({
        variables: {
          input: {
            responseId: companyResponse?.id,
            userId: state.user.id,
            companyId: company?.id,
            response,
          },
        },
      });
    }
  };

  const getAlternatives = () => {
    const lastRoute = routes[currentRouteIndex - 1];

    switch (lastRoute.name.toLowerCase()) {
      case 'companies':
        navigation.goBack();
        break;
      case 'search':
      case 'mylikes':
        navigation.navigate('ProductTypes', {
          company: company,
        });
        break;
      default:
        navigation.goBack();
        break;
    }
  };

  return (
    <View style={styles.likesContainer}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Tooltip
          width={300}
          height={150}
          containerStyle={styles.toolTipContainer}
          backgroundColor={theme.white.hex}
          closeOnlyOnBackdropPress={true}
          popover={
            <View
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'flex-start',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
              }}
            >
              <TouchableOpacity
                style={styles.likesButton}
                onPress={() => {
                  updateResponse('will-buy', companyResponse);
                }}
              >
                <FontAwesome5
                  name="laugh"
                  color={theme.dark.hex}
                  size={companyResponse?.response === 'will-buy' ? 34 : 22}
                />
                <Text
                  style={[
                    styles.likesInfoText,
                    companyResponse?.response === 'will-buy'
                      ? { fontFamily: 'MontserratBold' }
                      : { fontFamily: 'MontserratMedium' },
                  ]}
                >
                  Happy customer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.likesButton}
                onPress={() => {
                  updateResponse('will-buy-later', companyResponse);
                }}
              >
                <Entypo
                  name="emoji-happy"
                  color={theme.dark.hex}
                  size={
                    companyResponse?.response === 'will-buy-later' ? 30 : 22
                  }
                />
                <Text
                  style={[
                    styles.likesInfoText,
                    companyResponse?.response === 'will-buy-later'
                      ? { fontFamily: 'MontserratBold' }
                      : { fontFamily: 'MontserratMedium' },
                  ]}
                >
                  Going to start buying
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.likesButton}
                onPress={() => {
                  updateResponse('will-not-buy-later', companyResponse);
                }}
              >
                <Entypo
                  name="emoji-neutral"
                  color={theme.dark.hex}
                  size={
                    companyResponse?.response === 'will-not-buy-later' ? 30 : 22
                  }
                />
                <Text
                  style={[
                    styles.likesInfoText,
                    companyResponse?.response === 'will-not-buy-later'
                      ? { fontFamily: 'MontserratBold' }
                      : { fontFamily: 'MontserratMedium' },
                  ]}
                >
                  Should stop buying
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.likesButton}
                onPress={() => {
                  updateResponse('will-not-buy', companyResponse);
                }}
              >
                <Entypo
                  name="emoji-sad"
                  color={theme.dark.hex}
                  size={companyResponse?.response === 'will-not-buy' ? 30 : 22}
                />
                <Text
                  style={[
                    styles.likesInfoText,
                    companyResponse?.response === 'will-not-buy'
                      ? { fontFamily: 'MontserratBold' }
                      : { fontFamily: 'MontserratMedium' },
                  ]}
                >
                  Lost my business
                </Text>
              </TouchableOpacity>
            </View>
          }
        >
          <View style={styles.buttonView}>
            <View style={styles.iconView}>
              <MyLikesIcon
                response={companyResponse}
                size={36}
                color={theme.dark.hex}
              />
            </View>
            <Text style={styles.buttonText}>Likes/Dislikes</Text>
          </View>
        </Tooltip>
      </View>
      <RoundedIconButton
        onPress={() => navigation.dispatch(StackActions.popToTop())}
        backgroundColor={theme.white.hex}
        borderColor={theme.dark.hex}
        size={64}
        borderWidth={2}
        icon={<FontAwesome name="search" size={32} color={theme.dark.hex} />}
        textStyle={styles.buttonText}
        text="Search/Home"
      />
      <RoundedIconButton
        onPress={getAlternatives}
        backgroundColor={theme.white.hex}
        borderColor={theme.dark.hex}
        size={64}
        borderWidth={2}
        icon={
          <FontAwesome
            name="shopping-basket"
            size={32}
            color={theme.dark.hex}
          />
        }
        textStyle={styles.buttonText}
        text="Alternatives"
      />
    </View>
  );
};
export default ActionsView;
