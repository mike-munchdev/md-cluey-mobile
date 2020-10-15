import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { StandardContainer } from '../../components/Containers';
import { NavHeader } from '../../components/Headers';
import NavigationHeader from '../../components/Headers/NavigationHeader';
import { LogoText } from '../../components/Text';
import theme from '../../constants/theme';

import styles from './styles';

const Home = () => {
  const navigation = useNavigation();
  return (
    <StandardContainer isLoading={false}>
      <View style={styles.overlayContainer}>
        <NavHeader showMenu />
        <View style={styles.linksContainer}>
          <View style={styles.topViewContainer}>
            <Avatar
              size="xlarge"
              rounded
              icon={{
                name: 'search',
                type: 'font-awesome',
                color: theme.dark.hex,
              }}
              onPress={() => navigation.navigate('Search')}
              overlayContainerStyle={{ backgroundColor: 'white' }}
              activeOpacity={0.7}
            />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Search by Name</Text>
            </View>
          </View>
          <View style={styles.bottomViewContainer}>
            <Avatar
              size="xlarge"
              rounded
              icon={{
                name: 'shop',
                type: 'entypo',
                color: theme.dark.hex,
              }}
              onPress={() => navigation.navigate('Categories')}
              overlayContainerStyle={{ backgroundColor: 'white' }}
              activeOpacity={0.7}
            />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Search by Category</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <LogoText animation="fadeIn" textStyle={styles.logoText} />
          </View>
        </View>
      </View>
    </StandardContainer>
  );
};
export default Home;
