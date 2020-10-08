import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SvgUri } from 'react-native-svg';
import Constants from 'expo-constants';
import { Image } from 'react-native-elements';

import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';
import theme from '../../constants/theme';
import { NODE_ENV } from '../../hooks/serverInfo';

export interface ICompanyLogoProps {
  logoUri: string | undefined;
  text?: string;
}

const CompanyLogo: FC<ICompanyLogoProps> = ({ logoUri, text }) => {
  const [extension, setExtension] = useState<string | undefined>('');
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const extension = logoUri?.slice(logoUri?.lastIndexOf('.') + 1);
    console.log(
      'logoUri',
      `${
        Constants.manifest.extra.appVariables[String(NODE_ENV)]
          .brandLogoUrlPrefix
      }${logoUri}`
    );
    setExtension(extension);
  }, [logoUri]);

  if (!logoUri || imageError)
    return (
      <View>
        <Text adjustsFontSizeToFit={true} style={styles.companyNameText}>
          {text}
        </Text>
      </View>
    );

  if (extension === 'svg')
    return <SvgUri width="100%" height="100%" uri={logoUri} />;

  return (
    <Image
      source={{
        uri: `${
          Constants.manifest.extra.appVariables[String(NODE_ENV)]
            .brandLogoUrlPrefix
        }${logoUri}`,
      }}
      style={{
        width: 150,
        height: 150,
        resizeMode: 'contain',
      }}
      PlaceholderContent={
        <ActivityIndicator color={theme.dark.hex} size="large" />
      }
      onError={(error) => {
        setImageError(true);
      }}
    />
  );
};
export default CompanyLogo;
