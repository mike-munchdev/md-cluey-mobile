import React, { useState, useEffect, FC } from 'react';
import { Dimensions, Text, View } from 'react-native';
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
  imageErrored?: boolean;
  setImageErrored: (value: boolean) => void;
}
const { height } = Dimensions.get('screen');

const IMAGE_HEIGHT = height * 0.1;

const IMAGE_WIDTH = 150;

const CompanyLogo: FC<ICompanyLogoProps> = ({
  logoUri,
  text,
  imageErrored,
  setImageErrored,
}) => {
  const [extension, setExtension] = useState<string | undefined>('');

  useEffect(() => {
    const extension = logoUri?.slice(logoUri?.lastIndexOf('.') + 1);
    setExtension(extension);
  }, [logoUri]);

  if (!logoUri || imageErrored)
    return (
      <View
        style={{
          width: '90%',
          height: IMAGE_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.companyNameText}>{text}</Text>
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
      onError={() => {
        setImageErrored(true);
      }}
    />
  );
};
export default CompanyLogo;
