import { StyleSheet } from 'react-native';
import colors from './common/colors';

var height = Dimensions.get('window').height; 
export default StyleSheet.create({
  
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.BACKGROUND
    },
    MainLoginContainer:
    {
      flex: 1,
      backgroundColor: colors.DARK_GREY,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
      height: height*.65,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: "hidden"
    },
    imageBody: {
      flex: 1,
      height: height*.35,
      justifyContent: 'center',
      backgroundColor: colors.BACKGROUND
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
  
    
  
  });