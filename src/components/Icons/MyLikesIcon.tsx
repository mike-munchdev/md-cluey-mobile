import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { ICompanyReponse } from '../../interfaces';

import styles from './styles';
import theme from '../../constants/theme';
export interface IMyLikesIconProps {
  response: ICompanyReponse | null | undefined;
  size?: number | undefined;
  color?: string | undefined;
}

const MyLikesIcon: FC<IMyLikesIconProps> = ({ response, size, color }) => {
  const [iconName, setIconName] = useState<string>('emoji-happy');

  useEffect(() => {
    switch (response?.response) {
      case 'will-buy':
        break;
      case 'will-buy-later':
        setIconName('emoji-happy');
        break;
      case 'will-not-buy-later':
        setIconName('emoji-neutral');
        break;
      case 'will-not-buy':
        setIconName('emoji-sad');
        break;
      default:
        setIconName('emoji-happy');
        break;
    }
  }, [response]);

  if (!iconName) return null;
  return response?.response === 'will-buy' ? (
    <FontAwesome5
      name={'laugh'}
      size={size || 36}
      color={color || theme.dark.hex}
    />
  ) : (
    <Entypo name={iconName} size={size || 36} color={color || theme.dark.hex} />
  );
};
export default MyLikesIcon;
