import React, { FC } from 'react';
import { Entypo } from '@expo/vector-icons';
import { View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './styles';
import theme from '../../constants/theme';
import { LogoText } from '../../components/Text';

export interface ISplashProps {
  finishLoading?: Function;
  user?: any;
}
const AnimatedIcon = Animatable.createAnimatableComponent(Entypo);
const windowHeight = Dimensions.get('window').height;
const slideIn = {
  from: {
    left: 50,
  },
  to: {
    left: 200,
  },
};
const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};
const Splash: FC<ISplashProps> = ({ finishLoading }) => {
  return (
    <Animatable.View style={styles.container}>
      <AnimatedIcon
        animation={slideIn}
        iterationCount={1}
        direction="alternate"
        name="magnifying-glass"
        size={108}
        color={theme.text}
        style={{
          position: 'absolute',
          top: windowHeight / 2 - 70,
        }}
        onAnimationEnd={() => finishLoading()}
      />
      <View style={{ marginHorizontal: 50 }}>
        <LogoText animation={fadeIn} />
      </View>
    </Animatable.View>
  );
};
export default Splash;
