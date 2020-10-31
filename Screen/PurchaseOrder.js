// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, { Component, useState, useEffect } from 'react'
import { ActivityIndicator, TouchableOpacity, StyleSheet, View, Text, ScrollView, Image ,Linking} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import colors from './common/colors';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatGrid } from 'react-native-super-grid';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob'

const PurchaseOrder = ({ navigation }) => {



    let [animating, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    let [singleFile, setSingleFile] = useState('');
    const [eData, setResponseDataState] = useState({
        inquiryInfo: {
            propertytype: "", Address: "", createdDtm: ""
        },
        awardedbid: {
            customerstatus: ""
        }

    });

    let [isSubmittedSuccess, setIsSubmittedSuccess] = useState('false');

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
        fetch('http://esunscope.org/cms/api/user/getporequest', {

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
                    if (responseJson[0].data.purchaseOrder_found == "yes")
                        setResponseDataState(responseJson[0].data);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    let selectFile = async () => {
        //Opening Document Picker to select one file
        try {
            const res = await DocumentPicker.pick({
                //Provide which type of file you want user to pick
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            //Setting the state to show single file attributes
            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
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


    function renderPDF(processfile) {
        Linking.openURL('http://epc.esunscope.org/uploads/po/'+processfile)
    };

    function handleUploadPhoto() {

        setLoading(true);
        const fileUri = Platform.OS === "android" ? singleFile.uri : singleFile.uri.replace("file://", "");

        console.log('fileUri ' + fileUri);
        RNFetchBlob.fetch('POST', 'http://esunscope.org/cms/api/user/uploadpoapproval', {
            Authorization: "Bearer access-token",
            'Content-Type': 'multipart/form-data',
        }, [
            { name: 'uploadpoapproval', filename: singleFile.name, type: singleFile.type, data: RNFetchBlob.wrap(fileUri) },
            { name: 'user_id', data: global.user_id },
            { name: 'enquiryid', data: global.enquiryid }


        ]).uploadProgress({ interval: 250 }, (written, total) => {
            console.log('uploaded', written / total)
        })
            // listen to download progress event, every 10%
            .progress({ count: 10 }, (received, total) => {
                console.log('progress', received / total)
            }).then(response => response.text())
            .then(responseJson => {

                setLoading(false);
                var jsonStringify = JSON.stringify(responseJson);
                var result = JSON.parse(jsonStringify);

                if (result[0].status == "error") {
                    alert(result[0].message);
                }
                else {
                    alert("Thanks PO Uploaded Successfully !");
                    //alert(jsonStringify);

                }

            }).catch((err) => {
                setLoading(false);
                console.log("upload error ", err);
                alert("Upload failed! " + err + singleFile.uri);
            })

    };

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "eSunScope need to read storage Permission",
                    message:
                        "eSunScope App needs access to your phone storage " +
                        "so you can upload document and pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the storage");
            } else {
                console.log("storage permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    let renderpostTypes = () => {

        console.log(" eData ==" + JSON.stringify(eData));

        let post = [];

        if (eData.inquiryInfo.propertytype != "") {
            post.push(
                <Card  >

                    <CardItem>
                        <Left>
                            <Body>
                                <Text>Property Type </Text>
                            </Body>
                        </Left>
                        <Right>
                            <Text>{eData.inquiryInfo.propertytype}</Text>
                        </Right>
                    </CardItem>

                    <View style={styles.lineStyle} />


                    <CardItem>
                        <Left>
                            <Body>
                                <Text>Address </Text>
                            </Body>
                        </Left>
                        <Right>
                            <Text>{eData.inquiryInfo.Address}</Text>
                        </Right>
                    </CardItem>

                    <View style={styles.lineStyle} />



                    <CardItem>
                        <Left>
                            <Body>
                                <Text>Purchase Order </Text>
                            </Body>
                        </Left>
                        <Right>

                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                            onPress={() => {renderPDF(eData.inquiryInfo.RFP_doc)}}

                            >
                                <Text style={styles.buttonTextStyle}>View/Download</Text>
                            </TouchableOpacity>
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
                            <Text>{eData.inquiryInfo.createdDtm}</Text>
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
                            <Text>{eData.awardedbid.customerstatus}</Text>
                        </Right>
                    </CardItem>



                    <View style={styles.lineStyle} />


                    <CardItem >
                        <Text >Upload Signed PO (Only PDF,Max 10MB)</Text>
                    </CardItem>

                    <CardItem>
                        <View style={styles.whiteBoarderInputContainer}>
                            <View style={styles.rowContainer} >

                                <TouchableOpacity
                                    style={styles.chooseFileButtonStyle}
                                    activeOpacity={0.5}
                                    onPress={selectFile}>
                                    <Text style={styles.buttonTextStyle}>Choose file</Text>
                                </TouchableOpacity>
                                <Text>
                                    File Name:{' '}
                                    {singleFile.name ? singleFile.name : ''}

                                </Text>
                            </View>
                        </View>
                    </CardItem>

                    <CardItem>
                        <Text> Disclaimer: I have understood the content of the PO and signed the content of the same. </Text>
                    </CardItem>
                    <CardItem>
                        <TouchableOpacity
                            style={styles.uploaButtonStyle}
                            activeOpacity={0.5}
                            onPress={handleUploadPhoto}

                        >
                            <Text style={styles.uploaButtonTextStyle}>UPLOAD</Text>
                        </TouchableOpacity>
                    </CardItem>

                </Card>


            );
        }
        else {
            post.push(
                <View style={styles.labelTextStyle}>
                    <Text style={styles.labelTextStyle}>No Purchase order found</Text>
                </View>
            );
        }

        return post;
    };


    return (

        <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ padding: 15 }}>
            {drawUserNameAndInquiryHeader()}
                <View >
                    {renderpostTypes()}
                </View>

                <View>
                    <ActivityIndicator
                        animating={animating}
                        color={colors.APP_YELLOW}
                        size="large"
                        style={styles.activityIndicator}
                    />
                </View>

            </View>
        </ScrollView>



    )
}

const styles = StyleSheet.create({

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
        width: 150,
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    labelTextStyle: {
        flex:1,
        color: colors.CRED_BLACK,
        fontSize: 22,

        alignItems: 'center',
        justifyContent: 'center',
    },


    uploaButtonStyle: {
        flex: 1,
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    uploaButtonTextStyle: {
        color: '#000000',
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


    spacer: {
        marginTop: 10,
        marginBottom: 10,
    },


    whiteBoarderInputContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        height: 55,
        color: '#000000',
        borderColor: '#E5E5E5',
        padding: 5,
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    chooseFileButtonStyle: {
        backgroundColor: '#FFCE4A',
        borderWidth: 0,
        color: '#000000',
        borderColor: '#000000',
        height: 40,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
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
export default PurchaseOrder;