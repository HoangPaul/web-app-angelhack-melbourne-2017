import React, { Component } from 'react';

import './InTransit.css';
import Icon from './icons/direction_continue_right.png';

class InTransit extends Component {
    render() {
        // Hard code the transit details because it's impossible to demo this part in 2 minutes
        return (
            <div className="in-transit">
                <div className="icon">
                    <img src={Icon} />
                </div>
                <div className="details">
                    <h1>1.5 KM</h1>
                    <p>Turn right on Lygon Street</p>
                </div>
            </div>
        );
    }
}

export default InTransit;