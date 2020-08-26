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
  Alert,
} from 'react-native';
import CountryPicker from 'rn-country-picker';
import Loader from './Components/loader';
import colors from './common/colors';

const RegisterScreen = props => {
  
  let [userName, setUserName] = useState('');
  let [userFirstName, setUserFirstName] = useState('');
  let [userLastName, setUserLastName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userMobileNumber, setUserMobileNumber] = useState('');
  let [userCountryCode, setUserCountryCode] = useState('+91');
  let [userPassword, setUserPassword] = useState('');
  let [userConfirmPassword, setUserConfirmPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  _selectedValue = (index) => {
    setUserCountryCode({mCountryCode: index});
  };

  const handleSubmitButton = () => {

    setErrortext(''); 
    var dataToSend = {
      username: userName,
      firstname: userFirstName,
      lastname: userLastName,
      mobile: userMobileNumber,
      countrycode: userCountryCode,
      email: userEmail,
      password: userPassword,
    };
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userFirstName) {
      alert('Please fill Name');
      return;
    }
    if (!userLastName) {
      alert('Please fill last name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userMobileNumber) {
      alert('Please fill Mobile number');
      return;
    }
    if (!userCountryCode) { 
      alert('Please Enter Country code');
      return;
    } 
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    if (userPassword !== userConfirmPassword) {
      alert('Password doesnt match');
      return;
    }
    //Show Loader
    setLoading(true);

    var dataToSend = {
      username: userName,
      firstname: userFirstName,
      lastname: userLastName,
      mobile: userMobileNumber,
      countrycode: userCountryCode,
      email: userEmail,
      password: userPassword,
    };

    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(formBody);
    fetch('http://esunscope.org/cms/api/user/userreg', {
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
        if(first.username !=null )
        {
          setIsRegistraionSuccess(false);
          setErrortext(first.username);
        }
        if(first.email !=null )
        {
          setIsRegistraionSuccess(false);
          setErrortext(first.email);
        }
        // If server response message same as Data Matched
        if (first.msg != null) {
          setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
        } else {
          setIsRegistraionSuccess(false);
          setErrortext('Registration Unsuccessful');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        
        console.error("error ${error}");
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
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={username => setUserName(username)}
              placeholder="User Name"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              autoCompleteType='username'
              returnKeyType="next"
              /*onSubmitEditing={() =>
                this._userlastnameinput && this._userlastnameinput.focus()
              }*/
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserFirstName => setUserFirstName(UserFirstName)}
              placeholder="Enter Name"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              returnKeyType="next"
              /*onSubmitEditing={() =>
                this._userlastnameinput && this._userlastnameinput.focus()
              }*/
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
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
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
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
          

          <View style={styles.SectionMobileNumberStyle}>

          <CountryPicker
          disable={false}
          animationType={'slide'}
          containerStyle={styles.pickerStyle}
          pickerTitleStyle={styles.pickerTitleStyle}
          dropDownImage={require('../Images/ic_drop_down.png')}
          selectedCountryTextStyle={styles.selectedCountryTextStyle}
          countryNameTextStyle={styles.countryNameTextStyle}
          pickerTitle={'Country Picker'}
          searchBarPlaceHolder={'Search......'}
          hideCountryFlag={false}
          hideCountryCode={false}
          searchBarStyle={styles.searchBarStyle}
          backButtonImage={require('../Images/ic_back_black.png')}
          searchButtonImage={require('../Images/ic_search.png')}
          //countryCode={this.state.mCountryCode}
          selectedValue={userCountryCode =>setUserCountryCode(userCountryCode)}
        />
            <TextInput
              style={styles.inputStyle}
              onChangeText={userMobileNumber => setUserMobileNumber(userMobileNumber)}
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
            <TextInput
              style={styles.inputStyle}
              onChangeText={userPassword => setUserPassword(userPassword)}
              placeholder="Enter Password"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              autoCompleteType='password'
              keyboardType="default"
              /*ref={ref => {
                this._passwordinput = ref;
              }}
              onSubmitEditing={() =>
                this._userConfirmPasswordinput && this._userConfirmPasswordinput.focus()
              }*/
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={userConfirmPassword => setUserConfirmPassword(userConfirmPassword)}
              placeholder="Confirm Password"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              /*ref={ref => {
                this._userConfirmPasswordinput = ref;
              }}*/
              returnKeyType="next"
              autoCompleteType='password'
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => handleSubmitButton()}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND
  },
  
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    margin: 10,
  },

  SectionMobileNumberStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    
    marginRight: 35,
    justifyContent: 'space-between'
  },
  buttonStyle: {
    backgroundColor: colors.APP_YELLOW,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7D624E',
    height: 40,
    alignItems: 'center',
    
    marginLeft: 35,
    marginRight: 35,
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
    marginLeft:35,
    marginRight:35,
    height:40,
    width:100,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.BOARDER,
    
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
 
  searchBarStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 10,
  },
});