import React, { Component } from 'react';
import Constants from '../../Constants';

import './ParkingDetails.css'

class ParkingDetails extends Component {
    
    formatTime(time) {
        return time;
    }
    
    formatParkingType(parkingType) {
        switch (parkingType) {
            case Constants.PARKING_TYPE_FREE:
                return 'Free';
            case Constants.PARKING_TYPE_PAID:
                return 'Paid';
        }
        console.log(`Unknown parking type ${parkingType}`);
        return 'Unknown Type'
    }
    
    render() {
        return (
            <div className="parking-details">
                <h1>Journey:</h1>
                <ul>
                    <li>Destination: {this.props.destination}</li>
                    <li>Time of Arrival: {this.formatTime(this.props.timeOfArrival)}</li>
                    <li>Type of parking: {this.formatParkingType(this.props.parkingType)}</li>
                    <li>Parking Duration: {this.props.parkingDuration}</li>
                </ul>
                <div className="button-action">
                    <button className="button" onClick={this.props.onConfirmParking}>
                        Confirm
                    </button>
                </div>
            </div>
        );
    }
}

export default ParkingDetails;