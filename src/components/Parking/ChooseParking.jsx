import React, { Component } from 'react';
import Constants from '../../Constants';

import './ChooseParking.css';

class ChooseParking extends Component {
    render() {
        return (
            <div className="choose-parking">
                <h1>Parking Type:</h1>
                <div className="parking-choice">
                    <button onClick={this.props.onChooseParkingType.bind(this, Constants.PARKING_TYPE_FREE)}>
                        Free Parking
                    </button>
                </div>
                <div className="parking-choice">
                    <button onClick={this.props.onChooseParkingType.bind(this, Constants.PARKING_TYPE_PAID)}>
                        Paid Parking
                    </button>
                </div>
            </div>
        );
    }
}

export default ChooseParking;