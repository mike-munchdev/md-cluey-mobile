import React, { useState, useEffect, FC, useContext } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './styles';
import theme from '../../constants/theme';

export interface ISplashProps {
  finishLoading?: Function;
  user?: any;
}
const AnimatedIcon = Animatable.createAnimatableComponent(Entypo);
const Splash: FC<ISplashProps> = ({ finishLoading }) => {
  return (
    <Animatable.View style={styles.container}>
      {/* <Image
        source={require('../../../assets/logo2.png')}
        style={{
          width: 0,
          height: 0,
        }}
        resizeMode="cover"
      /> */}
      <View style={{ flexDirection: 'row' }}>
        <AnimatedIcon
          animation="slideInRight"
          iterationCount={3}
          direction="alternate"
          name="magnifying-glass"
          size={96}
          color={theme.text}
          style={{ marginTop: -10 }}
          onAnimationEnd={() => finishLoading()}
        />

        <Animatable.Text
          style={{
            fontFamily: 'CoinyRegular',
            fontSize: 72,
            color: theme.text,
            marginLeft: -100,
          }}
        >
          Cluey
        </Animatable.Text>
      </View>
    </Animatable.View>
  );
};
export default Splash;
