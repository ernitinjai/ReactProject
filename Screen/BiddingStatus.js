// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, { Component, useState, useEffect } from 'react'
import { ActivityIndicator, TouchableOpacity, StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import colors from './common/colors';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatGrid } from 'react-native-super-grid';
import RadioGroup from 'react-native-radio-button-group';
import { TextInput } from "react-native-gesture-handler";

const BiddingStatus = ({ navigation }) => {



    let [animating, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    //const [eData1, setResponseDataState] = useState([]);
    let [isSubmittedSuccess, setIsSubmittedSuccess] = useState('false');




    /*function connectToNetwork(){
        setLoading(true);



        var _userId;
        
        var dataToSend = {
          user_id: _userId,
          frpcustomerapproval: "Yes",
          enquiryid:319,
          reasoncustomerfrp: "qweeqwe e",
        }
    
        var formBody = [];
        for (var key in dataToSend) {
          var encodedKey = encodeURIComponent(key);
          var encodedValue = encodeURIComponent(dataToSend[key]);
          formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log("formBody == " + formBody);
        fetch('http://esunscope.org/cms/api/user/recordfrpapproval', {
    
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

    };*/


    //this.state = { DATA };

    /*state = {
      DATA: [
        { id: 1, inquiry_no: 1234, property_type: "residential", address: "Hare krishna vihar, Nipania, Indore", inquiry_date: "22/3/2020", status: "In process" },
        { id: 2, inquiry_no: 12356, property_type: "self", address: "Indore 23", inquiry_date: "21/4/2020", status: "Completed" },
        { id: 3, inquiry_no: 12367, property_type: "building", address: "Indore 12345", inquiry_date: "19/3/2020", status: "In process" },
  
      ]
    };*/

    const item =
    {
        inquiry_nu: global.inquiry_nu,
        Property_Type: global.Property_Type,
        Land_Line: global.Land_Line,
        Call_Time: global.Call_Time,
        Mobile: global.Mobile,
        Average_Bill: global.Average_Bill,
        Roof_Size: global.Roof_Size,
        Inquiry_Date: global.Inquiry_Date,

    }

    var radiogroup_options = [
        { id: 0, label: 'Yes' },
        { id: 1, label: 'No' },
    ];




    let renderpostTypes = () => {

        //console.log(" eData ==" + JSON.stringify(eData));

        let post = [];


        post.push(
            <Card  >

                <CardItem>

                    <Body>
                        
                            <Text style={styles.header}> Thanks for approving the report,We will now procees with bidding for your site. </Text>
                        
                    </Body>

                </CardItem>
                <View style={styles.lineStyle} />
                <CardItem>
                    <Left>
                        <Body>
                            <Text>Inquiry No. </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text>{item.inquiry_nu}</Text>
                    </Right>
                </CardItem>

                <View style={styles.lineStyle} />


                <CardItem>
                    <Left>
                        <Body>
                            <Text>Property Type </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text>{item.Property_Type}</Text>
                    </Right>
                </CardItem>

                <View style={styles.lineStyle} />



                <CardItem>
                    <Left>
                        <Body>
                            <Text>Feasibility Report </Text>
                        </Body>
                    </Left>
                    <Right>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                        //onPress={() => {getDetails(item.enquiryid)}}

                        >
                            <Text style={styles.buttonTextStyle}>Views</Text>
                        </TouchableOpacity>
                    </Right>
                </CardItem>

                <View style={styles.lineStyle} />

                <CardItem>
                    <Left>
                        <Body>
                            <Text>status </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text>status</Text>
                    </Right>
                </CardItem>

                <View style={styles.lineStyle} />

                <CardItem>
                    <Left>
                        <Body>
                            <Text>Inquiry Date </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text>{item.Inquiry_Date}</Text>
                    </Right>
                </CardItem>

                <View style={styles.lineStyle} />
                <CardItem>
                    <Text> Description: this is feasibility report for APP testing </Text>

                </CardItem>
                <View style={styles.lineStyle} />
            </Card>
        );

        return post;
    };


    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">


                <Container style={{ padding: 15 }}>
                    {
                        <View>
                            <Text style={{
                                fontSize: 18,
                                textAlign: 'center',
                                padding: 20

                            }}>
                                Bidding Status
            </Text>
                        </View>
                    }
                    <Content >

                        {renderpostTypes()}


                    </Content>
                    <TouchableOpacity
                        style={styles.submitButtonStyle}
                        activeOpacity={0.5}
                        >
                        <Text style={styles.buttonTextStyle}>Back</Text>
                    </TouchableOpacity>
                </Container>




            </ScrollView>

        </View>

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
        //height: 80,
    },
    buttonStyle: {
        backgroundColor: '#FFCE4A',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 45,
        width: 80,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },


    submitButtonStyle: {
        backgroundColor: '#FFCE4A',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 45,
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

    rowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 100,
        margin: 10,
    },
    header: {
        backgroundColor: colors.GREEN,
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 80,
        margin: 10,
        color: colors.WHITE,
        fontWeight: '800',
    },


    itemName: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'center',
        fontWeight: '600',
    },

    subitemName: {
        fontSize: 12,
        color: colors.DARK_GREY_FONT,
        alignSelf: 'center',
        margin: 10,

    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        alignSelf: 'center',
        color: colors.DARK_GREY_FONT,
    },
    itemImage: {
        justifyContent: 'center',
        width: 30,
        height: 30,
        alignSelf: 'center',
        alignContent: 'center',
        color: '#fff',
    },

    solarImage: {
        justifyContent: 'center',
        width: 80,
        height: 80,
        alignSelf: 'center',
        alignContent: 'center',
        color: '#fff',
    },
    spacer: {
        marginTop: 10,
        marginBottom: 10,
    },
    whiteBoarderInputContainer: {
        backgroundColor: '#FFFFFF',
        width: 150,
        borderWidth: 1,
        height: 80,
        color: '#000000',
        borderColor: '#E5E5E5',
        padding: 5,
    },
    header: {
        backgroundColor: colors.APP_YELLOW,
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 100,
        margin: 10,
        color: colors.DARK_GREY_FONT,
        fontWeight: '800',
    },

});
export default BiddingStatus;