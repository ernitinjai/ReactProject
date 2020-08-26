/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import * as React from 'react';

import 'react-native-gesture-handler';

//Import all required component
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import DrawRoofScreen from '../DrawRoofScreen';
import NewInquiry from '../NewInquiry';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#F5BA1B',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="FirstPage"
        component={FirstPage}
        options={{
          tabBarLabel: 'e-Procurement Sites',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        }}  />
      <Tab.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          tabBarLabel: 'O&M Sites',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }} />
    </Tab.Navigator>
  );
}

const HomeScreen = () => {
  global.currentScreenIndex = 'HomeScreen';
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          headerStyle: { backgroundColor: '#F5BA1B' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
          
        <Stack.Screen name="TabStack" component={TabStack} options={{ title: ' e-Procurement' }}/>
        <Stack.Screen name="Draw roof" component={DrawRoofScreen}></Stack.Screen>
        <Stack.Screen name="NewInquiry" component={NewInquiry}></Stack.Screen>
    
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default HomeScreen;