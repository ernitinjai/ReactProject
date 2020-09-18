/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, { useState } from 'react';

//Import all required component
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity ,Linking} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import colors from '../common/colors';

const ContactUs = () => {

  const [socialItems, setSocialItems] = useState([
    { name: '', image: require('../../Images/t.png') ,url:'https://twitter.com/SunScopetech'},
    { name: '', image: require('../../Images/f.png') ,url:'https://www.facebook.com/esunscope/'},
    { name: '', image: require('../../Images/l.png'),url:'https://www.linkedin.com/company/sunscope-technologies/' },
    { name: '', image: require('../../Images/wd.png') ,url:'https://wa.me/971559775951'},
    { name: '', image: require('../../Images/wi.png') ,url:'https://wa.me/918529999277'},
  ]);

  const [items, setItems] = useState([
    { name: 'HEAD OFFICE', code: 'SunScope Technologies FZ-LLC,In5 Tech Dubai,P. O. Box 73030 – Dubai – United Arab Emirates', image: require('../../Images/address.png') },
    { name: 'CENTER OF EXCELLANCE', code: 'india', image: require('../../Images/address.png') },
    { name: 'CALL US', code: '+971 55 9775951', image: require('../../Images/phone.png') },
    { name: 'EMAIL', code: 'gosolar@esunscope.com', image: require('../../Images/email.png') },

  ]);
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
      <Text style={{ fontSize: 23, marginTop: 10 }}>Contact Us</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        SunScope Technologies objective is to create competitive and quality controlled landscape for Solar Energy companies. The company works on the “Darwin's” theory of “Survival for the fittest” where only the companies providing the best quality at the best rates survive.
      </Text>
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer]}>
            <Image style={styles.itemImage} source={item.image} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>

          </View>
        )}
      />

      
<View style={styles.SectionMobileNumberStyle}>
        <View>
          <ImageBackground
            source={socialItems[0].image}
            style={styles.soicalitemImage}>
            <TouchableOpacity
              onPress={() => Linking.openURL(socialItems[0].url)}
              style={{ flex: 1 }}>
            </TouchableOpacity>
          </ImageBackground>
        </View>

       

        <View>
          <ImageBackground
            source={socialItems[1].image}
            style={styles.soicalitemImage}>
            <TouchableOpacity
              onPress={() => Linking.openURL(socialItems[1].url)}
              style={{ flex: 1 }}>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View>
          <ImageBackground
            source={socialItems[2].image}
            style={styles.soicalitemImage}>
            <TouchableOpacity
              onPress={() => Linking.openURL(socialItems[2].url)}
              style={{ flex: 1 }}>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View>
          <ImageBackground
            source={socialItems[3].image}
            style={styles.soicalitemImage}>
            <TouchableOpacity
              onPress={() => Linking.openURL(socialItems[3].url)}
              style={{ flex: 1 }}>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View>
          <ImageBackground
            source={socialItems[4].image}
            style={styles.soicalitemImage}>
            <TouchableOpacity
              onPress={() => Linking.openURL(socialItems[4].url)}
              style={{ flex: 1 }}>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        </View>

        
      </View>

    
  );
};




const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    height: 100,
    margin: 10,
  },
  header: {
    backgroundColor: colors.APP_YELLOW,
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    height: 100,
    margin: 10,
    color: colors.DARK_GREY_FONT,
    fontWeight: '800',
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
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    alignSelf: 'center',
    color: colors.DARK_GREY_FONT,
  },
  itemImage: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    alignSelf: 'center',
    alignContent: 'center',
    color: '#fff',
  },
  SectionMobileNumberStyle: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    margin: 10,
    justifyContent: 'space-evenly'
  },
  soicalitemImage: {
    justifyContent: 'center',
    width: 55,
    height: 55,
    alignSelf: 'center',
    alignContent: 'center',
    color: '#fff',
  },
});

export default ContactUs;