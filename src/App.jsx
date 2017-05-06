import React, { Component } from 'react';

import GoogleMap from './components/GoogleMaps/Map';
import SearchBox from './components/SearchBox/SearchBox';

import './App.css';

class App extends Component {

    state = {
        origin: {
            lat: null,
            lng: null
        },
        destination: {
            lat: null,
            lng: null
        }
    };
    
    handleSearchRequest(lat, lng) {
        this.setState({destination: {
            lat,
            lng
        }});
    }
    
    setOrigin(lat, lng) {
        this.setState({origin: {
            lat: lat,
            lng: lng
        }})
    }
    
    render() {
        return (
            <div>
                <GoogleMap
                    setOrigin={this.setOrigin.bind(this)}
                    origin={this.state.origin}
                    destination={this.state.destination}
                />
                <SearchBox 
                    handleSearchRequest={this.handleSearchRequest.bind(this)}
                />
            </div>
        );
    }
}

export default App;
