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
} from '../../graphql/queries/user/user';
import { AppContext } from '../../config/context';
import { ICompany, ICompanyReponse } from '../../interfaces';
import { StackActions, useNavigation } from '@react-navigation/native';

export interface IActionsViewProps {
  company?: ICompany;
}

const ActionsView: FC<IActionsViewProps> = ({ company }) => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AppContext);
  const [companyResponse, setCompanyResponse] = useState<
    ICompanyReponse | null | undefined
  >(null);
  const [, setIsLoading] = useState(false);

  useEffect(() => {
    if (company) {
      const response = user?.companyResponses.find(
        (r) => r.companyId === company.id
      );

      setCompanyResponse(response);
    }
  }, [company]);

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

  // useEffect(() => {
  //   // console.log('ActionsView: user changed', user);
  //   // const getUserCompanyResponse = user?.companyResponses.find(
  //   //   (r) => r.id === companyResponse?.id
  //   // );
  //   // if (getUserCompanyResponse) {
  //   //   console.log('getUserCompanyResponse', getUserCompanyResponse);
  //   //   setCompanyResponse(getUserCompanyResponse);
  //   // }
  // }, [user]);

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

  const updateResponse = (response: string) => {
    updateCompanyResponseForUser({
      variables: {
        input: {
          userId: user?.id,
          companyId: company?.id,
          response,
        },
      },
    });
  };

  return (
    <View style={styles.likesContainer}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Tooltip
          width={300}
          height={150}
          containerStyle={styles.toolTipContainer}
          backgroundColor={theme.opaque}
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
                  updateResponse('will-buy');
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
                  Pleased with purchasing
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.likesButton}
                onPress={() => {
                  updateResponse('will-buy-later');
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
                  Transition to purchasing
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.likesButton}
                onPress={() => {
                  updateResponse('will-not-buy-later');
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
                  Transition out of purchasing
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.likesButton}
                onPress={() => {
                  updateResponse('will-not-buy');
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
                  Stopped purchasing
                </Text>
              </TouchableOpacity>
            </View>
          }
        >
          <View style={styles.buttonView}>
            <View style={styles.iconView}>
              <FontAwesome5 name="smile" size={36} color={theme.dark.hex} />
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
        onPress={() =>
          navigation.navigate('ProductTypes', {
            productTypes: company?.productTypes,
          })
        }
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
