import React, { Component } from 'react';

import './EndParking.css';

class EndParking extends Component {
    render() {
        return (
            <button className="end-parking"
                    onClick={this.props.onConfirmEndJourney}>
                End Journey
            </button>
        );
    }
}

export default EndParking;