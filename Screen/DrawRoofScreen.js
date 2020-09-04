import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native'

import MapView, {
  MAP_TYPES,
  Polygon,
  ProviderPropType,
  PROVIDER_GOOGLE
} from 'react-native-maps'

import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { color } from 'react-native-reanimated';
import MapInput from './Components/MapInput';
import { Left } from 'native-base';
import ForgotPassword from './ForgotPassword';

const { width, height } = Dimensions.get('window')

var ASPECT_RATIO = width / height
var LATITUDE = 21.7196
var LONGITUDE = 75.8577
var LATITUDE_DELTA = 0.0922
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
let id = 0



class DrawRoofScreen extends Component {

  

  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    polygons: [],
    editing: null,
    creatingHole: false
  }
  
  constructor(props) {
    super(props)
    
  }

  callLocation(that){
    
      Geolocation.getCurrentPosition(
        //Will give you the current location
         (position) => {
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            //that.state.region.longitude = parseFloat(currentLongitude)
            //that.setState({ currentLongitude:currentLongitude });
            //Setting state Longitude to re re-render the Longitude Text
            //that.state.region.latitude = parseFloat(currentLatitude)
            //that.setState({ currentLatitude:currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text
            this.setState({
              region: {
                  latitude: parseFloat(currentLatitude),
                  longitude: parseFloat(currentLongitude),
                  latitudeDelta: 0.003,
                  longitudeDelta: 0.003
              }
          });
            
          },
         (error) => alert(error.message),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      that.watchID = Geolocation.watchPosition((position) => {
        //Will give you the location on location change
          console.log('so'+position);
          //alert(position.coords.longitude);
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
          //that.setState({ currentLongitude:currentLongitude });
          //that.state.region.longitude = parseFloat(currentLongitude)
         //Setting state Longitude to re re-render the Longitude Text
          //that.setState({ currentLatitude:currentLatitude });
          //that.state.region.latitude = parseFloat(currentLatitude)
         //Setting state Latitude to re re-render the Longitude Text
         this.setState({
          region: {
              latitude: parseFloat(currentLatitude),
              longitude: parseFloat(currentLongitude),
              latitudeDelta: 0.003,
              longitudeDelta: 0.003
          }
      });
      });
   }

  componentDidMount = () => {
    var that = this
    if(Platform.OS === 'ios'){
      this.callLocation(that)
    }else{
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
              'title': 'Location Access Required',
              'message': 'This App needs to Access your location'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.callLocation(that);
          } else {
            alert("Permission Denied");
          }
        } catch (err) {
          alert("error ",err);
          console.warn(err)
        }
      }
      requestLocationPermission();
    }    
   }

  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
   }

  finish() {
   const { polygons, editing } = this.state;
   this.setState({
   polygons: [...polygons, editing],
   editing: null,
   creatingHole: false,
  });
  }

  clear = () => {
    this.setState({
      polygons: [],
      editing: null,
      creatingHole: false
    })
  }

  createHole() {
    const { editing, creatingHole } = this.state
    if (!creatingHole) {
      this.setState({
        creatingHole: true,
        editing: {
          ...editing,
          holes: [...editing.holes, []]
        }
      })
    } else {
      const holes = [...editing.holes]
      if (holes[holes.length - 1].length === 0) {
        holes.pop()
        this.setState({
          editing: {
            ...editing,
            holes
          }
        })
      }
      this.setState({ creatingHole: false })
    }
  }

  onPress(e) {
    console.log(this.state.polygons)
    const { editing, creatingHole } = this.state
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: []
        }
      })
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate]
        }
      })
    } else {
      const holes = [...editing.holes]
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate
      ]
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [...editing.coordinates],
          holes
        }
      })
    }
  }

  getCoordsFromName(loc) {
    this.setState({
        region: {
            latitude: loc.lat,
            longitude: loc.lng,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
        }
    });
  }

  render() {
    const mapOptions = {
      scrollEnabled: true
    }

    if (this.state.editing) {
      mapOptions.scrollEnabled = false
      mapOptions.onPanDrag = e => this.onPress(e)
    }

    

    return (
      <View style={styles.container}>
      {
      this.state.region['latitude'] ?
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType={MAP_TYPES.SATELLITE}
          initialRegion={this.state.region}
          region={this.state.region}
          onPress={e => this.onPress(e)}
          {...mapOptions}
        >
          {this.state.polygons.map(polygon => (
            <Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              holes={polygon.holes}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          ))}
          {this.state.editing && (
            <Polygon
              key={this.state.editing.id}
              coordinates={this.state.editing.coordinates}
              holes={this.state.editing.holes}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          )}
        </MapView>
        : null}
        
        {/* <View style={styles.map}>
            <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)
          
            }/>
        </View> */}

        
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("NewInquiry")}
          style={[ styles.nextbubble,styles.button]}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      

        <View style={styles.buttonContainer}>
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.createHole()}
              style={[styles.bubble, styles.button]}
            >
              <Text>
                {this.state.creatingHole ? 'Finish Draw Roof' : 'Start Draw Roof'}
              </Text>
            </TouchableOpacity>
          )}
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.finish()}
              style={[styles.bubble, styles.button]}
            >
              <Text>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => this.clear()}
          style={[styles.bubble, styles.button]}
        >
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

DrawRoofScreen.propTypes = {
  provider: ProviderPropType
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  nextbubble: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,1)',
    top: 60,
    left: 280,
    width: 80,
    height:50,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center'
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  },
  inputStyle: {
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    height:40,
    margin:15,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderColor: 'white',
  }
})

export default DrawRoofScreen;