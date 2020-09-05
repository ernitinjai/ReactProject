// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, { Component, useState, useEffect } from 'react'
import { ActivityIndicator, TouchableOpacity, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import colors from '../../common/colors';
import AsyncStorage from '@react-native-community/async-storage';

const FirstPage = ({ props, navigation }) => {

  let [animating, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  const [eData, setResponseDataState] = useState([]);
  let [isSubmittedSuccess, setIsSubmittedSuccess] = useState('false');

  

  useEffect(() => {
    setLoading(true);

    var _userId;
    AsyncStorage.getItem('user_id').then((userId) => {
      if(userId){
         this._userId = userId;
      }
    });
    var dataToSend = {
      user_id: _userId,
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


  //this.state = { DATA };

  /*state = {
    DATA: [
      { id: 1, inquiry_no: 1234, property_type: "residential", address: "Hare krishna vihar, Nipania, Indore", inquiry_date: "22/3/2020", status: "In process" },
      { id: 2, inquiry_no: 12356, property_type: "self", address: "Indore 23", inquiry_date: "21/4/2020", status: "Completed" },
      { id: 3, inquiry_no: 12367, property_type: "building", address: "Indore 12345", inquiry_date: "19/3/2020", status: "In process" },

    ]
  };*/

  let renderpostTypes = () => {

    console.log(" eData ==" + JSON.stringify(eData));

    let post = [];

    eData.map((item) => {
      post.push(
        <Card key={item} >
          <CardItem>
            <Left>
              <Body>
                <Text>No:</Text>
                <Text>{item.enquiryid}</Text>

              </Body>
            </Left>

            <Body>
              <Text>Inquiry No:</Text>
              <Text>{item.enquiryno}</Text>
            </Body>
            <Right>
              <Text>Inquiry Date:</Text>
              <Text>{item.createdDtm}</Text>
            </Right>

          </CardItem>

          <View style={styles.lineStyle} />


          <CardItem>
            <Left>


              <Text>Property Type:</Text>
            </Left>
            <Body>

              <Text>{item.propertytype}</Text>
            </Body>

          </CardItem>

          <CardItem>
            <Left>
              <Text>Address</Text>
            </Left>
            <Body>
              <Text>{item.Address}</Text>
            </Body>

          </CardItem>

          <CardItem>
            <Left>
              <Text>Status</Text>
            </Left>
            <Body>
              <Text>{item.customerstatus}</Text>
            </Body>

          </CardItem>

          <CardItem>
            <Left>
              <Text>Details</Text>
            </Left>
            <Body>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Details')}
              >
              <Text style={styles.buttonTextStyle}>Views</Text>
            </TouchableOpacity>
            </Body>

          </CardItem>
        </Card>
      );
    });
    return post;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, alignItems: "center" }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: 'row'
          }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center'

            }}>
            Request new Plant
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Draw roof')}>
            <Text>Draw roof</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View >

        {
          
          animating  ?
            <ActivityIndicator
              animating={animating}
              color={colors.APP_YELLOW}
              size="large"
              style={styles.activityIndicator}
            />
            : null
        }


      </View>
      



      <Container style={{ padding: 15 }}>
        <View>
          <Text style={{
            fontSize: 18,
            textAlign: 'center',
            padding: 20

          }}>
            e-Procurement Sites
            </Text>
        </View>
        <Content>

          {renderpostTypes()}
        </Content>
      </Container>
    </SafeAreaView>



  )
}

const styles = StyleSheet.create({
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
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  buttonStyle: {
    backgroundColor: '#FFCE4A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 45,
    width:80,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#000000',
    fontSize: 16,
  },
});
export default FirstPage;