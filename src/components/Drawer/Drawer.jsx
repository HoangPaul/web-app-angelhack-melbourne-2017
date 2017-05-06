import React, { Component } from 'react';
import './Drawer.css';

class Drawer extends Component {
    render() {
        return (
            <div className="drawer">
                {this.props.children}
            </div>
        );
    }
}

export default Drawer;