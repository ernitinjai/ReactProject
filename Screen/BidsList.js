import React, { Component, useState, useEffect } from 'react';
import colors from './common/colors';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, Image, ActivityIndicator, ScrollView, Alert } from 'react-native';

import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

const BidsList = ({ navigation }) => {

    let [selectedItems, setSelectedListItem] = useState({
        enquiryid: "",
        installer_id: "",
        bid_id: "",
    });

    

    const iconChecked = require("../Images/checked.png");
    let [animating, setLoading] = useState(false);
    const [eData, setResponseDataState] = useState([]);
    const [bidsFound, setBidFoundState] = useState('');
    const [refresh, setRefresh] = useState(false);



    useEffect(() => {
        setLoading(true);
        var _userId;

        var dataToSend = {
            user_id: global.user_id,
            enquiryid: global.enquiryid,//global.inquiry_nu,
        }

        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log("formBody == " + formBody);
        fetch('http://esunscope.org/cms/api/user/getquote', {

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
                    setBidFoundState(responseJson[0].data.bids_found)
                    setResponseDataState(responseJson[0].data.bids);

                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    function awardProject() {
        setLoading(true);
        var _userId;

        if (selectedItems.installer_id === '') {
            alert("You have not selected any bid, please select one of them.")
            return;
        }

        var formBody = [];
        for (var key in selectedItems) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(selectedItems[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log("formBody == " + formBody);
        fetch('http://esunscope.org/cms/api/user/awardquote', {

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
                    Alert.alert(
                        responseJson[0].status,
                        responseJson[0].message,
                        [
                            {
                                text: 'Ok',
                                onPress: () => {

                                    navigation.navigate('DrawRoofScreen');
                                },
                            },
                        ],
                        { cancelable: false }
                    );

                } else {
                    alert("TODO : BidsList error ");
                }
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
                console.error(error);
            });

    };

    let renderListItems = () => {

        console.log(" eData ==" + JSON.stringify(eData));

        let post = [];

        if (bidsFound === "yes") {
            post.push(
                <View>
                <View style={styles.rowsontainer}>

                <FlatList
                    horizontal


                    data=
                    {[{
                        biddername: 'Bidder Name', module: 'Module(Make/Tier)', inverter: 'Inverter(Make/Origin)', capacitymwac: 'Installed Capacity AC (kW)',
                        capacitymwdc: 'Installed Capacity DC (kW)', energydegradation: '1st Year Energy Degradation (kWH)', degradation: '1st Year Degradation(%)', annualdegradation: 'Annual Degradation(%)', designlife: 'Design Life(Years)', warrantyperiod: 'Solar Module Warranty Period(Years)'
                        , warrantyremedy: 'Solar Module Warranty Remedy', inverterperiod: 'Inverter Warranty Period(Years)',
                        inverterremedy: 'Inverter Warranty Remedy', defect: 'Defect Liability/ system warranty',
                        reference: 'Solar References', payment: 'Payment Terms', project_price: 'Total Price(Local Currency)', exceptions: 'Exceptions',
                        completionperiod: 'Completion Period', recommendation: 'EPC Comments', epcclarificationfiles: 'EPC File', epcbidrecommendation: 'EPC Plan', select: 'SELECT', key: '1'
                    },
                    ]}
                    renderItem={({ item }) => {
                        return (
                            <View >
                                <Card style={styles.listcontainer}
                                    title={null}

                                >
                                    <Text style={styles.textcontainer}>
                                        {item.biddername}
                                    </Text>

                                    <View style={styles.lineStyle} />


                                    <Text style={styles.textcontainer}>
                                        {item.module}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.inverter}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.capacitymwac}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.capacitymwdc}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.energydegradation}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.degradation}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.annualdegradation}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.designlife}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.warrantyperiod}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.warrantyremedy}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.inverterperiod}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.inverterremedy}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.defect}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.reference}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.payment}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.project_price}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.exceptions}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.completionperiod}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.recommendation}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.epcclarificationfiles}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.epcbidrecommendation}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.select}
                                    </Text>

                                </Card>

                            </View>

                        );
                    }}
                //keyExtractor={(item) => item.key}
                //keyExtractor={(item, index) => index}
                />

                <FlatList
                    horizontal
                    keyExtractor={(item) => item.installer_id}
                    extraData={refresh}
                    data={eData}

                    renderItem={({ item }) => {
                        return (
                            <View style={styles.listcontainer}>
                                <Card 
                                    title={null}>

                                    <Text style={styles.textcontainer}>
                                        {item.installer_id}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.module}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.inverter}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.capacitymwac}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.capacitymwdc}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.energydegradation}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.degradation}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.annualdegradation}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.designlife}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.warrantyperiod}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.warrantyremedy}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.inverterperiod}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.inverterremedy}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.defect}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.reference}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.payment}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.project_price}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.exceptions}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.completionperiod}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.recommendation}
                                    </Text>

                                    <View style={styles.lineStyle} />
                                    <Text style={styles.textcontainer}>
                                        {item.epcclarificationfiles}
                                    </Text>

                                    <View style={styles.lineStyle} />

                                    <Text style={styles.textcontainer}>
                                        {item.epcbidrecommendation}
                                    </Text>
                                    <View style={styles.lineStyle} />
                                    <TouchableHighlight
                                        style={styles.boxSelect}

                                        onPress={() => {

                                            if(refresh || selectedItems.installer_id != item.installer_id){
                                            selectedItems.installer_id = item.installer_id;
                                            selectedItems.bid_id = item.bid_id;
                                            setSelectedListItem(selectedItems);
                                            }else{
                                                selectedItems.installer_id = "";
                                                selectedItems.bid_id = "";
                                                setSelectedListItem(selectedItems); 
                                            }
                                            //alert(selectedItems.installer_id);
                                            setRefresh(!refresh);
                                            
                                        }}
                                    >
                                        <View style={styles.contentChecked}>
                                            {selectedItems.installer_id === item.installer_id && <Image source={iconChecked} style={styles.iconChecked} />}
                                        </View>
                                    </TouchableHighlight>
                                </Card>

                            </View>

                        );
                    }}
                //keyExtractor={(item) => item.key}
                //keyExtractor={(item, index) => index}
                />
            </View>

            <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => { awardProject() }}>
                        <Text style={styles.buttonTextStyle}>AWARD PROJECT</Text>
                    </TouchableOpacity>
                    <Text>Disclaimer: By selecting the most preferred bidder above, I authorize eSunScope to finalise the discussions with selected Bidder and start purchase order and contract process.</Text>
                </View>

            </View>

                );
            }
            else {
                post.push(
                    <View style={styles.labelTextStyle}>
                        <Text style={styles.labelTextStyle}>No Bids found</Text>
                    </View>
                );
            }
    
            return post;
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


    return (
        

        //TODO : if bids_found #NO# , do not render List item name, awarded : 1 then do not show Awared Button
        <ScrollView style={{ flex: 1 }}>
             {drawUserNameAndInquiryHeader()}
            <View style={styles.container}>

           
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
                <View >
                    {renderListItems()}
                </View>
               
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        paddingTop: 40,
    },
    rowsontainer: {
        flexDirection: 'row'
    },
    listcontainer: {
        width: 180,
    },
    textcontainer: {
        marginBottom: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        fontSize: 10,
        alignSelf: 'baseline',
        flexWrap: "wrap",
        margin:10,
    },
    buttonStyle: {

        backgroundColor: '#FFCE4A',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 35,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

        marginTop: 20,
        marginBottom: 20,
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
        justifyContent: 'center',
    },
    labelTextStyle: {
        color: colors.BLACK,
        fontSize: 22,

        alignItems: 'center',
        justifyContent: 'center',
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: '#DDDDDD',
        margin: 10,
    },
    boxSelect: {
        flex:1,
        backgroundColor: '#FFCE4A',
        color: 'black',
        
        
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    contentChecked: {
        flex:1,
        color: 'black',
        
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconChecked: {
        marginRight: 0
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


});

export default BidsList;