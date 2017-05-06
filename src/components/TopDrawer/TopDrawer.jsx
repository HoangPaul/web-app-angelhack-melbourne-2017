import React, { Component } from 'react';
import './TopDrawer.css';

class TopDrawer extends Component {
    render() {
        return (
            <div className="top-drawer">
                {this.props.children}
            </div>
        );
    }
}

export default TopDrawer;