import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet, View, Text, ScrollView,
  TouchableOpacity, Keyboard, TextInput,
  KeyboardAvoidingView, AsyncStorage, YellowBox, PermissionsAndroid, ActivityIndicator
} from "react-native";



//import RadioGroup from 'react-native-radio-button-group';
import RadioGroup from 'react-native-radio-buttons-group';

import {Picker} from '@react-native-community/picker';

import DocumentPicker from 'react-native-document-picker';

import RNFetchBlob from 'rn-fetch-blob'
import Details from "./Details";
import colors from './common/colors';
//import { Colors } from "react-native/Libraries/NewAppScreen";


const NewInquiry = ({ props, navigation }) => {


  let [userAddress, setAddress] = useState(global.mapaddress);
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
  let [propertyType, setpropertyType] = useState({data: [
    {
        label: 'Residential',
    },
    {
        label: 'Commercial',
    },
    {
        label: 'Non-Profit',
    },
],});

  let selectedButton = propertyType.data.find(e => e.selected == true);
  selectedButton = selectedButton ? selectedButton.value : propertyType.data[0].label;
  let onPress = data => setpropertyType({ data }); 

  
  useEffect(() => {


    //YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);

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

  /*8const createFormData = (photo, body) => {
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
  };*/

  /*let uploadInformation = () => {
    if (singleFile != null) {

      handleUploadPhoto();
    } else {
      //if no file selected the show alert
      console.log('Please Select File first');
    }
  };*/
  
  const createFormData = (photo, body) => {
    const data = new FormData();
  
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
  };

  function newhandleUploadPhoto(){
    setAnimating(true);
    fetch("http://esunscope.org/cms/api/user/drawYourRoof", {
      method: "POST",
      body: createFormData(singleFile, { countryshortcode: global.mapcountry, countryshortcode:  global.mapcountry ,
         stateshortcode: global.mapstate ,
         city: global.mapcity ,
         state: global.mapstate ,
         country: global.mapcountry ,
         pincode: global.mappincode ,
         propertytype: selectedButton ,
        user_id: global.user_id   ,
          firstname : global.firstname   ,
          lastname : global.lastname   ,
          mobile : global.mobile   ,
        //   name: 'landline : userLandlineNumber   ,
          address : userAddress   ,
          lblcurrency : userCurrency   ,
          rooftype : userRoofType   ,
          roofsize : global.areaCalc   ,
          refId : userRefferalId   ,
          averagemonthly : userAME   ,
          calltime : userBestTimeToCall   ,
          comments : userComment   ,
          longitude:global.longitude  ,
          latitude:global.latitude  })
    })
      .then(response => response.text())
      .then(response => {
        setAnimating(false);
        // console.log("upload succes", response);
        // alert("Upload success!");
        // navigation.navigate('Details');
        var jsonStringify = JSON.stringify(response);
       // alert(jsonStringify);
        var data = JSON.parse(jsonStringify);

        if (data[0].status == "error") {

          alert(data[0].message);

        }
        else {
          alert("Upload Successful!");
          navigation.navigate('Details');
        }

        //this.setState({ photo: null });
      })
      .catch(error => {
        setAnimating(false);
        console.log("upload error", error);
        alert("Upload failed!"+error);
      });
  };

  function handleUploadPhoto() {

    
    var fileUri="";
    if(singleFile.uri){
     fileUri = Platform.OS === "android" ? singleFile.uri : singleFile.uri.replace("file://", "");
    }else{
      
      return;
    }
    //alert("*******"+fileUri);
    setAnimating(true);
    console.log('fileUri ' + fileUri);

    /*let bodyData=
    [
      { name: 'bill_file', filename: singleFile.name, type: singleFile.type, data: RNFetchBlob.wrap(fileUri) },
      { countryshortcode:  global.mapcountry },
      { stateshortcode: global.mapstate },
      { city: global.mapcity },
      { state: global.mapstate },
      { country: global.mapcountry },
      { pincode: global.mappincode },
      { propertytype: selectedButton },
      { user_id: global.user_id },
      { firstname : global.firstname },
      { lastname : global.lastname },
      { mobile : global.mobile },
      // { name: 'landline : userLandlineNumber },
      { address : userAddress },
      { lblcurrency : userCurrency },
      { rooftype : userRoofType },
      { roofsize : global.areaCalc },
      { refId : userRefferalId },
      { averagemonthly : userAME },
      { calltime : userBestTimeToCall },
      { comments : userComment },
      { longitude:global.longitude},
      { latitude:global.latitude},
    ];

    bodyData.map(n => (
      console.log("**********"+JSON.stringify(n))
    ));*/


    RNFetchBlob.fetch('POST', 'http://esunscope.org/cms/api/user/drawYourRoof', {
      
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'bill_file', filename: singleFile.name, type: singleFile.type, data: RNFetchBlob.wrap(fileUri) },
      { countryshortcode:  global.mapcountry },
      { stateshortcode: global.mapstate },
      { city: global.mapcity },
      { state: global.mapstate },
      { country: global.mapcountry },
      { pincode: global.mappincode },
      { propertytype: selectedButton },
      { user_id: global.user_id },
      { firstname : global.firstname },
      { lastname : global.lastname },
      { mobile : global.mobile },
      // { name: 'landline : userLandlineNumber },
      { address : userAddress },
      { lblcurrency : userCurrency },
      { rooftype : userRoofType },
      { roofsize : global.areaCalc },
      { refId : userRefferalId },
      { averagemonthly : userAME },
      { calltime : userBestTimeToCall },
      { comments : userComment },
      { longitude:global.longitude},
      { latitude:global.latitude},
      

    ]).uploadProgress({ interval: 250 }, (written, total) => {
      console.log('uploaded', written / total)
    })
      // listen to download progress event, every 10%
      .progress({ count: 10 }, (received, total) => {
        console.log('progress', received / total)
      }).then(response => response.text())
      .then(responseJson => {

        setAnimating(false);
        var jsonStringify = JSON.stringify(responseJson);
        alert(jsonStringify);
        var customername = JSON.parse(jsonStringify);

        if (customername[0].status == "error") {


          alert(customername[0].message);



        }
        else {

          //console.log("customername ==  ", customername[0].data.firstname);
          //console.log("customername ==  ", customername[0].data.inquirydata.enquiryno);
          //AsyncStorage.setItem('draw_roof_response', customername[0].data);
          /*var information = customername[0].data.inquirydata;
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
          global.Inquiry_Date = information.createdDtm;*/
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
            <TextInput style={[styles.whiteBoarderInputContainer,styles.margin10,styles.addressFieldHeight]}
              defaultValue = {global.mapaddress}
              multiline={true}
              onChangeText={userAddress => setAddress(userAddress)} />

            <View style={styles.spacer}>
              <Text style={styles.labelHeader}> Your Property Type </Text>
              <View style={styles.spacer}>
              <View style={styles.container}>
                <RadioGroup radioButtons={propertyType.data} onPress={onPress} flexDirection='row'/>
            </View>
              </View>
            </View>

            {/* <Text style={styles.sectionHeader}> Personal Information </Text>
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
            </View> */}

            <Text style={styles.labelHeader}> Best Time to call </Text>
            <TextInput style={[styles.whiteBoarderInputContainer,styles.margin10]}
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
                <Picker.Item label="INR" value="Rupeese" />
                <Picker.Item label="DHS" value="Dirham" />
                <Picker.Item label="USD" value="US Dollars" />
                <Picker.Item label="EUR" value="Euro" />
                
              </Picker>


            </View>
            <View >
              <Text>
                <Text style={styles.labelHeader}> Average Monthly electricity </Text>
                <Text style={styles.subRedlabelHeader}>*</Text>
              </Text>
              <TextInput style={[styles.whiteBoarderInputContainer,styles.margin10]}
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
              <TextInput style={[styles.whiteBoarderInputContainer,styles.margin10]}
                value ={global.areaCalc}
                />
            </View>


            <Text style={styles.labelHeader}> Referral Id </Text>
            <TextInput style={[styles.whiteBoarderInputContainer,styles.margin10]}
              onChangeText={userRefferalId => setRefferalId(userRefferalId)} />

            <Text style={styles.labelHeader}> Comments </Text>
            <TextInput style={[styles.whiteBoarderInputContainer,styles.margin10]}
              onChangeText={userComment => setComments(userComment)} />
            <View>
              <ActivityIndicator
                animating={animating}
                color={colors.APP_YELLOW}
                size="large"
                style={styles.activityIndicator}
                
              />
               
            </View>

            

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={newhandleUploadPhoto}>
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

  margin10:{
    padding:15,
    textAlignVertical: 'center',
    alignItems:'center',
    justifyContent: 'center',
    color:colors.CRED_FONT_BRONZE,
    fontSize:18

  },

  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
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
    margin:10,
    justifyContent: 'center',
    borderRadius: 30,
    //borderColor: colors.WHITE,
    shadowColor: colors.LIGHT_GREY_FONT,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
  },
  addressFieldHeight:{
     height:100,
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
    height: 35,
    width:140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: colors.APP_YELLOW,
    borderColor: colors.CRED_BLACK,
    shadowColor: colors.CRED_BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
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
    justifyContent: 'center',
    backgroundColor: colors.APP_YELLOW,
    borderColor: colors.CRED_BLACK,
    shadowColor: colors.CRED_BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
    
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


