import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SvgUri } from 'react-native-svg';

import styles from './styles';

export interface INavItemLogoProps {
  logoUri: string;
}

const NavItemLogo: FC<INavItemLogoProps> = ({ logoUri }) => {
  const [extension, setExtension] = useState<string>('');

  useEffect(() => {
    const extension = logoUri?.slice(logoUri?.lastIndexOf('.') + 1);

    setExtension(extension);
  }, [logoUri]);

  if (!logoUri) return <Avatar></Avatar>;

  return extension === 'svg' ? (
    <Avatar>
      <SvgUri width="100%" height="100%" uri={logoUri} />
    </Avatar>
  ) : (
    <Avatar
      avatarStyle={{ resizeMode: 'contain', width: '100%' }}
      source={{
        uri: logoUri,
      }}
    />
  );
};
export default NavItemLogo;
