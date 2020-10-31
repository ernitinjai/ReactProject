/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, { useState } from 'react';

//Import all required component
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
const AboutUs = () => {

  const [socialItems, setSocialItems] = useState([
    { name: 'The rooftop Solar market is defragmented with lack of standards in major equipment’s, installation practices and testing protocols. Hence buying the PV system off the shelf without worrying about quality, reliability and market standards is still not possible. Most Solar adopters have different focus area or expertise and having a paid consultancy is not economical always, which leaves Solar Adopters wondering how to go about it, what to buy, how to buy and make sure that the asset has a good design and operating life.', image: require('../../Images/about1.png') },
    { name: 'Adopting new technologies and systems, which are suitable for human society is inherent to human nature. Many times, need of the individuals, families and businesses for electric power drive them to adopt sustainable energy resources. Solar technologies have not only become readily available but also have become super affordable. However, accessibility is little challenging as there are multiple factors and stakeholders involved in the adoption process. At eSunScope our objective is to link the stakeholders in the value chain, reduce the cost at every touch point and help them to adopt renewable energy through single IT enabled platform.', image: require('../../Images/about2.png') },
    { name: 'For Solar adopters who are busy in their lives and businesses, it is challenging to navigate through the complex web of policies, incentives, permits, processes, and procurement standards, quality of the product, installation, and maintenance. This is where eSunScope comes to rescue. Both as individual or government can adopt the online ecosystem created by eSunScope and get benefited by our services. Sunscope is committed to safeguarding the environment for future generations. We strive to ensure our efforts to meet the terms of setting the solar ecosystem right for the ecosystem.', image: require('../../Images/about3.png') },
    { name: 'Many companies want to be part of this solar journey and they are doing their best. However, not everyone is on a platform, where they can be seen, used and evaluated. Many envision entering into solar as product suppliers and as EPC or service providers, but they end up serving small market depending on their outreach via different channels. We at SunScope accompany them to expand their business in different geographies with our complete support system including the resource, technical expertise and sales and marketing support.', image: require('../../Images/about4.png') },
  ]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.imageheader} source={require('../../Images/mission.png')} />
        </View>
        <Text style={styles.centerText}>We at eSunScope help you navigate the complex environment and make sure you get the best worth of your investment in solar adoption.</Text>

        <Card>
          <CardItem>
            <Left>
              <Body>
                <Image style={styles.image} source={socialItems[0].image} />
              </Body>
            </Left>
            <Right>
              <Text>{socialItems[0].name}</Text>
            </Right>

          </CardItem>

          <Text style={styles.centerText}>Everyone today, an individual or corporate wishes to see the less polluted earth and want to give a greener future to their next generations and we help to you get through.</Text>

          <CardItem>
            <Left>
              <Body>
              <Text>{socialItems[1].name}</Text>
              </Body>
            </Left>
            <Right>
              <Image style={styles.image} source={socialItems[1].image} />
            </Right>
          </CardItem>

<Text style={styles.centerText}>Every country now has renewable policies and incentives to meet the energy needs without creating negative impact on the environment.</Text>
<CardItem>
            <Left>
              <Body>
                <Image style={styles.image} source={socialItems[2].image} />
              </Body>
            </Left>
            <Right>
              <Text>{socialItems[2].name}</Text>
            </Right>

          </CardItem>
          <Text style={styles.centerText}>We at eSunScope support not only the solar adopters but also Solar EPCs and Solar OEMs who need a broader reach, central resource system, technical advice and support system.</Text>
        
          <CardItem>
            <Left>
              <Body>
              <Text>{socialItems[3].name}</Text>
              </Body>
            </Left>
            <Right>
              <Image style={styles.image} source={socialItems[3].image} />
            </Right>
          </CardItem>

        </Card>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    height: 160,
    backgroundColor: 'white'
  },
  imageheader: {
    flex: 1,
    resizeMode: 'center',
    width: '100%',
    height: 160
  },

  image: {
    flex: 1,
    resizeMode: 'center',
    width: 170,
    height: 120
  },

  centerText: {
    flex: 1,
    marginTop:10,
    marginBottom:10,
    margin:10,
  }

})
export default AboutUs;