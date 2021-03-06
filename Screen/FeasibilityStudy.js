// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, { Component, useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet, View, Text, ScrollView, Image, TextInput ,Linking} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import colors from './common/colors';
import RadioGroup from 'react-native-radio-buttons-group';

const FeasibilityStudy = ({ navigation }) => {



    let [animating, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    let [customerFrp, setCustomerfrp] = useState('');
    //let [customerapproval, setCustomerApproval] = useState('');
    let [isSubmittedSuccess, setIsSubmittedSuccess] = useState('false');
    const [eData, setResponseDataState] = useState('');
    let [userConsent, setUserConsentType] = useState({data: [
        {
            label: 'Yes',
        },
        {
            label: 'No',
        },
    ],});

    useEffect(() => {
        setLoading(true);
        var _userId;

        var dataToSend = {
            user_id: global.user_id,
            enquiryid: global.enquiryid
        }

        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log("formBody == " + formBody);
        fetch('http://esunscope.org/cms/api/user/feasibilityreport', {

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
                    if(responseJson[0].data.frpreport_found=="yes")
                    setResponseDataState(responseJson[0].data.frpreport);
                    
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);


    function connectToNetwork() {
        setLoading(true);
        var _userId;

        if (selectedUserConsent == "" || customerFrp == "") {
            alert("Please fill appropriate fields");
            return;
        }

        var dataToSend = {
            user_id: global.user_id,
            frpcustomerapproval: selectedUserConsent,
            enquiryid: global.enquiryid,
            reasoncustomerfrp: customerFrp,
        }

        console.log(" dataToSend  ==" + JSON.stringify(dataToSend));

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

    function renderPDF(processfile) {
        Linking.openURL('http://epc.esunscope.org/uploads//'+processfile)
    };

    let drawUserNameAndInquiryHeader = () => {
        let post = [];
        post.push(
            

                <Card >
                    <CardItem style={styles.nameandinquiryheader}>
                    <Left>
                        <Text style={styles.nameandinquiryheaderTextStyle}>{global.username}</Text>
                    </Left>
                    <Right>
                        <Text style={styles.nameandinquiryheaderTextStyle}>{global.inquiry_nu}</Text> 
                    </Right>
                    </CardItem>
                </Card>
           

        )
        return post;

    }


    var userAcceptance = [
        { id: 0, label: 'Yes' },
        { id: 1, label: 'No' },
    ];


    let selectedUserConsent = userConsent.data.find(e => e.selected == true);
    selectedUserConsent = selectedUserConsent ? selectedUserConsent.value : userConsent.data[0].label;
    onPress = data => setUserConsentType({ data });

    let renderpostTypes = () => {

        let post = [];
        if (eData != null && eData !='') {
            post.push(
                <Card  >
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>Inquiry No. </Text>
                            </Body>
                        </Left>
                        <Right>
                            <Text>{eData.enquiryno}</Text>
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
                            <Text>{eData.propertytype}</Text>
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
                            onPress={() => {renderPDF(eData.feasibilityreport)}}

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
                            <Text>{eData.status}</Text>
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
                            <Text>{eData.createdDtm}</Text>
                        </Right>
                    </CardItem>

                    <View style={styles.lineStyle} />
                    <CardItem>
                        <Text> {eData.designerremark} </Text>

                    </CardItem>
                    <View style={styles.lineStyle} />
                    <CardItem>
                        <Text>Disclaimer: I have understood the content of the report and approve the content of the same. I also authorize eSunScope and it’s team to prepare the RFP and invite bids for the system. I also authorize eSunScope to also evaluate the bids and negotiate on my behalf. </Text>


                    </CardItem>


                    <CardItem>
                        <Left>
                        <RadioGroup radioButtons={userConsent.data} onPress={onPress} flexDirection='row'/>
         
                        </Left>

                        <Right>
                            <Body>
                                <Text>Please Give Reason to Your Selection?</Text>
                                <TextInput style={styles.whiteBoarderInputContainer}
                                    onChangeText={customerFrp => setCustomerfrp(customerFrp)} />
                            </Body>
                        </Right>

                    </CardItem>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => { connectToNetwork() }}
                    >
                        <Text style={styles.buttonTextStyle}>Submit</Text>
                    </TouchableOpacity>

                </Card>
            );
        }else{
            post.push(
      
                <View >
                  <Text style={{
                    fontSize: 18,
                    textAlign: 'center',
                    padding: 20,
                    color:colors.CRED_BLACK

                }}>No Feasibility  Record Found  </Text>
                </View>
              )
        }

        return post;
    };


    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">

            {drawUserNameAndInquiryHeader()}
                <View style={{ padding: 15 }}>


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
                    {
                        <View>
                            <Text style={{
                                fontSize: 18,
                                textAlign: 'center',
                                padding: 20,
                                color:colors.CRED_BLACK

                            }}>
                                Feasibility Report </Text>

                        </View>
                    }


                    <View >

                        {renderpostTypes()}


                    </View>


                    
                </View>

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
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 40,
        margin: 10,
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

        alignItems: 'center',
    },

    container: {
        flex: 1,
        //backgroundColor: colors.CRED_BLACK,
        
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
    nameandinquiryheader: {
        backgroundColor: colors.CRED_BLACK,
        justifyContent: 'center',
        height: 50,
        color: colors.CRED_FONT_BRONZE,
        fontWeight: '800',
    },

    nameandinquiryheaderTextStyle: {
        color: colors.CRED_FONT_BRONZE,
        fontSize: 16,
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