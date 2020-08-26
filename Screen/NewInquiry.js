import React, { Component, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Keyboard, Picker, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import RadioGroup from 'react-native-radio-button-group';
import { Container, Button } from "native-base";




const NewInquiry = props => {


  let [userAddress, setAddress] = useState('');
  let [userPropertyType, setPropertyType] = useState('');
  let [userName, setFirstName] = useState('');
  let [userLastName, setLastName] = useState('');
  let [userMobileNumber, setMobileNumber] = useState('');
  let [userLandlineNumber, setLandlineNumber] = useState('');
  let [userBestTimeToCall, setBestTimeToCall] = useState('');
  let [userCurrency, setCurrency] = useState('');
  let [userAME, setAvgMonthlyElectricity] = useState('');
  let [userUploadBill, setUploadBill] = useState('');
  let [userRoofType, setRoofType] = useState('');
  let [userRoofSize, setRoofSize] = useState('');
  let [userRefferalId, setRefferalId] = useState('');
  let [userComment, setComments] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  var radiogroup_options = [
    { id: 0, label: 'Residential' },
    { id: 1, label: 'Commercial' },
    { id: 2, label: 'Non-Profit' },
  ];


  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView>
          <View>

            <Text style={styles.sectionHeader}>
              <Text > Address  </Text>
              <Text style={styles.subRedlabelHeader}> * </Text>
            </Text>
            <TextInput style={styles.whiteBoarderInputContainer} />

            <Text style={styles.labelHeader}> Your Property Type </Text>
            <View>
              <RadioGroup horizontal
                options={radiogroup_options}
                onChange={(option) => setState({ userPropertyType: option })}
              />
            </View>

            <Text style={styles.sectionHeader}> Personal Information </Text>
            <View style={styles.rowContainer}>
              <View style={styles.fieldStyle} >
                <Text>
                  <Text style={styles.labelHeader}> First name </Text>
                  <Text style={styles.subRedlabelHeader}>*</Text>
                </Text>
                <TextInput style={styles.whiteBoarderInputContainer} />
              </View>

              <View style={styles.fieldStyle}>
                <Text style={styles.labelHeader}> Last name </Text>
                <TextInput style={styles.whiteBoarderInputContainer} />
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.fieldStyle}>
                <Text>
                  <Text style={styles.labelHeader}> Mobile Number </Text>
                  <Text style={styles.subRedlabelHeader}>*</Text>
                </Text>

                <TextInput style={styles.whiteBoarderInputContainer} />
              </View>

              <View style={styles.fieldStyle}>
                <Text style={styles.labelHeader}> Landline Number </Text>
                <TextInput style={styles.whiteBoarderInputContainer} />
              </View>
            </View>

            <Text style={styles.labelHeader}> Best Time to call </Text>
            <TextInput style={styles.whiteBoarderInputContainer} />

            <Text style={styles.sectionHeader}> Site Information </Text>
            <View style={styles.rowContainer}>
              <View>
                <Text>
                  <Text style={styles.labelHeader}> Currency </Text>
                  <Text style={styles.subRedlabelHeader}>*</Text>
                </Text>

                <Picker style={styles.fieldStyle}
                  selectedValue={userCurrency}
                  onValueChange={userCurrency => setCurrency(userCurrency)}>
                  <Picker.Item label="USD" value="US Dollars" />
                  <Picker.Item label="EUR" value="Euro" />
                  <Picker.Item label="NGN" value="Naira" />
                </Picker>


              </View>
              <View style={styles.fieldStyle}>
                <Text>
                  <Text style={styles.labelHeader}> Average Monthly electricity </Text>
                  <Text style={styles.subRedlabelHeader}>*</Text>
                </Text>
                <TextInput style={styles.whiteBoarderInputContainer} />
              </View>
            </View>

            <Text>
              <Text style={styles.labelHeader} > Upload bill   </Text>
              <Text style={styles.subGreenlabelHeader} >[File Size: Max 10 MB / Allowed Types:txt|gif|jpg|jpeg|png|pdf|doc|docx|rar|zip|xls|xlsx]</Text>
            </Text>

            <View style={styles.whiteBoarderInputContainer}>
              <View style={styles.rowContainer} >

                <TouchableOpacity
                  style={styles.fileButtonStyle}
                  activeOpacity={0.5}
                  onPress={() => props.navigation.navigate('OtpVerification')}>
                  <Text style={styles.buttonTextStyle}>Choose file</Text>
                </TouchableOpacity>
                <Text>File is </Text>
              </View>
            </View>


            <View style={styles.rowContainer} >
              <View style={styles.fieldStyle}>
                <Text>
              <Text style={styles.labelHeader}> Roof Type </Text>
                  <Text style={styles.subRedlabelHeader}>*</Text>
                  </Text>
                <Picker style={styles.fieldStyle}
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
                <TextInput style={styles.whiteBoarderInputContainer} />
              </View>
            </View>

            <Text style={styles.labelHeader}> Referral Id </Text>
            <TextInput style={styles.whiteBoarderInputContainer} />

            <Text style={styles.labelHeader}> Comments </Text>
            <TextInput style={styles.whiteBoarderInputContainer} />

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => props.navigation.navigate('OtpVerification')}>
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
    textAlignVertical: 'center',
    backgroundColor: '#EAEEEF',
    textDecorationStyle: 'solid',
  },

  labelHeader: {
    flex: 1,
    marginTop: 10,
    color: '#000000',
    textAlignVertical: 'center',
    textDecorationStyle: 'solid',
  },

  subGreenlabelHeader: {
    flex: 1,
    color: '#008000',
    textAlignVertical: 'center',
  },
  subRedlabelHeader: {
    flex: 1,
    color: '#FF0100',
    textAlignVertical: 'center',
  },


  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between'
  },

  whiteBoarderInputContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    color: '#000000',
    borderColor: '#E5E5E5',
  },
  fieldStyle: {
    flex: 1,
    width: 200,
    margin: 5,
  },
  fileButtonStyle: {
    backgroundColor: '#EFEFEF',
    borderWidth: 0,
    color: '#000000',
    borderColor: '#000000',
    height: 40,
    alignItems: 'center',

    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  buttonStyle: {
    backgroundColor: '#FFCE4A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#000000',
    paddingVertical: 10,
    fontSize: 16,
  },

});


