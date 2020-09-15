import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet, View, Text, ScrollView,
  TouchableOpacity, Keyboard, Picker,
  KeyboardAvoidingView, AsyncStorage, YellowBox, PermissionsAndroid, ActivityIndicator
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import RadioGroup from 'react-native-radio-button-group';
import { Container, Button } from "native-base";
import DocumentPicker from 'react-native-document-picker';

import RNFetchBlob from 'rn-fetch-blob'
import Details from "./Details";
import colors from './common/colors';


const NewInquiry = ({ props, navigation }) => {

  
  let [userAddress, setAddress] = useState('');
  let [userPropertyType, setPropertyType] = useState('');
  let [userName, setFirstName] = useState('');
  let [userLastName, setLastName] = useState('');
  let [userMobileNumber, setMobileNumber] = useState();
  let [userLandlineNumber, setLandlineNumber] = useState();
  let [userBestTimeToCall, setBestTimeToCall] = useState('');
  let [userCurrency, setCurrency] = useState('');
  let [userAME, setAvgMonthlyElectricity] = useState('');
  let [userUploadBill, setUploadBill] = useState('');
  let [userRoofType, setRoofType] = useState('');
  let [userRoofSize, setRoofSize] = useState();
  let [userRefferalId, setRefferalId] = useState('');
  let [userComment, setComments] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  let [singleFile, setSingleFile] = useState('');
  let [animating, setAnimating] = useState(false);

  var radiogroup_options = [
    { id: 0, label: 'Residential' },
    { id: 1, label: 'Commercial' },
    { id: 2, label: 'Non-Profit' },
  ];
  useEffect(() => {
    

    YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);

    if (Platform.OS === 'ios') {
      //this.callLocation(that)
    } else {
      requestStoragePermission();
    }
  }, [])


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

  const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("file", {
      name: photo.name,
      type: 'image/jpeg/jpg',
      uri: 'file://' + photo.uri
      //Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  let uploadInformation = () => {


    /*var dataToSend = {
     //Not sure about this data
     countryshortcode:'IN',
     stateshortcode:'RJ',
     city:'Ajmer',
     state:'Ra',
     country:'india',
      user_id: 20339,
      bill_file: singleFile,
      propertytype: 'Residential',
      firstname: userName,
      lastname: userLastName,
      mobile: userMobileNumber,
      landline: userLandlineNumber,
      address: userAddress,
      lblcurrency: userCurrency,
      rooftype: userRoofType,
      roofsize: userRoofSize,
      refId: userRefferalId,
      averagemonthly: userAME,
      calltime: userBestTimeToCall,
      comments: userComment,
    };*/

    /*var dataToSend = {
      //Not sure about this data
      countryshortcode: 'IN',
      stateshortcode: 'RJ',
      city: 'Ajmer',
      state: 'rajasthan',
      country: 'india',
      user_id: '20339',

      propertytype: 'Residential',
      firstname: 'nitin',
      lastname: 'userLastName',
      mobile: '9752622533',
      landline: '12',
      address: 'userAddress',
      lblcurrency: 'INR',
      rooftype: 'userRoofType',
      roofsize: '200',
      refId: 'userRefferalId',
      averagemonthly: '2000',
      calltime: 'userBestTimeToCall',
      comments: 'userComment',
      pincode: '302015',
    };*/
    if (singleFile != null) {

      handleUploadPhoto();
    } else {
      //if no file selected the show alert
      console.log('Please Select File first');
    }
  };


  handleUploadPhoto = () => {

    setAnimating(true);
    const fileUri = Platform.OS === "android" ? singleFile.uri : singleFile.uri.replace("file://", "");

    console.log('fileUri ' + fileUri);
    RNFetchBlob.fetch('POST', 'http://esunscope.org/cms/api/user/drawYourRoof', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'bill_file', filename: singleFile.name, type: singleFile.type, data: RNFetchBlob.wrap(fileUri) },
      { name: 'countryshortcode', data: 'IN' },
      { name: 'stateshortcode', data: 'RJ' },
      { name: 'city', data: 'Ajmer' },
      { name: 'state', data: 'rajasthan' },
      { name: 'country', data: 'india' },
      { name: 'propertytype', data: 'Residential' },
      { name: 'user_id', data: global.user_id },
      { name: 'firstname', data: userName },
      { name: 'lastname', data: userLastName},
      { name: 'mobile', data: userMobileNumber },
      { name: 'landline', data: userLandlineNumber },
      { name: 'address', data: userAddress },
      { name: 'lblcurrency', data: userCurrency },
      { name: 'rooftype', data: userRoofType},
      { name: 'roofsize', data: userRoofSize },
      { name: 'refId', data: userRefferalId },
      { name: 'averagemonthly', data: userAME },
      { name: 'calltime', data: userBestTimeToCall },
      { name: 'comments', data: userComment },
      { name: 'pincode', data: '302015', }

    ]).uploadProgress({ interval: 250 }, (written, total) => {
      console.log('uploaded', written / total)
    })
      // listen to download progress event, every 10%
      .progress({ count: 10 }, (received, total) => {
        console.log('progress', received / total)
      }).then(response => response.json())
      .then(responseJson => {

        setAnimating(false);
        var jsonStringify = JSON.stringify(responseJson);
        var customername = JSON.parse(jsonStringify);

        if (customername[0].status == "error") {

          
          alert(customername[0].message);


          
        }
        else {

          console.log("customername ==  ", customername[0].data.firstname);
          console.log("customername ==  ", customername[0].data.inquirydata.enquiryno);
          //AsyncStorage.setItem('draw_roof_response', customername[0].data);
          var information = customername[0].data.inquirydata;
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
          navigation.navigate('Details')
        }
        
      }).catch((err) => {
        setAnimating(false);
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


  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView>
          <View>



            <Text style={styles.sectionHeader}>
              <Text > Address  </Text>
              <Text style={styles.subRedlabelHeader}> * </Text>
            </Text>
            <TextInput style={styles.whiteBoarderInputContainer}
              onChangeText={userAddress => setAddress(userAddress)} />

            <View style={styles.spacer}>
              <Text style={styles.labelHeader}> Your Property Type </Text>
              <View style={styles.spacer}>
                <RadioGroup horizontal
                  options={radiogroup_options}
                //onChange={userPropertyType => setPropertyType(userPropertyType)} userPropertyType={userPropertyType}
                //onChange={(option) => setPropertyType({ userPropertyType: option })}
                />
              </View>
            </View>

            <Text style={styles.sectionHeader}> Personal Information </Text>
            <View style={styles.rowContainer}>
              <View style={styles.fieldStyle} >
                <Text>
                  <Text style={styles.labelHeader}> First name </Text>
                  <Text style={styles.subRedlabelHeader}>*</Text>
                </Text>
                <TextInput style={styles.whiteBoarderInputContainer}
                  onChangeText={userName => setFirstName(userName)} />
              </View>

              <View style={styles.fieldStyle}>
                <Text style={styles.labelHeader}> Last name </Text>
                <TextInput style={styles.whiteBoarderInputContainer}
                  onChangeText={userLastName => setLastName(userLastName)} />
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.fieldStyle}>
                <Text>
                  <Text style={styles.labelHeader}> Mobile Number </Text>
                  <Text style={styles.subRedlabelHeader}>*</Text>
                </Text>

                <TextInput style={styles.whiteBoarderInputContainer}
                  onChangeText={userMobileNumber => setMobileNumber(userMobileNumber)} />
              </View>

              <View style={styles.fieldStyle}>
                <Text style={styles.labelHeader}> Landline Number </Text>
                <TextInput style={styles.whiteBoarderInputContainer}
                  onChangeText={userLandlineNumber => setLandlineNumber(userLandlineNumber)} />
              </View>
            </View>

            <Text style={styles.labelHeader}> Best Time to call </Text>
            <TextInput style={styles.whiteBoarderInputContainer}
              onChangeText={userBestTimeToCall => setBestTimeToCall(userBestTimeToCall)} />

            <Text style={styles.sectionHeader}> Site Information </Text>

            <View>
              <Text>
                <Text style={styles.labelHeader}> Currency </Text>
                <Text style={styles.subRedlabelHeader}>*</Text>
              </Text>

              <Picker
                selectedValue={userCurrency}
                onValueChange={userCurrency => setCurrency(userCurrency)}>
                <Picker.Item label="USD" value="US Dollars" />
                <Picker.Item label="EUR" value="Euro" />
                <Picker.Item label="NGN" value="Naira" />
              </Picker>


            </View>
            <View >
              <Text>
                <Text style={styles.labelHeader}> Average Monthly electricity </Text>
                <Text style={styles.subRedlabelHeader}>*</Text>
              </Text>
              <TextInput style={styles.whiteBoarderInputContainer}
                onChangeText={userAME => setAvgMonthlyElectricity(userAME)} />
            </View>

            <View style={styles.spacer}>
              <Text>
                <Text style={styles.labelHeader} > Upload bill   </Text>
                <Text style={styles.subGreenlabelHeader} >[File Size: Max 10 MB / Allowed Types:txt|gif|jpg|jpeg|png|pdf|doc|docx|rar|zip|xls|xlsx]</Text>
              </Text>
            </View>

            <View style={styles.whiteBoarderInputContainer}>
              <View style={styles.rowContainer} >

                <TouchableOpacity
                  style={styles.fileButtonStyle}
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



            <View style={styles.spacer} >
              <Text>
                <Text style={styles.labelHeader}> Roof Type </Text>
                <Text style={styles.subRedlabelHeader}>*</Text>
              </Text>
              <Picker
                selectedValue={userRoofType}
                onValueChange={userRoofType => setRoofType(userRoofType)}>
                <Picker.Item label="Select Roof Type" value="Select Roof Type" />
                <Picker.Item label="Concrete" value="Concrete" />
                <Picker.Item label="Metal Sheet" value="Metal Sheet" />
                <Picker.Item label="Concrete + Metal Sheet" value="Concrete + Metal Sheet" />
                <Picker.Item label="Tiles Roof" value="Tiles Roof" />
                <Picker.Item label="Asphalt Roof" value="Asphalt Roof" />
                <Picker.Item label="Shed" value="Shed" />
                <Picker.Item label="Carport" value="Carport" />
                <Picker.Item label="Not Sure" value="Not Sure" />

              </Picker>


            </View>
            <View>
              <Text style={styles.labelHeader}> Size (Sq.meters) * </Text>
              <TextInput style={styles.whiteBoarderInputContainer}
                onChangeText={userRoofSize => setRoofSize(userRoofSize)} />
            </View>


            <Text style={styles.labelHeader}> Referral Id </Text>
            <TextInput style={styles.whiteBoarderInputContainer}
              onChangeText={userRefferalId => setRefferalId(userRefferalId)} />

            <Text style={styles.labelHeader}> Comments </Text>
            <TextInput style={styles.whiteBoarderInputContainer}
              onChangeText={userComment => setComments(userComment)} />

            <ActivityIndicator
              animating={animating}
              color={colors.APP_YELLOW}
              size="large"
              style={styles.activityIndicator}
            />

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleUploadPhoto}>
              <Text style={styles.buttonTextStyle}>Calculate your Savings</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default NewInquiry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#F4F7F8'
  },

  sectionHeader: {
    flex: 1,
    alignItems: 'center',
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#EAEEEF',
    fontSize: 20,
    textDecorationStyle: 'solid',
  },

  labelHeader: {
    color: '#000000',
    textAlignVertical: 'center',
    textDecorationStyle: 'solid',
  },

  subGreenlabelHeader: {

    color: '#008000',
    textAlignVertical: 'center',
  },
  subRedlabelHeader: {

    color: '#FF0100',
    textAlignVertical: 'center',
  },

  spacer: {
    marginTop: 10,
    marginBottom: 10,
  },


  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between'
  },

  whiteBoarderInputContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    height: 50,
    color: '#000000',
    borderColor: '#E5E5E5',
    padding: 5,
  },
  fieldStyle: {
    width: '50%',
    margin: 5,

  },
  rightSidefieldStyle: {
    width: '50%',


  },
  fileButtonStyle: {
    backgroundColor: '#FFCE4A',
    borderWidth: 0,
    color: '#000000',
    borderColor: '#000000',
    height: 45,
    alignItems: 'center',
  },

  buttonStyle: {
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
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },

});


