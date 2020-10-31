// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Icon, Left, Body, Right } from 'native-base';

const SecondPage = ({props,navigation}) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{  padding: 16,alignItems:"center" }}>
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
          Coming Soon ....
        </Text>
        
      </View>
      
    </View>

    
  </SafeAreaView>
  )

  /*return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{  padding: 16,alignItems:"center" }}>
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
            Request O&M
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Draw roof')}>
            <Text>Request O&M</Text>
          </TouchableOpacity>
        </View>
        
      </View>

      <Container style={{  padding: 15 }}>
      <View>
            <Text style={{
              fontSize: 18,
              textAlign: 'center',
              padding:20
              
            }}>
            O&M Sites
            </Text>
          </View>
        <Content>
         
          {renderpostTypes()}
      </Content>
    </Container>
    </SafeAreaView>

   
  )*/
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginLeft:20,
    
  },
});
export default SecondPage;