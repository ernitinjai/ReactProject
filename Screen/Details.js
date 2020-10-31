// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, { Component, useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import colors from './common/colors';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatGrid } from 'react-native-super-grid';

const Details = ({ navigation }) => {



    let [animating, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    const [eData, setResponseDataState] = useState([]);
    let [isSubmittedSuccess, setIsSubmittedSuccess] = useState('false');
    const [items, setItems] = useState([
        { name: 'Total Roof Area', code: global.roof_area, image: require('../Images/icon_3.png') },
        { name: 'Total Capacity in KW', code: global.total_capacity, image: require('../Images/capacity.png') },
        { name: 'Approximate Cost(INR )', code: global.apx_cost, image: require('../Images/apporximatecost.png') },
        { name: 'Payback Period', code: global.payback_period, image: require('../Images/payback.png') },
        { name: 'Usable Area', code: global.usable_area, image: require('../Images/usablearea.png') },
        { name: 'Annual energy in KWH', code: global.annal_energy, image: require('../Images/anualenergy.png') },
        { name: 'Approximate Savings (INR )', code: global.saving, image: require('../Images/totalsaving.png') },

    ]);

    const [buttons, setButtonItems] = useState([
        { name: 'Feasibility Report' },
        { name: 'View Quotes' },
        { name: 'Purchase Orders' },
        { name: 'Project Implementation' },
    ]);



    useEffect(() => {
        setLoading(true);



        var _userId;
        /*AsyncStorage.getItem('user_id').then((userId) => {
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
          });*/

    }, []);


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




    let renderpostTypes = () => {

        console.log(" eData ==" + JSON.stringify(eData));

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
                            <Text>Land-Line </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text>{item.Land_Line}</Text>
                    </Right>
                </CardItem>

                <View style={styles.lineStyle} />

                <CardItem>
                    <Left>
                        <Body>
                            <Text>Call Time </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text>{item.Call_Time}</Text>
                    </Right>
                </CardItem>

                <View style={styles.lineStyle} />

                <CardItem>
                    <Left>
                        <Body>
                            <Text>Mobile </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text>{item.Mobile}</Text>
                    </Right>
                </CardItem>

                <View style={styles.lineStyle} />

                <CardItem>
                    <Left>
                        <Body>
                            <Text>Average Bill </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text>{item.Average_Bill}</Text>
                    </Right>
                </CardItem>

                <View style={styles.lineStyle} />

                <CardItem>
                    <Left>
                        <Body>
                            <Text>Roof Size </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text>{item.Roof_Size}</Text>
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


            </Card>
        );

        return post;
    };

    let renderHeader = () => {
        let post = [];
        post.push(
            <View style={styles.header}>

                <Text style={styles.bigTextStyle}> Congratulations!</Text>
                <Text >
                    Solar can save you INR <Text style={styles.bigTextStyle}>{global.saving}</Text>/year
    Payback in about <Text style={styles.bigTextStyle}>{global.payback_period}</Text> years </Text>
            </View>

        )
        return post;

    }

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


 function handleButtonPress(name){
    
    if (name === "View Quotes") {
        //alert("Create bid screen");
        navigation.navigate('BidsList');
        
      } else if (name === "Feasibility Report") {
        navigation.navigate('FeasibilityStudy');
      } else if(name === "Purchase Orders"){
        navigation.navigate('PurchaseOrder');
        //alert("We will notify you as soon as possible");
      }else if(name === "Project Implementation"){
        navigation.navigate('ProjectImplementation');
        //alert("We will notify you as soon as possible");
      }

 }

 



    return (

        <ScrollView style={{ flex: 1 }}>

            {drawUserNameAndInquiryHeader()}


            <FlatGrid
                itemDimension={130}
                data={buttons}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                spacing={10}
                renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.buttonStyle]}
                            onPress={() => handleButtonPress(item.name)}>
                            <Text style={styles.itemName}>{item.name}</Text>
                           
                        </TouchableOpacity>
                )}
            />

            {renderHeader()}
            {


                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 20
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: 'center'

                        }}>
                        Your roof is good for solar!
                         </Text>
                    <Image style={styles.solarImage}
                        source={require('../Images/solor_show.png')}

                    />

                </View>


            }

            <View>
                <Text style={styles.itemName}> Your Estimated Savings with Solar</Text>
                <Text style={styles.subitemName}>This is an approximate estimate generated form the data you have provided. There might be a small deviation from the actual figures. The actual figures may differ depending upon the size of your roof, the equipment selected and finance options/ Govement subsidies in your region.</Text>

            </View>

            <FlatGrid
                itemDimension={130}
                data={items}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                spacing={10}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer]}>
                        <Image style={styles.itemImage} source={item.image} />
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemCode}>{item.code}</Text>

                    </View>
                )}
            />

            <View style={{ padding: 15 }}>
                {
                    <View>
                        <Text style={{
                            fontSize: 18,
                            textAlign: 'center',
                            padding: 20

                        }}>
                            Details
            </Text>
                    </View>
                }
                <View >

                    {renderpostTypes()}
                    <Text> Disclaimer : These are estimated figures only and subject to change depending on solar panel technology, type selected and real site scenario. Our technical team will contact you for accurate estimates. </Text>

                </View>
            </View>



        </ScrollView>



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
        marginTop: 7,
        alignItems: 'center',
      },

      bigTextStyle: {
        color: colors.GREY,
        fontSize: 22,
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
        height: 70,
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
        fontSize: 20,
        alignSelf: 'center',
        color: colors.CRED_FONT_BRONZE,
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
});
export default Details;