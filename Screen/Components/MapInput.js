import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function MapInput(props) {
    return (
        <View >
            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={true}
                returnKeyType={'search'} // Can be left out for default return key 
                listViewDisplayed={true}    // true/false/undefined
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    alert("Google place auto" + details);
                    props.notifyChange(details.geometry.location);
                }}
                onFail={(error) => alert(error)}
                query={{
                   
                    key: 'AIzaSyAeCppYyxhk5oILgO-zry_8KBAKdWgqIzA',
                    //key: 'AIzaSyD_AT0bBoA_5bt4o50ZpWlT30v8Ig71q48',
                    language: 'en'
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={300}
                styles={{
                    textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                    },
                    textInput: {
                        marginLeft: 10,
                        marginRight: 10,
                        height: 42,
                        color: '#5d5d5d',
                        fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}
            />


        </View>

    );
}


export default MapInput;