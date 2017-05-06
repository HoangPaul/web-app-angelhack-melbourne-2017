/* global google */

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer} from "react-google-maps";

const GoogleMaps = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={props.zoom}
        center={props.center}
    >
        {props.canSearchDirection() && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
));

class Map extends Component {
    
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            if (this.isUnmounted) {
                return;
            }
            this.props.setOrigin(position.coords.latitude, position.coords.longitude);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.origin.lat !== nextProps.origin.lat
            || this.props.origin.lng !== nextProps.origin.lng
            || this.props.destination.lat !== nextProps.destination.lng
            || this.props.destination.lng !== nextProps.destination.lng
        ) {
            this.getDirections();   
        }
    }
    
    canSearchDirection() {
        return this.props.origin.lat !== null 
            && this.props.origin.lng !== null
            && this.props.destination.lat !== null
            && this.props.destination.lng !== null;
    }
    
    getDirections() {
        if (!this.canSearchDirection()) {
            return;
        }
        const DirectionsService = new google.maps.DirectionsService();
        
        console.log([this.props.origin.lat, this.props.origin.lng]);
        console.log([this.props.destination.lat, this.props.destination.lng]);
        DirectionsService.route({
            origin: new google.maps.LatLng(this.props.origin.lat, this.props.origin.lng),
            destination: new google.maps.LatLng(this.props.destination.lat, this.props.destination.lng),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                console.log(result);
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions`);
                console.log(result);
            }
        });
    }
    
    getCenter() {
        return {lat: this.props.origin.lat, lng: this.props.origin.lng};
    }
    
    render() {
        return (
            <GoogleMaps
                zoom={17}
                center={this.getCenter()}
                hasDirections={this.hasDirections.bind(this)}
                getDirections={this.getDirections.bind(this)}
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
            />
        );
    }
}

export default Map;