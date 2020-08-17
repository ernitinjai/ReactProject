// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Icon, Left, Body, Right } from 'native-base';

const FirstPage = ({props,navigation}) => {
  
  state = {
  DATA : [
    {id :1,	inquiry_no:1234,	property_type	:"residential",address:"Hare krishna vihar, Nipania, Indore",	inquiry_date:"22/3/2020",	status:"In process"},
    {id :2,	inquiry_no:12356,	property_type	:"self",address:"Indore 23",	inquiry_date:"21/4/2020",	status:"Completed"},
    {id :3,	inquiry_no:12367,	property_type	:"building",address:"Indore 12345",	inquiry_date:"19/3/2020",	status:"In process"},
     
    ]
  };

  let renderpostTypes = () => {

    let post = [];
    
    state.DATA.map((item, index) => {
      post.push(
        <Card key={item} >
          <CardItem>
            <Left>
              <Body>
              <Text>No:</Text>
                <Text>{item.id}</Text>
        
               </Body>
            </Left>

            <Body>
                <Text>Inquiry No:</Text>
                <Text>{item.inquiry_no}</Text>
            </Body>
            <Right>
            <Text>Inquiry Date:</Text>
              <Text>{item.inquiry_date}</Text>
            </Right>

          </CardItem>

          <View style = {styles.lineStyle} />

          
          <CardItem>
            <Left>
              
                
                <Text>Property Type:</Text>
            </Left>
            <Body>
             
              <Text>{item.property_type}</Text>
            </Body>
            
          </CardItem>

          <CardItem>
            <Left>
                <Text>Address</Text>
            </Left>
            <Body>
              <Text>{item.address}</Text>
            </Body>
            
          </CardItem>

          <CardItem>
            <Left>
                <Text>Status</Text>
            </Left>
            <Body>
              <Text>{item.status}</Text>
            </Body>
            
          </CardItem>
        </Card>
      );
    });
   return post;
  };

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
            Request new Plant
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Draw roof')}>
            <Text>Draw roof</Text>
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
            e-Procurement Sites
            </Text>
          </View>
        <Content>
         
          {renderpostTypes()}
      </Content>
    </Container>
    </SafeAreaView>

   
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginLeft:20,
    
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'#DDDDDD',
    margin:10,
},
});
export default FirstPage;