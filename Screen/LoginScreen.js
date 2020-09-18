/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState,useEffect } from 'react';

import { SliderBox } from "react-native-image-slider-box";

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/loader';
//import auth from '@react-native-firebase/auth';
import colors from './common/colors';

const LoginScreen = props => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  state = {
    images: [
      require("../Images/promo1.png"),
      require("../Images/promo2.png"),
      require("../Images/promo3.png"),
      require("../Images/promo4.png"),
      require("../Images/promo5.png"),
      require('../Images/logo.png'),
    ]
  };

  const _signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const {accessToken, idToken} = await GoogleSignin.signIn();
    setloggedIn(true);
    const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
    await auth().signInWithCredential(credential);
    setloggedIn(true);
    
    _getCurrentUserInfo();
    props.navigation.navigate('DrawerNavigationRoutes');
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      alert('Cancel');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      alert('Signin in progress');
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      alert('PLAY_SERVICES_NOT_AVAILABLE');
      // play services not available or outdated
    } else {
      // some other error happened
      console.log(error);
      alert('some other error happened '+error);
    }
  }
};

_getCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    console.log('User Info --> ', userInfo);
    setState({ userInfo: userInfo });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      alert('User has not signed in yet');
      console.log('User has not signed in yet');
    } else {
      alert("Something went wrong. Unable to get user's info");
      console.log("Something went wrong. Unable to get user's info");
    }
  }
};

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '784687718989-627cmsrdfvr47jbv03g0981qgci839qc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      //iosClientId:'784687718989-l2vkljud95au545isl425uqhcj4tc3cp.apps.googleusercontent.com'
    });
  }, []);
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    var dataToSend = { login: userEmail, password: userPassword };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://esunscope.org/cms/api/user/index_post', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }).then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched

        const first = responseJson;
        console.log("here is all == "+first);
        if(first.message ==='Successfull' )
        {
          console.log(first.data.id);
          AsyncStorage.setItem('user_id', first.data.id);
          AsyncStorage.setItem('username', first.data.username);
          AsyncStorage.setItem('mobile', first.data.mobile);
          AsyncStorage.setItem('firstname', first.data.firstname);
          AsyncStorage.setItem('lastname', first.data.lastname);
          props.navigation.navigate('DrawerNavigationRoutes');
          
        }else{
          
          setErrortext('Please check your email id or password');
          console.log('Please check your email id or password');
        }

        
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 0 }}>
          <KeyboardAvoidingView enabled>
          <View style={styles.container}>
        <SliderBox
          images={state.images}
          autoplay
          marginTop={20}
          sliderBoxHeight={400}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
        />
      </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                //underlineColorAndroid="#FFFFFF"
                placeholder="Enter Username" //dummy@abc.com
                placeholderTextColor={colors.LIGHT_GREY_FONT}
                keyboardType="email-address"
                ref={ref => {
                  _emailinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  _passwordinput && _passwordinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                //underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password" //12345
                placeholderTextColor={colors.LIGHT_GREY_FONT}
                keyboardType="default"
                autoCompleteType='password'
                ref={ref => {
                  _passwordinput = ref;
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.SpacerStyle}>
            <Text
              style={styles.optionTextStyle}
              onPress={() => props.navigation.navigate('ForgotPassword')}>
              Forgot Password
            </Text>
            <Text
              style={styles.optionTextStyle}
              onPress={() => props.navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
            </View>
            <Text
            style={styles.orTextStyle}
              >
              --------OR---------    
            </Text>
            
            <View style={styles.googlebuttonStyle}>
              {
                <GoogleSigninButton
            
                  color={GoogleSigninButton.Color.Dark}
                  onPress={_signIn}
                />
              }
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};



export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  SpacerStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: colors.APP_YELLOW,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  googlebuttonStyle: {
    borderWidth: 0,
    color: '#FFFFFF',
    height: 48,
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: colors.WHITE,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight:'bold'
  },
  inputStyle: {
    flex: 1,
    color: colors.LIGHT_GREY_FONT,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    fontSize:18,
    backgroundColor: colors.WHITE,
    borderColor: colors.BOARDER,
  },
  registerTextStyle: {
    color: colors.BLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  optionTextStyle: {
    flex: 1,
    color: colors.BLACK,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },

  orTextStyle: {
    color: colors.LIGHT_GREY_FONT,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop:5,
    paddingBottom:5,
    fontSize: 14,
  },

  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});