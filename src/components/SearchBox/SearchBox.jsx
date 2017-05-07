import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import './SearchBox.css';

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {input: ''};
    }
    
    render() {
        return (
            <Autocomplete className="searchbox" 
                          type="text"
                          placeholder="Destination"
                          componentRestrictions={{
                              country: "au"
                          }}
                          onPlaceSelected={(place) => {
                              this.props.handleSearchRequest(
                                  place.geometry.location.lat(),
                                  place.geometry.location.lng()
                              );
                          }}
            />
        );
    }
}

export default SearchBox;