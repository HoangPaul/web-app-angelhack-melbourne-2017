import React, { Component } from 'react';

import Drawer from './components/Drawer/Drawer';
import GoogleMap from './components/GoogleMaps/Map';
import ChooseParking from "./components/Parking/ChooseParking";
import EndParking from "./components/Parking/EndParking";
import InTransit from "./components/Parking/InTransit";
import ParkingDetails from "./components/Parking/ParkingDetails";
import SearchBox from './components/SearchBox/SearchBox';
import Constants from './Constants';

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
        },
        overlay: {
            search: true,
            chooseParking: false,
            parkingDetails: false,
            inTransit: false,
            endJourney: false
        }
    };
    
    shouldDrawerBeActive() {
        return this.state.overlay.chooseParking !== false
            || this.state.overlay.parkingDetails !== false
            || this.state.overlay.inTransit !== false
            || this.state.overlay.endJourney !== false;
    }
    
    showParkingDrawer() {
        this.setState({
            overlay: {
                search: false,
                chooseParking: true,
                parkingDetails: false,
                inTransit: false,
                endJourney: false
            }
        });
    }
    
    showParkingDetailsDrawer() {
        this.setState({
            overlay: {
                search: false,
                chooseParking: false,
                parkingDetails: true,
                inTransit: false,
                endJourney: false
            }
        });
    }
    
    showInTransitDrawer() {
        this.setState({
            overlay: {
                search: false,
                chooseParking: false,
                parkingDetails: false,
                inTransit: true,
                endJourney: false
            }
        });
    }
    
    showEndJourneyDrawer() {
        this.setState({
            overlay: {
                search: false,
                chooseParking: false,
                parkingDetails: false,
                inTransit: false,
                endJourney: true
            }
        });
    }
    
    onChooseParkingType(parkingType) {
        // query API
        this.showParkingDetailsDrawer();
    }

    onConfirmParking() {
        this.showInTransitDrawer();
    }

    onNearDestination() {
        this.showEndJourneyDrawer();
    }

    onConfirmEndJourney() {
        console.log('end journey')
    }
    
    handleSearchRequest(lat, lng) {
        console.log('destination is ' + lat + ' ' + lng);
        this.setState({destination: {
            lat: lat,
            lng: lng
        }});
        this.showParkingDrawer();
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
                    onSuccessfulDirectionRequest={this.showParkingDrawer.bind(this)}
                    setOrigin={this.setOrigin.bind(this)}
                    origin={this.state.origin}
                    destination={this.state.destination}
                />
                {this.state.overlay.search &&
                    <SearchBox
                        handleSearchRequest={this.handleSearchRequest.bind(this)}
                    />
                }
                {this.shouldDrawerBeActive() &&
                    <Drawer>
                        {this.state.overlay.chooseParking &&
                            <ChooseParking
                                onChooseParkingType={this.onChooseParkingType.bind(this)}
                            />
                        }
                        {this.state.overlay.parkingDetails &&
                            <ParkingDetails
                                destination="Lonsdale St, Melbourne"
                                timeOfArrival="9:35 PM"
                                parkingType={Constants.PARKING_TYPE_FREE}
                                parkingDuration="02:00"
                                onConfirmParking={this.onConfirmParking.bind(this)}
                            />
                        }
                        {this.state.overlay.inTransit &&
                        <InTransit
                            onNearDestination={this.onNearDestination.bind(this)}
                        />
                        }
                        {this.state.overlay.endJourney &&
                        <EndParking
                            onConfirmEndJourney={this.onConfirmEndJourney.bind(this)}
                        />
                        }
                    </Drawer>
                }
            </div>
        );
    }
}

export default App;
