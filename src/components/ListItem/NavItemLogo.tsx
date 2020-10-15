import React, { useState, useEffect, FC } from 'react';
import { Avatar } from 'react-native-elements';
import { SvgUri } from 'react-native-svg';

import styles from './styles';

export interface INavItemLogoProps {
  logoUri: string;
  rounded: boolean;
}

const NavItemLogo: FC<INavItemLogoProps> = ({ logoUri, rounded }) => {
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
      rounded={rounded}
      avatarStyle={rounded ? { width: '100%' } : { resizeMode: 'center' }}
      source={{
        uri: logoUri,
      }}
    />
  );
};
export default NavItemLogo;
