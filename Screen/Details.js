// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, { Component, useState, useEffect } from 'react'
import { ActivityIndicator, TouchableOpacity, StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import colors from './common/colors';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatGrid } from 'react-native-super-grid';

const Details = ({ props, navigation }) => {

    let [animating, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    const [eData, setResponseDataState] = useState([]);
    let [isSubmittedSuccess, setIsSubmittedSuccess] = useState('false');
    const [items, setItems] = useState([
        { name: 'Total Roof Area', code: '#1abc9c', image: require('../Images/icon_3.png') },
        { name: 'Total Capacity in KW', code: '#2ecc71', image: require('../Images/capacity.png') },
        { name: 'Approximate Cost(INR )', code: '#3498db', image: require('../Images/apporximatecost.png') },
        { name: 'Payback Period', code: '#9b59b6', image: require('../Images/payback.png') },
        { name: 'Usable Area', code: '#34495e', image: require('../Images/usablearea.png') },
        { name: 'Annual energy in KWH', code: '#16a085', image: require('../Images/anualenergy.png') },
        { name: 'Approximate Savings (INR )', code: '#27ae60', image: require('../Images/totalsaving.png') },

    ]);



    useEffect(() => {
        setLoading(true);

        /*var _userId;
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
        inquiry_nu: "RJ/IN/20200904/00695",
        Property_Type: "Residential",
        Land_Line: "",
        Call_Time: "",
        Mobile: "",
        Average_Bill: "",
        Roof_Size: "",
        Inquiry_Date: "",

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
                
                <Text > Congratulations!</Text>
                <Text >
                Solar can save you INR 2,84,281.00/ year
    Payback in about 3.54 years </Text>
            </View>

        )
        return post;

    }




    return (
        <ScrollView style={{ flex: 1 }}>
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




            <Container style={{ padding: 15 }}>
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
                <Content >

                    {renderpostTypes()}
                    <Text> Disclaimer : These are estimated figures only and subject to change depending on solar panel technology, type selected and real site scenario. Our technical team will contact you for accurate estimates. </Text>

                </Content>
            </Container>



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
        height: 45,
        width: 80,
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