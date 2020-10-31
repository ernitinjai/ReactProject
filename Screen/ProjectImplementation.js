// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, { Component, useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet, View, Text, ScrollView, Image, TextInput ,Linking} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import colors from './common/colors';

const ProjectImplementation = ({ navigation }) => {



    let [animating, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    let [customerFrp, setCustomerfrp] = useState('');
    let [customerapproval, setCustomerApproval] = useState('');
    let [isSubmittedSuccess, setIsSubmittedSuccess] = useState('false');
    const [eData, setResponseDataState] = useState('');

    useEffect(() => {
        setLoading(true);
        var _userId;

        var dataToSend = {
            user_id: global.user_id,
            enquiryid: global.enquiryid//global.inquiry_nu,
        }

        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log("formBody == " + formBody);
        fetch('http://esunscope.org/cms/api/user/getprojectprocess', {

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
                    if(responseJson[0].data.Projectprocess_found=="yes")
                    setResponseDataState(responseJson[0].data.projectprocess);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

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



    let renderpostTypes = () => {
        let post = [];
        if (eData === "") {
            post.push(
      
              <View style={styles.labelTextStyle}>
                <Text style={styles.labelTextStyle}>No Project Implementation Record Found  </Text>
              </View>
            )
          } else {

            eData.map((item) => {
            post.push(
                <Card  >
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>{item.type} </Text>
                            </Body>
                        </Left>
                        <Right>
                            <Text>{item.processdate}</Text>
                        </Right>
                    </CardItem>


                    <CardItem>
                        <Left>
                            <Body>
                                <Text>{item.processname} </Text>
                            </Body>
                        </Left>
                        <Right>
                            <Text>{item.comments}</Text>
                        </Right>
                    </CardItem>



                    <CardItem>
                        
                        <Right>

                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                               onPress={() => {renderPDF(item.processfile)}}

                            >
                                <Text style={styles.buttonTextStyle}>Views File</Text>
                            </TouchableOpacity>
                        </Right>
                    </CardItem>

                </Card>
            );
        });
      }
      return post;
    };


    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">


               
            {drawUserNameAndInquiryHeader()}

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
                        <View style={styles.labelTextStyle}>
                            <Text style={styles.labelTextStyle}>
                                Project Implementation Report </Text>

                        </View>
                    }


                    

                        {renderpostTypes()}


                   


                    
               


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
    labelTextStyle: {
        flex:1,
        color: colors.CRED_BLACK,
        fontSize: 18,
      
        alignItems: 'center',
        justifyContent: 'center',
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
export default ProjectImplementation;