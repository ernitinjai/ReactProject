/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';

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
  ScrollView,
  AsyncStorage,
  Dimensions,
  Alert,
} from 'react-native';
import CountryPicker from 'rn-country-picker';
import Loader from './Components/loader';
import colors from './common/colors';
import RNPasswordStrengthMeter, {
  BarPasswordStrengthDisplay,
  BoxPasswordStrengthDisplay,
  CircularPasswordStrengthDisplay,
  TextPasswordStrengthDisplay,
} from 'react-native-password-strength-meter';


const RegisterScreen = props => {
  
  //let [userName, setUserName] = useState('');
  let [userFirstName, setUserFirstName] = useState('');
  let [userLastName, setUserLastName] = useState('');
  //let [userEmail, setUserEmail] = useState('');
  //let [userMobileNumber, setUserMobileNumber] = useState('');
  //let [userCountryCode, setUserCountryCode] = useState('+91');
  let [userPassword, setUserPassword] = useState('');
  let [userConfirmPassword, setUserConfirmPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  /*_selectedValue = (index) => {
    setUserCountryCode({mCountryCode: index});
  };*/

  const handleSubmitButton = () => {

    setErrortext(''); 
    
    /*if (!userName) {
      alert('Please fill Name');
      return;
    }*/
    if (!userFirstName) {
      alert('Please fill Name');
      return;
    }
    if (!userLastName) {
      alert('Please fill last name');
      return;
    }
    /*if (!userEmail && !userMobileNumber) {
      alert('Please fill Email or Mobile Number');
      return;
    }*/
    /*if (!userMobileNumber) {
      alert('Please fill Mobile number');
      return;
    }*/
    /*if (!userCountryCode) { 
      alert('Please Enter Country code');
      return;
    } */
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    if (!userConfirmPassword) {
      alert('Please fill New Password');
      return;
    }
    //Show Loader
    setLoading(true);

    var dataToSend = {
      user_id:global.user_id,
      //username: userName,
      firstname: userFirstName,
      lastname: userLastName,
      //mobile: userMobileNumber,
      //countrycode: userCountryCode,
      //email: userEmail,
      oldpassword: userPassword,
      newpassword: userConfirmPassword,
    };

    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(formBody);
    fetch('https://esunscope.org/cms/api/user/profileupdate', {
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
        
        if (responseJson[0].status == "success") {
          
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
          setIsRegistraionSuccess(true);
        } else {
          setIsRegistraionSuccess(false);
          alert("" + JSON.stringify(responseJson));
          setErrortext('Registration Unsuccessful');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        
        //console.error("error ${error}");
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND,
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Images/logo.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('DrawerNavigationRoutes')}>
          <Text style={styles.buttonTextStyle}>Go to Home screen Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
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
            <TextInput  style={styles.textInputStyle}
              defaultValue ={global.firstname}
              onChangeText={UserFirstName => setUserFirstName(UserFirstName)}
              placeholder="Enter First Name"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              returnKeyType="next"
              
              /*onSubmitEditing={() =>
                this._userlastnameinput && this._userlastnameinput.focus()
              }*/
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput style={styles.textInputStyle}
              defaultValue ={global.lastname}
              onChangeText={userLastName => setUserLastName(userLastName)}
              placeholder="Enter Last Name"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              returnKeyType="next"
              /*ref={ref => {
                this._userlastnameinput = ref;
              }}
              onSubmitEditing={() =>
                this._emailinput && this._emailinput.focus()
              }*/
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput style={styles.textInputStyle}
              value ={global.username}
              onChangeText={username => setUserName(username)}
              placeholder="User Name"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              autoCompleteType='username'
              returnKeyType="next"
              editable={false}
              /*onSubmitEditing={() =>
                this._userlastnameinput && this._userlastnameinput.focus()
              }*/
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput style={styles.textInputStyle}
              value ={global.email}
              //onChangeText={UserEmail => setUserEmail(UserEmail)}
              placeholder="Enter Email "
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              keyboardType="email-address"
              autoCompleteType='email'
              returnKeyType="next"
              /*ref={ref => {
                this._emailinput = ref;
              }}
              onSubmitEditing={() => this._passwordinput && this._passwordinput.focus()}
              */
              blurOnSubmit={false}
            />
          </View>
          

          <View style={styles.SectionStyle}>
          
          <CountryPicker 
          disable={true}
          animationType={'slide'}
          containerStyle={styles.pickerStyle}
          pickerTitleStyle={styles.pickerTitleStyle}
          selectedCountryTextStyle={styles.selectedCountryTextStyle}
          countryNameTextStyle={styles.countryNameTextStyle}
          pickerTitle={'Country Picker'}
          searchBarPlaceHolder={'Search......'}
          hideCountryFlag={false}
          hideCountryCode={false}
          searchBarStyle={styles.searchBarStyle}
          backButtonImage={require('../Images/ic_back_black.png')}
          searchButtonImage={require('../Images/ic_search.png')}
          dropDownImage={require('../Images/ic_drop_down.png')}
          //countryCode={this.state.mCountryCode}
          selectedValue={userCountryCode =>setUserCountryCode(userCountryCode)}
        />
       
            <TextInput  style={styles.mobileInputStyle}
              value ={global.mobile}
              //onChangeText={userMobileNumber => setUserMobileNumber(userMobileNumber)}
              placeholder="Enter Mobile number"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              autoCompleteType='tel'
              returnKeyType="next"
              /*ref={ref => {
                this._emailinput = ref;
              }}
              onSubmitEditing={() => this._passwordinput && this._passwordinput.focus()}
              */
              blurOnSubmit={false}
            />
          </View>
         
          <View style={styles.SectionStyle}>
            <TextInput style={styles.textInputStyle}
              
              onChangeText={userPassword => setUserPassword(userPassword)}
              placeholder="Enter Old Password"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              autoCompleteType='password'
              keyboardType="default"
              secureTextEntry={true}
              /*ref={ref => {
                this._passwordinput = ref;
              }}
              onSubmitEditing={() =>
                this._userConfirmPasswordinput && this._userConfirmPasswordinput.focus()
              }*/
              blurOnSubmit={false}
            />
          </View>
           <View style={styles.passwordStrengthStyle}>
           <TextPasswordStrengthDisplay
          password={userConfirmPassword}
        />
         </View>
          <View style={styles.SectionStyle}>
            <TextInput style={styles.textInputStyle}
              
              onChangeText={userConfirmPassword => setUserConfirmPassword(userConfirmPassword)}
              placeholder="Enter new Password"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              /*ref={ref => {
                this._userConfirmPasswordinput = ref;
              }}*/
              returnKeyType="next"
              autoCompleteType='password'
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
            onPress={() => handleSubmitButton()}>
            <Text style={styles.buttonTextStyle}>UPDATE PROFILE</Text>
          </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;
var height = Dimensions.get('window').height; 
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND
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

  contrycontainer: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND,
    marginTop:20
  },
  
  SectionStyle: {
    flex:1,
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
    flex:1,
    backgroundColor: colors.APP_YELLOW,
    borderWidth: 0,
    color: colors.FONT_COLOR_ON_YELLOW,
    borderColor: colors.BOARDER,
    height: 40,
    alignItems: 'center',
    justifyContent:'center',
    
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
    color: colors.LIGHT_GREY_FONT,
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  pickerTitleStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
    borderColor: colors.BOARDER,
    
  },
  pickerStyle: {
    
    color: 'white',
    height:40,
    width:120,
    justifyContent: 'center',
  },

  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: colors.LIGHT_GREY_FONT,
    textAlign: 'right',
  },
 
  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },

  passwordStrengthStyle: {
    width:200,
    color: colors.CRED_BLACK,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight:'bold',
    
  },

  mobileInputStyle: {
    width:200,
    color: colors.CRED_BLACK,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight:'bold',
    
    
  },
});