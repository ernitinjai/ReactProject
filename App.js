/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, {Component} from 'react';

//Import Navigators from React Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Import all the screens needed
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import ForgotPassword from './Screen/ForgotPassword';
import MainScreen from './Screen/MainScreen'
//import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import OtpVerification from './Screen/OtpVerification';




const Auth = createStackNavigator({
  //Stack Navigator for Login and Sign up Screen
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      title: 'Reset Password',
      headerStyle: {
        backgroundColor: '#F5BA1B',
      },
      headerTintColor: '#fff',
    },
  },
  OtpVerification: {
    screen: OtpVerification,
    navigationOptions: {
      headerShown: true,
      headerStyle: {
        backgroundColor: '#F5BA1B',
      },
      headerTintColor: '#fff',
    },
  },
  
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Register',
      headerStyle: {
        backgroundColor: '#F5BA1B',
      },
      headerTintColor: '#fff',
    },
  },
  
  // FirstPage: {
  //   /* SplashScreen which will come once for 5 Seconds */
  //   screen: FirstPage,
  //   navigationOptions: {
  //     /* Hiding header for Splash Screen */
  //     headerShown: false,
  //   },
  // },
  // SecondPage: {
  //   /* SplashScreen which will come once for 5 Seconds */
  //   screen: SecondPage,
  //   navigationOptions: {
  //     /* Hiding header for Splash Screen */
  //     headerShown: false,
  //   },
  // },
  // EditProfile: {
  //   screen: EditProfile,
  //   navigationOptions: {
  //     title: 'Edit Profile',
  //     headerShown: true,
  //   },
  // },
  // DrawRoofScreen: {
  //   screen : DrawRoofScreen,
  //   navigationOptions: {
  //     title: 'Draw Roof',
  //     headerStyle: {
  //       backgroundColor: '#F5BA1B',
  //     },
  //     headerTintColor: '#fff',
  //   },
  // },

  // NewInquiry: {
  //   screen: NewInquiry,
  //   navigationOptions: {
  //     title: 'New Inquiry',
  //     headerShown: true,
  //   },
  // },
        
  //   Details: {
  //   screen: Details,
  //   navigationOptions: {
  //     title: 'Details',
  //     headerShown: true,
  //   },
  // },

  // FeasibilityStudy: {
  //   screen: FeasibilityStudy,
  //   navigationOptions: {
  //     title: 'Feasibility Study',
  //     headerShown: true,
  //   },
  // },

  // PurchaseOrder: {
  //   screen: PurchaseOrder,
  //   navigationOptions: {
  //     title: 'Purchase Order',
  //     headerShown: true,
  //   },
  // },

  // BiddingStatus: {
  //   screen: BiddingStatus,
  //   navigationOptions: {
  //     title: 'BiddingStatus',
  //     headerShown: true,
  //   },
  // },

  // BidsList: {
  //   screen: BidsList,
  //   navigationOptions: {
  //     title: 'BidsList',
  //     headerShown: true,
  //   },
  // },

  // ProjectImplementation: {
  //   screen: ProjectImplementation,
  //   navigationOptions: {
  //     title: 'Project Implementation',
  //     headerShown: true,
  //   },
  // },

  
});

/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
const App = createSwitchNavigator({ 
  SplashScreen: {
    /* SplashScreen which will come once for 5 Seconds */
    screen: SplashScreen,
    navigationOptions: {
      /* Hiding header for Splash Screen */
      headerShown: false,
    },
  },
  Auth: {
    /* Auth Navigator which includer Login Signup will come once */
    screen: Auth,
  },
  MainScreen: {
    
    screen: MainScreen,
    navigationOptions: {
      headerShown: false,
      
    },
  },
  
  /*DrawerNavigationRoutes: {
    
    screen: DrawerNavigationRoutes,
    navigationOptions: {
      
      headerShown: true,
      
    },
  },*/
  
});

export default createAppContainer(App);