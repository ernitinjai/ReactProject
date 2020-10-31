import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstPage from './drawerScreens/pages/FirstPage';
import ContactUs from './drawerScreens/ContactUs';
import AboutUs from './drawerScreens/AboutUs'
import colors from './common/colors';
import SecondPage from './drawerScreens/pages/SecondPage';
import DrawRoofScreen from './DrawRoofScreen';
import NewInquiry from './NewInquiry';
import Details from './Details';
import FeasibilityStudy from './FeasibilityStudy';
import PurchaseOrder from './PurchaseOrder';
import BiddingStatus from './BiddingStatus';
import BidsList from './BidsList';
import ProjectImplementation from './ProjectImplementation';
import EditProfile from './EditProfile';
import LoginScreen from './LoginScreen';
//import Icon from 'react-native-ionicons'

/*function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}*/

const customTabBarStyle = {
    activeTintColor: colors.CRED_FONT_BRONZE,
    inactiveTintColor: 'gray',

    style: { backgroundColor: colors.CRED_HOME_BLACK, marginTop: -20 },
}

const styles = StyleSheet.create({
    iconImageStyle: {
        height: 25,
        width: 25,
        marginBottom: 15,
        marginTop: 10,
        resizeMode: 'contain',
    }

})

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabStack() {
    return (
        <Tab.Navigator tabBarOptions={customTabBarStyle}>
            <Tab.Screen name="Home" options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <Image style={styles.iconImageStyle}
                        source={require('../Images/home.png')}

                    />
                )
            }}
                component={FirstPage} />


            <Tab.Screen name="O & M" options={{
                tabBarLabel: 'O & M',
                tabBarIcon: ({ color }) => (

                    <Image style={styles.iconImageStyle}
                        source={require('../Images/control.png')}

                    />
                )
            }}
                component={SecondPage} />
            <Tab.Screen name="Contact us"
                options={{
                    tabBarLabel: 'Contact us',
                    tabBarIcon: ({ color }) => (

                        <Image style={styles.iconImageStyle}
                            source={require('../Images/contact.png')}

                        />
                    )
                }} component={ContactUs} />

            <Tab.Screen name="About us"
                options={{
                    tabBarLabel: 'About us',
                    tabBarIcon: ({ color }) => (

                        <Image style={styles.iconImageStyle}
                            source={require('../Images/about.png')}

                        />
                    )
                }} component={AboutUs} />
        </Tab.Navigator>

    );
}
//TODO: Render Inq id and name
export default function MainScreen() {
    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Settings"
                screenOptions={{
                    headerStyle: { backgroundColor: '#F5BA1B' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' }
                }}>


                <Stack.Screen name="Home" component={TabStack}  options={{ headerShown: false }} />
                <Stack.Screen name="DrawRoofScreen" component={DrawRoofScreen}></Stack.Screen>
                <Stack.Screen name="NewInquiry" component={NewInquiry}></Stack.Screen>
                <Stack.Screen name="Details" component={Details}></Stack.Screen>
                <Stack.Screen name="FeasibilityStudy" component={FeasibilityStudy}></Stack.Screen>
                <Stack.Screen name="BiddingStatus" component={BiddingStatus}></Stack.Screen>
                <Stack.Screen name="BidsList" component={BidsList}></Stack.Screen>
                <Stack.Screen name="PurchaseOrder" component={PurchaseOrder}></Stack.Screen>
                <Stack.Screen name="ProjectImplementation" component={ProjectImplementation}></Stack.Screen>
                <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
                


            </Stack.Navigator>

        </NavigationContainer>
    );
}