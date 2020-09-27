import React, { FC, useContext, useState } from 'react';
import { View } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
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
import { ICompany } from '../../interfaces';

export interface IActionsViewProps {
  company?: ICompany;
}

const ActionsView: FC<IActionsViewProps> = ({ company }) => {
  const { user } = useContext(AppContext);
  const [companyResponse, setCompanyResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
          width={200}
          height={50}
          containerStyle={{ backgroundColor: theme.opaque }}
          backgroundColor={theme.opaque}
          closeOnlyOnBackdropPress={true}
          popover={
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  updateResponse('will-buy');
                }}
              >
                <FontAwesome name="thumbs-up" color={theme.willBuy} size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  updateResponse('will-buy-later');
                }}
              >
                <FontAwesome
                  name="thumbs-up"
                  color={theme.willBuyLater}
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  updateResponse('will-not-buy');
                }}
              >
                <FontAwesome
                  name="thumbs-down"
                  color={theme.willNotBuy}
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  updateResponse('will-not-buy-later');
                }}
              >
                <FontAwesome
                  name="thumbs-down"
                  color={theme.willNotBuyLater}
                  size={24}
                />
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
