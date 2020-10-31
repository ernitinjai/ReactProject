/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';
import colors from './common/colors';
import OtpVerification from './OtpVerification';
import AsyncStorage from '@react-native-community/async-storage';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Loader from './Components/loader';

const ForgotPassword = props => {
  let [userName, setUserName] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  

  const handleSubmitButton = () => {

   
    setErrortext('');
    if (!userName) {
      alert('Please enter username,Email or Mobile number');
      return;
    }
    
    //Show Loader
    setLoading(true);
    var dataToSend = {
      login: userName
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://esunscope.org/cms/api/user/forgotpassword', {
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
        const first = responseJson[0];
        console.log(first);
        if(first.data ==null )
        {
          setIsRegistraionSuccess(false);
          setErrortext(first.message);
        }else{
          console.log(first.data.user_id);
          AsyncStorage.setItem('user_id', first.data.user_id);
          AsyncStorage.setItem('otp', ""+first.data.otp);
          AsyncStorage.setItem('username', first.data.username);
          AsyncStorage.setItem('mobile', first.data.mobile);
          AsyncStorage.setItem('email', first.data.email);
          props.navigation.navigate('OtpVerification')
          
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../Images/logo.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.roundrectangleContainer}>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={userName => setUserName(userName)}
              placeholder="Enter Email or Mobile"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>Reset Password</Text>
          </TouchableOpacity>
           </View>
        </KeyboardAvoidingView>
       
      </ScrollView>
    </View>
  );
};
export default ForgotPassword;
var height = Dimensions.get('window').height; 
const styles = StyleSheet.create(
  {
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

  buttonStyle: {
    backgroundColor: colors.APP_YELLOW,
    borderWidth: 0,
    color: colors.FONT_COLOR_ON_YELLOW,
    borderColor: colors.BOARDER,
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
  buttonTextStyle: {
    color: colors.FONT_COLOR_ON_YELLOW,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight:'bold'
    
  },
  textInputStyle: {
    width:300,
    color: colors.CRED_BLACK,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight:'bold',
    
    
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  roundrectangleContainer:
  {
    flex: 1,
    backgroundColor: colors.DARK_GREY,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    height: height*.80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden"
  },
});