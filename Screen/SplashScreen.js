/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hooks we needed
import React, { useState, useEffect } from 'react';

//Import all required component
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import colors from './common/colors';

const SplashScreen = props => {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      /*AsyncStorage.setItem('user_id', first.data.id);
          AsyncStorage.setItem('username', first.data.username);
          AsyncStorage.setItem('mobile', first.data.mobile);
          AsyncStorage.setItem('firstname', first.data.firstname);*/

      AsyncStorage.getItem('user_id').then((value) => {
        global.user_id = value
        AsyncStorage.getItem('username').then(value =>global.username = value);
        AsyncStorage.getItem('firstname').then(value =>global.firstname = value);
        AsyncStorage.getItem('lastname').then(value =>global.lastname = value);
        AsyncStorage.getItem('mobile').then(value =>global.mobile = value);

        props.navigation.navigate(
          value === null ? 'Auth' : 'DrawerNavigationRoutes'
        )
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/logo.png')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color={colors.APP_YELLOW}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});