import React, { useState, useEffect, FC } from 'react';
import { Dimensions, Text, View } from 'react-native';
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
const { height } = Dimensions.get('screen');
console.log('height', height);
const IMAGE_HEIGHT = height * 0.1;
console.log('IMAGE_HEIGHT', IMAGE_HEIGHT);
const IMAGE_WIDTH = 150;

const CompanyLogo: FC<ICompanyLogoProps> = ({ logoUri, text }) => {
  const [extension, setExtension] = useState<string | undefined>('');
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const extension = logoUri?.slice(logoUri?.lastIndexOf('.') + 1);
    setExtension(extension);
  }, [logoUri]);

  if (!logoUri || imageError)
    return (
      <View
        style={{
          width: '90%',
          height: IMAGE_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
        }}
      >
        <Text adjustsFontSizeToFit={true} style={styles.companyNameText}>
          {text}
        </Text>
      </View>
    );

  if (extension === 'svg')
    return <SvgUri width={IMAGE_WIDTH} height={IMAGE_HEIGHT} uri={logoUri} />;

  return (
    <Image
      source={{
        uri: `${
          Constants.manifest.extra.appVariables[String(NODE_ENV)]
            .brandLogoUrlPrefix
        }${logoUri}`,
      }}
      style={{
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
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
