/* global google */

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

import GoogleMapStyles from './CustomGoogleMapStyle.json';
import CustomGooglePolylineStyle from './CustomGooglePolylineStyle.json';

const CustomGoogleMarkerStyle = {
    icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#2196F3',
        strokeColor: '#2196F3',
        scale: 2
    }
};

let googleMapInstance = null;
const storeGoogleMapInstance = function(props) {
    googleMapInstance = props;
};

const GoogleMaps = withGoogleMap(props => (
    <GoogleMap
        ref={storeGoogleMapInstance}
        defaultZoom={props.zoom}
        center={props.center}
        defaultOptions={{
            styles: GoogleMapStyles,
            disableDefaultUI: true
        }}
    >
        {props.directions &&
            <DirectionsRenderer directions={props.directions}
                                options={{
                                    markerOptions: CustomGoogleMarkerStyle,
                                    polylineOptions: CustomGooglePolylineStyle
                                }}
            />
        }
    </GoogleMap>
));

class Map extends Component {
    
    state = {
        directions: null
    };
    
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            if (this.isUnmounted) {
                return;
            }
            this.props.setOrigin(position.coords.latitude, position.coords.longitude);
            this.props.updateCenter(position.coords.latitude, position.coords.longitude);
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.origin.lat !== prevProps.origin.lat
            || this.props.origin.lng !== prevProps.origin.lng
            || this.props.destination.lat !== prevProps.destination.lat
            || this.props.destination.lng !== prevProps.destination.lng
        ) {
            this.retrieveAndLoadDirections();   
        }
        if (googleMapInstance !== null) {
            googleMapInstance.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setZoom(this.props.mapSettings.zoom);
            googleMapInstance.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.panTo(this.props.mapSettings.center);
        }
    }
    
    canSearchDirection() {
        return this.props.origin.lat !== null 
            && this.props.origin.lng !== null
            && this.props.destination.lat !== null
            && this.props.destination.lng !== null;
    }

    retrieveAndLoadDirections() {
        if (!this.canSearchDirection()) {
            return;
        }

        const DirectionsService = new google.maps.DirectionsService();
        
        DirectionsService.route({
            origin: new google.maps.LatLng(this.props.origin.lat, this.props.origin.lng),
            destination: new google.maps.LatLng(this.props.destination.lat, this.props.destination.lng),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.props.onSuccessfulDirectionRequest();
                this.props.setOrigin(result.routes[0].overview_path[0].lat(), result.routes[0].overview_path[0].lng());
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions`);
                console.log(result);
                console.log(status);
                console.log(this.props.origin);
                console.log(this.props.destination);
            }
        });
    }
    
    render() {
        if (this.props.mapSettings.center !== null) {
            return (
                <GoogleMaps
                    zoom={this.props.mapSettings.zoom}
                    center={this.props.mapSettings.center}
                    canSearchDirection={this.canSearchDirection.bind(this)}
                    directions={this.state.directions}
                    containerElement={
                        <div style={{height: `100%`}}/>
                    }
                    mapElement={
                        <div style={{height: `100%`}}/>
                    }
                />
            );
        } else {
            return null;
        }
    }
}

export default Map;