import React, { Component } from 'react';

import './InTransit.css';

class InTransit extends Component {
    render() {
        // Hard code the transit details because it's impossible to demo this part in 2 minutes
        return (
            <div className="in-transit">
                <div className="icon"></div>
                <div className="details">
                    <h1>1.5 KM</h1>
                    <p>Turn right on Lygon Street</p>
                    <button onClick={this.props.onNearDestination}>Continue</button>
                </div>
            </div>
        );
    }
}

export default InTransit;