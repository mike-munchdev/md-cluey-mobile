import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {
  MaterialIcons,
  FontAwesome5,
  Entypo,
  FontAwesome,
} from '@expo/vector-icons';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
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
import { ICompany, ICompanyReponse, IUser } from '../../interfaces';

export interface IActionsViewProps {
  company?: ICompany;
}

const ActionsView: FC<IActionsViewProps> = ({ company }) => {
  const { user, setUser } = useContext(AppContext);
  const [companyResponse, setCompanyResponse] = useState<
    ICompanyReponse | null | undefined
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (company) {
      console.log('user, user', user);
      console.log('user, company', company);
      const response = user?.companyResponses.find(
        (r) => r.company.id === company.id
      );

      setCompanyResponse(response);
    }
  }, [company]);

  useEffect(() => {
    console.log('ActionsView useEffect');
    if (companyResponse) {
      const responses = [
        ...user?.companyResponses.filter((r) => r.id !== companyResponse.id),
        companyResponse,
      ];
      user.companyResponses = responses;

      setUser(user);
    }
  }, [companyResponse, user]);

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
          containerStyle={{ backgroundColor: theme.opaque }}
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
                  color={theme.willBuy}
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
                  color={theme.willBuy}
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
                  updateResponse('will-not-buy');
                }}
              >
                <Entypo
                  name="emoji-neutral"
                  color={theme.willBuy}
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
                  Transition out of purchasing
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.likesButton}
                onPress={() => {
                  updateResponse('will-not-buy-later');
                }}
              >
                <Entypo
                  name="emoji-sad"
                  color={theme.willBuy}
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
                  Stopped purchasing
                </Text>
              </TouchableOpacity>
            </View>
          }
        >
          <View
            style={{
              width: 64,
              height: 64,
              backgroundColor: theme.white.hex,
              borderRadius: 32,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: theme.dark.hex,
              borderWidth: 2,
            }}
          >
            <MaterialIcons
              name="thumbs-up-down"
              size={36}
              color={theme.dark.hex}
            />
          </View>
        </Tooltip>
      </View>
      <RoundedIconButton
        onPress={() => alert('search by category')}
        backgroundColor={theme.white.hex}
        borderColor={theme.dark.hex}
        size={64}
        borderWidth={2}
        icon={
          <FontAwesome name="newspaper-o" size={32} color={theme.dark.hex} />
        }
        textStyle={{ fontSize: 14 }}
      />
      <RoundedIconButton
        onPress={() => alert('search by category')}
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
        textStyle={{ fontSize: 14 }}
      />
    </View>
  );
};
export default ActionsView;
