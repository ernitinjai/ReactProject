import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native'

import MapView, {
  MAP_TYPES,
  Polygon,
  ProviderPropType,
  PROVIDER_GOOGLE
} from 'react-native-maps'

import Geolocation from '@react-native-community/geolocation';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapInput from './Components/MapInput';
import { Left } from 'native-base';
import ForgotPassword from './ForgotPassword';
import NotifService from './NotifService';
import Geocoder from 'react-native-geocoding';


const { width, height } = Dimensions.get('window')

var ASPECT_RATIO = width / height
var LATITUDE = 123.7196
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
    this.state = {};
    this.state.polygons = [];

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );


  }

  onRegister(token) {
    Alert.alert("token", token);
    this.setState({ registerToken: token.token, fcmRegistered: true });
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }

  callLocation(that) {

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

      //alert(position.coords.longitude);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //alert('so' + currentLatitude + " " + currentLongitude);
      //getting the Latitude from the location json
      //that.setState({ currentLongitude:currentLongitude });
      //that.state.region.longitude = parseFloat(currentLongitude)
      //Setting state Longitude to re re-render the Longitude Text
      //that.setState({ currentLatitude:currentLatitude });
      //that.state.region.latitude = parseFloat(currentLatitude)
      //Setting state Latitude to re re-render the Longitude Text
      global.latitude = currentLatitude;
      global.longitude = currentLongitude;

      this.setState({
        region: {
          latitude: parseFloat(currentLatitude),
          longitude: parseFloat(currentLongitude),
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        }
      });

      Geocoder.from(currentLatitude, currentLongitude)
        .then(json => {
          var addressComponent = json.results[0].formatted_address;
          global.mapaddress = addressComponent;
         

          const addressArray = addressComponent.split(',');

          global.mapcountry = addressArray[addressArray.length-1];
          const stateAndpincode = addressArray[addressArray.length-2].split(" ");
          global.mapstate = stateAndpincode[1];
          global.mappincode = stateAndpincode[2];
          global.mapcity = addressArray[addressArray.length-3]
         //alert(global.city)
          console.log("***********************"+JSON.stringify(json));
        })
        .catch(error => alert("**"+JSON.stringify(error)));
    });
  }

  componentDidMount = () => {
    var that = this
    Geocoder.init("AIzaSyAeCppYyxhk5oILgO-zry_8KBAKdWgqIzA");
    if (Platform.OS === 'ios') {
      this.callLocation(that)
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
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
          alert("error *#"+err);
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

    console.log("finished " + polygons.length);
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
      console.log("creatingHole is false , now making it true")
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
    console.log("polygon " + this.state.polygons)

    const { editing, creatingHole } = this.state

    if (!editing) {
      console.log("editing is false ")
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: []
        }
      })

    } else if (!creatingHole) {
      console.log("creatingHole is false ")
      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate]
        }
      })
      this.calcArea(this.state.editing.coordinates);
      console.log("length 1 =  " + JSON.stringify(this.state.editing.coordinates));

    } else {
      console.log("creatingHole is true and editing is true ")
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
      console.log("length =  " + this.state.editing.coordinates);

    }
  }

  getCoordsFromName(loc) {
    this.setState({
      region: {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0001
      }
    });
  }

  calcArea(locations) {

    if (!locations.length) {
      return 0;
      console.log("return 0 ");
    }
    if (locations.length < 3) {
      console.log("return 0 1 ");

    }
    let radius = 6371000;

    const diameter = radius * 2;
    const circumference = diameter * Math.PI;
    const listY = [];
    const listX = [];
    const listArea = [];
    // calculate segment x and y in degrees for each point

    const latitudeRef = locations[0].latitude;
    console.log("latitudeRef " + latitudeRef);
    const longitudeRef = locations[0].longitude;
    console.log("longitudeRef " + longitudeRef);
    for (let i = 1; i < locations.length; i++) {
      let latitude = locations[i].latitude;
      let longitude = locations[i].longitude;
      listY.push(this.calculateYSegment(latitudeRef, latitude, circumference));

      listX.push(this.calculateXSegment(longitudeRef, longitude, latitude, circumference));

    }

    // calculate areas for each triangle segment
    for (let i = 1; i < listX.length; i++) {
      let x1 = listX[i - 1];
      let y1 = listY[i - 1];
      let x2 = listX[i];
      let y2 = listY[i];
      listArea.push(this.calculateAreaInSquareMeters(x1, x2, y1, y2));

    }

    // sum areas of all triangle segments
    let areasSum = 0;
    listArea.forEach(area => areasSum = areasSum + area)


    // get abolute value of area, it can't be negative
    let areaCalc = Math.abs(areasSum);// Math.sqrt(areasSum * areasSum); 

    global.areaCalc = "" + Math.trunc(areaCalc);
    console.log("areaCalc " + global.areaCalc);
    return areaCalc;
  }

  calculateAreaInSquareMeters(x1, x2, y1, y2) {
    return (y1 * x2 - x1 * y2) / 2;
  }

  calculateYSegment(latitudeRef, latitude, circumference) {
    return (latitude - latitudeRef) * circumference / 360.0;
  }

  calculateXSegment(longitudeRef, longitude, latitude, circumference) {
    return (longitude - longitudeRef) * circumference * Math.cos((latitude * (Math.PI / 180))) / 360.0;
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

      <View flex={1}>
        <View  >
          <MapInput notifyChange={(loc) => {
            alert("Mapinput");
            this.getCoordsFromName(loc)}
          } />
        </View>
        <View style={styles.container}>
          <MapView

            provider={PROVIDER_GOOGLE}
            style={styles.map}
            mapType={MAP_TYPES.SATELLITE}
            initialRegion={this.state.region}
            //showsUserLocation={true}
            //onMapReady={this.onMapReady}
            onRegionChangeComplete={this.onRegionChange}
            //onRegionChangeComplete={this.state.region}
            //region={this.state.region}
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
                fillColor="rgba(255,255,0,0.5)"
                strokeWidth={1}
              />
            )}
          </MapView>





          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NewInquiry")}
            style={[styles.nextbubble, styles.button]}
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
    alignItems: 'center',
    marginTop: 55,
  },
  map: {

    ...StyleSheet.absoluteFillObject,

  },
  nextbubble: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,1)',
    top: 60,
    left: 280,
    width: 80,
    height: 50,
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

})

export default DrawRoofScreen;