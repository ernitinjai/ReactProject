// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView } from 'react-native';

const FirstPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16,alignItems:"center" }}>
        <View
          style={{
            alignItems:"center",
            flexDirection: 'row'
          }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center'
              
            }}>
            Add new Inquiry
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text>Draw roof</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          React Native Tab Navigation
        </Text>
        <Text
          style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginLeft:20,
    
  },
});
export default FirstPage;