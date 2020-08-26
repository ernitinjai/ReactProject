import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';
import AsyncStorage from '@react-native-community/async-storage';

import {GenericStyles} from './styles/GenericStyles';
import {
  NavigationHeader,
  CustomScreenContainer,
  CustomText,
  CustomTextInput,
  CustomButton,
  TouchableOpacity,
  FullButtonComponent,
} from './lib';
import {
  Alert,
} from 'react-native'

import ErrorBoundary from './common/ErrorBoundary';
import colors from './common/colors';
import {isAndroid, logErrorWithMessage} from './utilities/helperFunctions';
import TimerText from './Components/TimerText';
import Loader from './Components/loader';
import { useScrollToTop } from '@react-navigation/native';

const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; // 4 secs

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;

const OtpVerification = function(props) {
  const {otpRequestData, attempts} = props;

  const [attemptsRemaining, setAttemptsRemaining] = useState(attempts);
  const [otpArray, setOtpArray] = useState(['', '', '', '','','']);
  const [submittingOtp, setSubmittingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  let [loading, setLoading] = useState(false);
  let [userId, setUserId] = useState('');
  let [userOTP, setOTP] = useState('');
  let [userNewPassword, setNewPassword] = useState('');
  let [userConfirmPassword, setConfirmPassword] = useState('');
  let [errortext, setErrortext] = useState('');
  // in secs, if value is greater than 0 then button will be disabled
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );

  // 0 < autoSubmitOtpTime < 4 to show auto submitting OTP text
  const [autoSubmitOtpTime, setAutoSubmitOtpTime] = useState(
    AUTO_SUBMIT_OTP_TIME_LIMIT,
  );

  // TextInput refs to focus programmatically while entering OTP
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  // a reference to autoSubmitOtpTimerIntervalCallback to always get updated value of autoSubmitOtpTime
  //const autoSubmitOtpTimerIntervalCallbackReference = useRef();

  /*useEffect(() => {
    // autoSubmitOtpTime value will be set after otp is detected,
    // in that case we have to start auto submit timer
    autoSubmitOtpTimerIntervalCallbackReference.current = autoSubmitOtpTimerIntervalCallback;
  });*/

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  /*useEffect(() => {
    // docs: https://github.com/faizalshap/react-native-otp-verify

    RNOtpVerify.getOtp()
      .then(p =>
        RNOtpVerify.addListener(message => {
          try {
            if (message) {
              const messageArray = message.split('\n');
              if (messageArray[2]) {
                const otp = messageArray[2].split(' ')[0];
                if (otp.length === 4) {
                  setOtpArray(otp.split(''));

                  // to auto submit otp in 4 secs
                  setAutoSubmitOtpTime(AUTO_SUBMIT_OTP_TIME_LIMIT);
                  startAutoSubmitOtpTimer();
                }
              }
            }
          } catch (error) {
            logErrorWithMessage(
              error.message,
              'RNOtpVerify.getOtp - read message, OtpVerification',
            );
          }
        }),
      )
      .catch(error => {
        logErrorWithMessage(
          error.message,
          'RNOtpVerify.getOtp, OtpVerification',
        );
      });

    // remove listener on unmount
    return () => {
      RNOtpVerify.removeListener();
    };
  }, []);*/
  useEffect(() => {

      AsyncStorage.getItem('user_id').then(value =>
        setUserId(value)
      );
   
  }, []);

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  // this callback is being invoked from startAutoSubmitOtpTimer which itself is being invoked from useEffect
  // since useEffect use closure to cache variables data, we will not be able to get updated autoSubmitOtpTime value
  // as a solution we are using useRef by keeping its value always updated inside useEffect(componentDidUpdate)
  /*const autoSubmitOtpTimerIntervalCallback = () => {
    if (autoSubmitOtpTime <= 0) {
      clearInterval(autoSubmitOtpTimerInterval);

      // submit OTP
      onSubmitButtonPress();
    }
    setAutoSubmitOtpTime(autoSubmitOtpTime - 1);
  };*/

  /*const startAutoSubmitOtpTimer = () => {
    if (autoSubmitOtpTimerInterval) {
      clearInterval(autoSubmitOtpTimerInterval);
    }
    autoSubmitOtpTimerInterval = setInterval(() => {
      autoSubmitOtpTimerIntervalCallbackReference.current();
    }, 1000);
  };*/

  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  const onResendOtpButtonPress = () => {
    // clear last OTP
    if (firstTextInputRef) {
      setOtpArray(['', '', '', '','','']);
      firstTextInputRef.current.focus();
    }

    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();

    // resend OTP Api call
    // todo
    console.log('todo: Resend OTP');
  };

  const onSubmitButtonPress = () => {
    handleSubmitButton();
    //props.navigation.navigate('DrawerNavigationRoutes')
  };

  const handleSubmitButton = () => {

    setErrortext('');
    
    if (userConfirmPassword!=userNewPassword) {
      alert('Password doesnt match');
      return;
    }
    
    let str = '';
    otpArray.forEach(function(i, index) {
    str += i;
    });
    console.log(str);
    setNewPassword(str);
    //Show Loader
    setLoading(true);
    var dataToSend = {
      user_id: userId,
      otp:userOTP,
      new_password: userNewPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://esunscope.org/cms/api/user/resetpassword', {
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
          alert(first.message);
          //setErrortext(first.message);
        }else{
          setIsRegistraionSuccess(true);
          //console.log(first.data.user_id);
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  if (isRegistraionSuccess) {
    Alert.alert(
      'Congratulations!',
      'Your password has been reset successfully.Please Login with new password.',
      [
        {
          text: 'Ok',
          onPress: () => {
            AsyncStorage.clear();
            props.navigation.navigate('LoginScreen')
            console.log('logout');
          },
        },
      ],
      { cancelable: false }
    );
  }
  
  // this event won't be fired when text changes from '' to '' i.e. backspace is pressed
  // using onOtpKeyPress for this purpose
  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        }else if (index === 3) {
          fifthTextInputRef.current.focus();
        }else if (index === 4) {
          sixthTextInputRef.current.focus();
        }

      }
    };
  };

  // only backspace key press event is fired on Android
  // to have consistency, using this event just to detect backspace key press and
  // onOtpChange for other digits press
  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        }else if (index === 4) {
          fourthTextInputRef.current.focus();
        }else if (index === 5) {
          fifthTextInputRef.current.focus();
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
        if (isAndroid && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  return (
    <CustomScreenContainer>
      
      <ErrorBoundary screenName={'OtpVerification'}>
        <View style={styles.container}>


        <View style={[GenericStyles.centerAlignedText, GenericStyles.mt12,styles.spacer]}>
            <CustomTextInput
              
              onChangeText={userNewPassword => setNewPassword(userNewPassword)}
              placeholder="New Password"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              autoCompleteType='password'
              returnKeyType="next"
              style={[styles.passwordText]}
              
            />
          </View>

          <View style={[GenericStyles.centerAlignedText, GenericStyles.mt12,styles.spacer]}>
            <CustomTextInput
              
              onChangeText={userConfirmPassword => setConfirmPassword(userConfirmPassword)}
              placeholder="Confirm Password"
              placeholderTextColor={colors.LIGHT_GREY_FONT}
              keyboardType="email-address"
              returnKeyType="next"
              style={[styles.passwordText]}
              
            />
          </View>



          <CustomText>
            Enter OTP sent to your{' '}
            {otpRequestData.email_id ? 'email' : 'mobile number'}{' '}
          </CustomText>
          <View style={[GenericStyles.row, GenericStyles.mt12]}>
            {[
              firstTextInputRef,
              secondTextInputRef,
              thirdTextInputRef,
              fourthTextInputRef,
              fifthTextInputRef,
              sixthTextInputRef,
            ].map((textInputRef, index) => (
              <CustomTextInput
                containerStyle={[GenericStyles.fill, GenericStyles.mr12]}
                value={otpArray[index]}
                onKeyPress={onOtpKeyPress(index)}
                onChangeText={onOtpChange(index)}
                keyboardType={'numeric'}
                maxLength={1}
                style={[styles.otpText, GenericStyles.centerAlignedText]}
                autoFocus={index === 0 ? true : undefined}
                refCallback={refCallback(textInputRef)}
                key={index}
              />
            ))}
          </View>
          {errorMessage ? (
            <CustomText
              style={[
                GenericStyles.negativeText,
                GenericStyles.mt12,
                GenericStyles.centerAlignedText,
              ]}>
              {errorMessage}
            </CustomText>
          ) : null}
          {resendButtonDisabledTime > 0 ? (
            <TimerText text={'Resend OTP in'} time={resendButtonDisabledTime} />
          ) : (
            <CustomButton
              type={'link'}
              text={'Resend OTP'}
              buttonStyle={styles.otpResendButton}
              textStyle={styles.otpResendButtonText}
              onPress={onResendOtpButtonPress}
            />
          )}
          
          <View style={GenericStyles.fill} />
          {submittingOtp && <ActivityIndicator />}
          {autoSubmitOtpTime > 0 &&
          autoSubmitOtpTime < AUTO_SUBMIT_OTP_TIME_LIMIT ? (
            <TimerText text={'Submitting OTP in'} time={autoSubmitOtpTime} />
          ) : null}
          <CustomText
            style={[GenericStyles.centerAlignedText, GenericStyles.mt12]}>
            {attemptsRemaining || 0} Attempts remaining
          </CustomText>
          <FullButtonComponent 
            
            type={'fill'}
            text={'Submit'}
            textStyle={styles.submitButtonText}
            buttonStyle={GenericStyles.mt24}
            onPress={onSubmitButtonPress}
            disabled={submittingOtp}
          />
        </View>
      </ErrorBoundary>
    </CustomScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  submitButtonText: {
    color: colors.WHITE,
  },
  otpResendButton: {
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
  otpResendButtonText: {
    color: colors.ORANGE,
    textTransform: 'none',
    textDecorationLine: 'underline',
  },
  otpText: {
    fontWeight: 'bold',
    textDecorationColor: colors.BLUE,
    fontSize: 18,
    width: '100%',
  },
  passwordText: {
    
    textDecorationColor: colors.BLUE,
    fontSize: 18,
    width: '100%',
  },
  spacer:{
    marginTop:20,
    marginBottom:20,
  },
});

OtpVerification.defaultProps = {
  attempts: 5,
  otpRequestData: {
    username: 'varunon9',
    email_id: false,
    phone_no: true,
  },
};

OtpVerification.propTypes = {
  otpRequestData: PropTypes.object.isRequired,
  attempts: PropTypes.number.isRequired,
};

export default OtpVerification;