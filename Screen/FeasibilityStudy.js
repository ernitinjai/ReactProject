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

const FeasibilityStudy = ({ navigation }) => {



    let [animating, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    let [isSubmittedSuccess, setIsSubmittedSuccess] = useState('false');




    function connectToNetwork(){
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
              navigation.navigate('BiddingStatus');
            }
          })
          .catch((error) => {
            console.error(error);
          });

    };


    var userAcceptance = [
        { id: 0, label: 'Yes' },
        { id: 1, label: 'No' },
    ];




    let renderpostTypes = () => {
        let post = [];
        post.push(
            <Card  >
                <CardItem>
                    <Left>
                        <Body>
                            <Text>Inquiry No. </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text>{global.inquiry_nu}</Text>
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
                        <Text>{global.Property_Type}</Text>
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
                        <Text>{global.Inquiry_Date}</Text>
                    </Right>
                </CardItem>

                <View style={styles.lineStyle} />
                <CardItem>
                    <Text> Description: this is feasibility report for APP testing </Text>

                </CardItem>
                <View style={styles.lineStyle} />
                <CardItem>
                    <Text>Disclaimer: I have understood the content of the report and approve the content of the same. I also authorize eSunScope and it’s team to prepare the RFP and invite bids for the system. I also authorize eSunScope to also evaluate the bids and negotiate on my behalf. </Text>


                </CardItem>


                <CardItem>
                    <Left>
                        <Body>
                            <Text> I Accept : </Text>
                            <View style={styles.spacer}></View>
                            <RadioGroup horizontal
                                options={userAcceptance} />
                        </Body>
                    </Left>

                    <Right>
                        <Body>
                            <Text>Please Give Reason to Your Selection?</Text>
                            <TextInput style={styles.whiteBoarderInputContainer} />
                        </Body>
                    </Right>

                </CardItem>

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
                            Feasibility Report </Text>
            
                    </View>
                }
                <Content >

                    {renderpostTypes()}


                </Content>
                <TouchableOpacity
              style={styles.submitButtonStyle}
              activeOpacity={0.5}
              onPress={() => {connectToNetwork()}}
              >
              <Text style={styles.buttonTextStyle}>Submit</Text>
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
        backgroundColor: colors.APP_YELLOW,
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 100,
        margin: 10,
        color: colors.DARK_GREY_FONT,
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
    
});
export default FeasibilityStudy;