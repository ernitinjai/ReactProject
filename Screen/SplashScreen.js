/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hooks we needed
import React, { useState, useEffect, Fragment  } from 'react';

//Import all required component
import { ActivityIndicator, View, StyleSheet, Image ,SafeAreaView, ScrollView, Text, StatusBar, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import colors from './common/colors';

const SplashScreen = props => {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user_id').then((value) => {
        global.user_id = value
        AsyncStorage.getItem('username').then(value => global.username = value);
        AsyncStorage.getItem('firstname').then(value => global.firstname = value);
        AsyncStorage.getItem('lastname').then(value => global.lastname = value);
        AsyncStorage.getItem('mobile').then(value => global.mobile = value);
        AsyncStorage.getItem('email').then(value => global.email = value);

        props.navigation.navigate(
          value === null ? 'Auth' : 'MainScreen'
        )
      });
    }, 3000);
  }, []);

  /*let pushData = [
    {
      title: "First push",
      message: "First push message"
    },
    {
      title: "Second push",
      message: "Second push message"
    }
  ]*/
  

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