// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, { Component, useState, useEffect } from 'react';
import { NavigationActions } from 'react-navigation';

import { ActivityIndicator, TouchableOpacity, StyleSheet, View, Text, SafeAreaView, Image, Dimensions,Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import colors from '../../common/colors';
import AsyncStorage from '@react-native-community/async-storage';
import RNExitApp from 'react-native-exit-app';

const FirstPage = ({ props, navigation }) => {

  let [animating, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  const [eData, setResponseDataState] = useState([]);
  let [isSubmittedSuccess, setIsSubmittedSuccess] = useState('false');



  useEffect(() => {
    setLoading(true);

    var dataToSend = {
      user_id: global.user_id,
    }

    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log("formBody == " + formBody);
    fetch('http://esunscope.org/cms/api/user/userinquirysites', {

      method: 'post',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(" original  ==" + JSON.stringify(responseJson));
        if (responseJson[0].status == "success") {

          setLoading(false);
          setResponseDataState(responseJson[0].data.sitelist);
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  let headerImagesStatus = () => {
    let post = [];
    post.push(
      <Card >

        <CardItem style={styles.headerStyleImage}>
          <Left  >

            <Body style={styles.iconContainerLeft}>
              <TouchableOpacity

                activeOpacity={0.5}
                onPress={() => navigation.navigate('EditProfile')}

              >
                <Image style={styles.iconImageContainerLeft}
                  source={require('../../../Images/profile.png')}

                />
                {/* <Text style={styles.headerImageText}>

                  {global.firstname}</Text> */}
              </TouchableOpacity>
            </Body>
          </Left>


          <Right>
            <TouchableOpacity

              activeOpacity={0.5}
              onPress={() => navigation.navigate('EditProfile')}

            >
              <Body style={styles.iconContainerRight}>
                <Image style={styles.iconImageContainer}
                  source={require('../../../Images/notification.png')}

                />
                <Text style={styles.headerImageText}>Notification</Text>
              </Body>
            </TouchableOpacity>
          </Right>

          <Right >
            <Body style={styles.iconContainerRight}>
              <TouchableOpacity

                activeOpacity={0.5}
                onPress={() => onLogoutPress()}

              >
                <Image style={styles.iconImageContainer}
                  source={require('../../../Images/control.png')}
                />
                <Text style={styles.headerImageText}>Log Out</Text>
              </TouchableOpacity>
            </Body>
          </Right>

        </CardItem>

      </Card>
    )

    return post;

  }

  function onLogoutPress(){
    Alert.alert(
      'Logout',
      'Are you sure , Application will exit to completely log out ? You want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {

            AsyncStorage.clear().then(() => RNExitApp.exitApp())
            //AsyncStorage.clear();
            /*navigation.navigate(
              'Auth', 
              {}, 
              NavigationActions.navigate({ 
                  routeName: 'LoginScreen' 
              }))*/
           // navigation.navigate('LoginScreen')
            //navigation.replace('LoginScreen');
           // navigation.popToTop();
            //navigation.goBack(null);
            //console.log('logout');
            
          },
        },
      ],
      { cancelable: false }
    );
  }



  let renderpostTypes = () => {

    console.log(" eData ==" + JSON.stringify(eData));

    let post = [];

    if (eData.length == 0) {
      post.push(

        <View>
          <Text style={{color: colors.CRED_FONT_BRONZE,margin:20}}>No Record Found , Please start your first inquiry with clicking on DRAW ROOF </Text>
        </View>
      )
    } else {


      eData.map((item) => {
        post.push(

          <Card key={item} style={styles.roundrectangleContainer}>
            <CardItem  style={styles.backgroundContainer}>
              <Left>
                <Body>
                  {/* <Text style={styles.boldText}>No:</Text> */}
                  <Text style={styles.boldText}>Inquiry No:</Text>

                  {/* <Text>{item.enquiryid}</Text> */}

                </Body>
              </Left>

              {/* <Body>
                { <Text style={styles.boldText}>Inquiry No:</Text> 
                <Text>{item.enquiryno}</Text>
              </Body> */}
              <Right>
                <Text>{item.enquiryno}</Text>
                {/* <Text style={styles.boldText}>Inquiry Date:</Text>
                <Text>{item.createdDtm}</Text> */}
              </Right>

            </CardItem>

            <CardItem style={styles.backgroundContainer}>
              <Left>
                <Body>
                  {/* <Text style={styles.boldText}>No:</Text> */}
                  <Text style={styles.boldText}>Inquiry Date:</Text>

                  {/* <Text>{item.enquiryid}</Text> */}

                </Body>
              </Left>

              {/* <Body>
                { <Text style={styles.boldText}>Inquiry No:</Text> 
                <Text>{item.enquiryno}</Text>
              </Body> */}
              <Right>
              <Text>{item.createdDtm}</Text>
                {/* <Text style={styles.boldText}>Inquiry Date:</Text>
                <Text>{item.createdDtm}</Text> */}
              </Right>

            </CardItem>

            <View style={styles.lineStyle} />


            <CardItem style={styles.backgroundContainer}>
              <Left>


                <Text style={styles.boldText}>Property Type:</Text>
              </Left>
              <Right>

                <Text>{item.propertytype}</Text>
              </Right>

            </CardItem>

            <CardItem style={styles.backgroundContainer}>
              <Left>
                <Text style={styles.boldText}>Address</Text>
              </Left>
              <Right>
                <Text>{item.Address}</Text>
              </Right>

            </CardItem>

            <CardItem style={styles.backgroundContainer}>
              <Left>
                <Text style={styles.boldText}>Status</Text>
              </Left>
              <Right>{
                <TouchableOpacity

                  onPress={() => onHandleButtonPress(item.customerstatus)}
                >
                  <Text style={styles.underLineText}>{item.customerstatus}</Text>
                </TouchableOpacity>
              }
              </Right>

            </CardItem>

            <CardItem style={styles.backgroundContainer}>
              <Left>
                <Text style={styles.boldText}>Details</Text>
              </Left>
              <Right>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() => { getDetails(item.enquiryid) }}

                >
                  <Text style={styles.buttonTextStyle}>Views</Text>
                </TouchableOpacity>
              </Right>

            </CardItem>
          </Card>

        );
      });
    }
    return post;
  };

  function onHandleButtonPress(item) {
    if (item === "Bid Preparation In Progress") {
      //alert("Create bid screen");
      navigation.navigate('BidsList');

    } else if (item === "") {
      navigation.navigate('FeasibilityStudy');
    } else if (item == "In Process") {

      getDetails(item.enquiryid);
      //alert("We will notify you as soon as possible");
    } else if (item == "Installation Phase") {
      navigation.navigate('ProjectImplementation');
    }
  }



  function getDetails(item) {
    setLoading(true);
    global.enquiryid = item;

    var dataToSend = {
      user_id: global.user_id,
      enquiryid: item
    }

    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log("formBody == " + formBody);
    fetch('http://esunscope.org/cms/api/user/usersitedetail', {

      method: 'post',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        var jsonStringify = JSON.stringify(responseJson);
        var details = JSON.parse(jsonStringify);

        if (details[0].status == "error") {


          alert(details[0].message);



        }
        else {
          var information = details[0].data.sitedetail;
          global.roof_area = information.roofsize;
          global.total_capacity = information.totalpvcapacity;
          global.apx_cost = information.c_netcost;
          global.payback_period = information.c_payback;
          global.usable_area = information.useablearea;
          global.annal_energy = information.averageannualgeneration;
          global.saving = information.saving_per_year;
          global.inquiry_nu = information.enquiryno;
          global.Property_Type = information.propertytype;
          global.Land_Line = information.landline;
          global.Call_Time = information.calltime;
          global.Average_Bill = information.averageannualgeneration;
          global.Roof_Size = information.roofsize;
          global.Inquiry_Date = information.createdDtm;
          navigation.navigate('Details');

        }
      })
      .catch((error) => {
        console.error(error);
      });

  }


  return (
    <SafeAreaView style={styles.mainContainer}>



      <View  >
        {headerImagesStatus()}
      </View>

      <View style={styles.shadowLineStyle} />


      <View
        style={{
          alignItems: "center",
          flexDirection: 'row',
          marginTop: 30,
        }}>
        <Text
          style={{
            fontSize: 26,
            marginLeft: 20,
            color: colors.WHITE

          }}>
          hello {global.firstname}, 
          <Text
          style={{
            fontSize: 14,
            marginLeft: 20,
            color: colors.WHITE

          }}>
          {"\n"}you can request for new plant
          </Text>
          </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('DrawRoofScreen')}>
          <Text style={styles.buttonTextStyle} >Draw roof</Text>
        </TouchableOpacity>


      </View>

      <View >

        {

          animating ?
            <ActivityIndicator
              animating={animating}
              color={colors.APP_YELLOW}
              size="large"
              style={styles.activityIndicator}
            />
            : null
        }


      </View>





      <View>
        <Text style={{
          fontSize: 20,
          textAlign: 'center',
          color: colors.CRED_FONT_BRONZE,
          
          margin:15,

        }}>
          Your Site List
            </Text>
      </View>
      <Content style={{marginBottom:20}}>

        {renderpostTypes()}
      </Content>

    </SafeAreaView>



  )
}
var height = Dimensions.get('window').height;
const styles = StyleSheet.create({

  mainContainer: {
    backgroundColor: colors.CRED_HOME_BLACK,
    flex: 1,

  },

  headerStyleImage: {
    backgroundColor: colors.CRED_HOME_BLACK,
    height: 60,
    margin: -5,
  },
  iconContainerLeft: {
    flex: 1,
    height: 120,
    width: 120,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop:40,
    
  },
  iconImageContainerLeft: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
    justifyContent:'center'
  },
  iconContainerRight: {
    flex: 1,
    height: 80,
    width: 80,
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconImageContainer: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  headerImageText: {
    fontWeight: "bold",
    textDecorationStyle: "solid",
    fontSize: 12,
    color: colors.DARK_GREY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundrectangleContainer:
  {

    backgroundColor: colors.CRED_CARD_BACKGROUND,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  backgroundContainer:
  {

    backgroundColor: colors.CRED_CARD_BACKGROUND,
   
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginLeft: 20,

  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    margin: 10,
  },
  shadowLineStyle: {
    borderColor: colors.WHITE,
    shadowColor: colors.WHITE,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: 20,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  buttonStyle: {
    backgroundColor: '#FFCE4A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 35,
    width: 100,
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  buttonTextStyle: {
    color: colors.BLACK,
    fontSize: 14,
    marginTop: 7,
    alignItems: 'center',
  },
  underLineText: {
    textDecorationLine: 'underline',
    color: colors.BLUE
  },

  boldText: {
    fontWeight: "bold",
    textDecorationStyle: "solid",
    fontSize: 12,
    color: colors.LIGHT_GREY_FONT
  }


});
export default FirstPage;