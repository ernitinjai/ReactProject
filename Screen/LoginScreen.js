/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState, useEffect } from 'react';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-ionicons'

import { SliderBox } from "react-native-image-slider-box";
import { LoginButton, AccessToken } from 'react-native-fbsdk';

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
  Dimensions,

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

  //const [loggedIn, setloggedIn] = useState(false);
  //const [userInfo, setuserInfo] = useState([]);

  state = {
    images: [
      //require("../Images/promo1.png"),
      //require("../Images/promo2.png"),
      //require("../Images/promo3.png"),
      //require("../Images/promo4.png"),
      //require("../Images/promo5.png"),
      require('../Images/logo.png'),
    ]
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      setloggedIn(true);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);
      setloggedIn(true);

      _getCurrentUserInfo();
      
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
        alert('some other error happened ' + error);
      }
    }
  };

  _getCurrentUserInfo = async () => {

    try {
      const userInfo = await GoogleSignin.signInSilently();
      //const userJson = JSON.stringify(userInfo);
      console.log('User email --> ', userInfo.user.email);
      console.log('User name --> ', userInfo.user.familyName);
      /*"user":{"givenName":"dev ","email":"devadmin@esunscope.com","id":"110071425322571876304",
      "familyName":"admin",
      "photo":"https://lh4.googleusercontent.com/-COTLIknSZY4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmyDQECzihaCffUDH6zP0WrA91_aw/s120/photo.jpg","name":"dev admin"}
      */
     global.firstname = userInfo.user.familyName
    
    global.email  = userInfo.user.email
    global.username= userInfo.user.givenName
      //setuserInfo({ userInfo: userInfo });
      handleSocialRegistration("google");
      //props.navigation.navigate('DrawerNavigationRoutes');
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
        '784687718989-vrb197k7ha70cckjgrg3c0h6o4dhgof8.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      iosClientId:'784687718989-l2vkljud95au545isl425uqhcj4tc3cp.apps.googleusercontent.com',
      androidClientId:'784687718989-vrb197k7ha70cckjgrg3c0h6o4dhgof8.apps.googleusercontent.com'
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

  const handleSocialRegistration = (provider) => {

    setErrortext(''); 
   
    
    //Show Loader
    setLoading(true);

     var dataToSend = {
      username: global.username,
      firstname: global.firstname,
      //email: global.email,
      providers:provider
    };

    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(formBody);
    fetch('http://esunscope.org/cms/api/user/index_post', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        //alert("responseJson "+responseJson);
        if (responseJson.status == "success") {
          
          AsyncStorage.setItem('user_id', responseJson[0].data.user_id);
          AsyncStorage.setItem('username', responseJson[0].data.username);
          AsyncStorage.setItem('mobile', responseJson[0].data.mobile);
          AsyncStorage.setItem('firstname', responseJson[0].data.firstname);
          AsyncStorage.setItem('lastname', responseJson[0].data.lastname);
          AsyncStorage.setItem('email', responseJson[0].data.email);
          global.user_id = responseJson[0].data.user_id;  
          global.username = responseJson[0].data.username;
          global.firstname = responseJson[0].data.firstname;
          global.lastname = responseJson[0].data.lastname;
          global.mobile = responseJson[0].data.mobile;
          global.email=responseJson[0].data.email;
          console.log('Registration Successful. Please Login to proceed');
          //setIsRegistraionSuccess(true);
           props.navigation.navigate('MainScreen');
        } else {
          //setIsRegistraionSuccess(false);
          //alert("" + JSON.stringify(responseJson));
          alert(responseJson.message)
          setErrortext('Login Unsuccessful '+responseJson.message);
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        alert("" + JSON.stringify(responseJson));
        //console.error("error ${error}");
      });
  };

  function initUser(token) {
  //alert("initUser");
  fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
  .then((response) => response.json())
  .then((json) => {
    // Some user object has been set up somewhere, build that user here
    global.firstname = json.name
    //user.id = json.id
    //user.user_friends = json.friends
    //global.email  = json.email
    global.username= json.name
    //user.loading = false
    //user.loggedIn = true
    //user.avatar = setAvatar(json.id)   
    //alert(Json.stringify(json));
   handleSocialRegistration("facebook");
       
  })
  .catch(() => {
    alert("ERROR GETTING DATA FROM FACEBOOK");
  })
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
        console.log("here is all == " + first);
        if (first.message === 'Successfull') {
          
          AsyncStorage.setItem('user_id', first.data.id);
          AsyncStorage.setItem('username', first.data.username);
          AsyncStorage.setItem('mobile', first.data.mobile);
          AsyncStorage.setItem('firstname', first.data.firstname);
          AsyncStorage.setItem('lastname', first.data.lastname);
          AsyncStorage.setItem('email',first.data.email);
          global.user_id = first.data.id;  
          global.username = first.data.username;
          global.firstname = first.data.firstname;
          global.lastname = first.data.lastname;
          global.mobile = first.data.mobile;
          global.email = first.data.email;

          props.navigation.navigate('MainScreen');

        } else {

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
        <View style={{ marginTop: 20 }}>
          <KeyboardAvoidingView enabled>
            <View style={styles.imageBody}>

              <Image
                source={require('../Images/logo.png')}
                style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
              />

              {/* <SliderBox
                images={state.images}
                autoplay
                //marginTop={20}
                sliderBoxHeight={300}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
              /> */}
            </View>



            <View style={styles.roundrectangleContainer}>

              <View style={styles.SectionStyle}>

                <TextInput style={styles.textInputStyle}
                  //<Icon ios="ios-person" android="md-person" />
                  //style={styles.inputStyle}
                  onChangeText={UserEmail => setUserEmail(UserEmail)}
                  //underlineColorAndroid="#FFFFFF"
                  placeholder="Username/E-Mail/Mobile" //dummy@abc.com
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

                <TextInput style={styles.textInputStyle}
                  //style={styles.inputStyle}
                  //<Icon ios="ios-key" android="md-key" />
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
              <View style={styles.googlebuttonStyle}> 
        <LoginButton
        publishPermissions={['publish_actions']}
        readPermissions={['public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const { accessToken } = data
                    //alert(data.accessToken.toString())
                    initUser(accessToken)
                    //console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
      </View>
            </View>
          </KeyboardAvoidingView>
        </View>

      </ScrollView>
    </View>
  );
};




export default LoginScreen;
var height = Dimensions.get('window').height; 
const styles = StyleSheet.create({
  
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND
  },
  imageBody: {
    flex: 1,
    height: height*.35,
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND
  },
  textInputStyle: {
    width:300,
    color: colors.CRED_BLACK,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight:'bold',
    justifyContent:'center'
    
    
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 45,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    borderRadius: 15,
    backgroundColor: colors.WHITE,
    borderColor: colors.CRED_BLACK,
    shadowColor: colors.CRED_BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
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
    borderColor: colors.CRED_BLACK,
    shadowColor: colors.CRED_BLACK,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  googlebuttonStyle: {
    borderWidth: 0,
    color: '#FFFFFF',
    height: 48,
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 15,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: colors.WHITE,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },

  registerTextStyle: {
    color: colors.CRED_WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  optionTextStyle: {
    flex: 1,
    color: colors.CRED_WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },

  orTextStyle: {
    color: colors.CRED_WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
  },

  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },

  roundrectangleContainer:
  {
    flex: 1,
    backgroundColor: colors.DARK_GREY,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    height: height*.70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden"
  },

});