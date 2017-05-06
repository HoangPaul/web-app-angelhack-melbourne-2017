import React, { Component } from 'react';

import Drawer from './components/Drawer/Drawer';
import GoogleMap from './components/GoogleMaps/Map';
import ChooseParking from "./components/Parking/ChooseParking";
import EndParking from "./components/Parking/EndParking";
import InTransit from "./components/Parking/InTransit";
import ParkingDetails from "./components/Parking/ParkingDetails";
import SearchBox from './components/SearchBox/SearchBox';
import TopDrawer from './components/TopDrawer/TopDrawer';
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
        mapSettings: {
            zoom: 15,
            center: null
        },
        overlay: {
            search: true,
            chooseParking: false,
            parkingDetails: false,
            inTransit: false,
            endParking: false
        }
    };
    
    shouldDrawerBeActive() {
        return this.state.overlay.chooseParking !== false
            || this.state.overlay.parkingDetails !== false
            || this.state.overlay.inTransit !== false
            || this.state.overlay.endParking !== false;
    }
    
    showParkingDrawer() {
        this.setState({
            overlay: {
                search: false,
                chooseParking: true,
                parkingDetails: false,
                inTransit: false,
                endParking: false
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
                endParking: false
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
                endParking: false
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
                endParking: true
            }
        });
    }
    
    onChooseParkingType(parkingType) {
        // query API
        this.showParkingDetailsDrawer();
    }

    onConfirmParking() {
        this.setState({
            mapSettings: {
                zoom: 19,
                center: this.state.origin
            }
        });
        this.showInTransitDrawer();
    }

    onNearDestination() {
        this.setState({
            mapSettings: {
                zoom: 19,
                center: {lat: this.state.destination.lat, lng: this.state.destination.lng}
            }
        });
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
    
    updateCenter(lat, lng) {
        this.setState({
            mapSettings: {
                zoom: this.state.mapSettings.zoom,
                center: {
                    lat: lat,
                    lng: lng
                }
            }
        });
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
                    mapSettings={this.state.mapSettings}
                    updateCenter={this.updateCenter.bind(this)}
                />
                {this.state.overlay.inTransit &&
                    <div className="hackathon-demo-button"
                         onClick={this.onNearDestination.bind(this)}>
                        Go to destination (Demo only)
                    </div>
                }
                {this.state.overlay.endParking &&
                    <TopDrawer>
                        <h1>Parking spot</h1>
                        <h2>Parking type: parallel parking</h2>
                    </TopDrawer>
                }
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
                        <InTransit />
                        }
                        {this.state.overlay.endParking &&
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
