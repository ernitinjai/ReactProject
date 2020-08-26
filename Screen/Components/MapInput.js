import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function MapInput(props){
        return (

            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={true}
                returnKeyType={'search'} // Can be left out for default return key 
                listViewDisplayed={false}    // true/false/undefined
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log("Google place auto"+details) ;   
                props.notifyChange(details.geometry.location);
                }}
                query={{
                    key: 'AIzaSyD_AT0bBoA_5bt4o50ZpWlT30v8Ig71q48',
                    language: 'en'
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={300}
            />
        );
}
export default MapInput;