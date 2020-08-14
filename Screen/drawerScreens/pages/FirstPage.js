// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Icon, Left, Body, Right } from 'native-base';

const FirstPage = ({props,navigation}) => {
  
  state = {
  DATA : [
    { id: 1, title: 'Lorem ipsum dolor sit amet, everti rationibus his cu', views:'200', comments:'9', published:'4h ago' },
   
    { id: 2, title: 'Lorem ipsum dolor sit amet, everti rationibus his ', Views:'700', comments:'16', published:'9h ago' },
   
    { id: 3, title: 'Lorem ipsum dolor sit amet, everti rationibus hi', Views:'698', comments:'8', published:'14h ago' },
   
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
                <Text>{item.title}</Text>
                <Text note>GeekyAnts</Text>
              </Body>
            </Left>
          </CardItem>
          
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>{item.views}</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>{item.comments}</Text>
              </Button>
            </Body>
            <Right>
              <Text>{item.published}</Text>
            </Right>
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
            Add new Inquiry
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Draw roof')}>
            <Text>Draw roof</Text>
          </TouchableOpacity>
        </View>
        
      </View>

      <Container>
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
});
export default FirstPage;