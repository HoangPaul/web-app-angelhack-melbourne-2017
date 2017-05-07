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
        parkingDetails: {
            type: 'Free'
        },
        mapSettings: {
            zoom: 16,
            center: null
        },
        overlay: {
            search: true,
            chooseParking: false,
            parkingDetails: false,
            inTransit: false,
            endParking: false
        },
        hasShownParkingDrawer: false
    };
    
    shouldDrawerBeActive() {
        return this.state.overlay.chooseParking !== false
            || this.state.overlay.parkingDetails !== false
            || this.state.overlay.inTransit !== false
            || this.state.overlay.endParking !== false;
    }
    
    showParkingDrawer() {
        if (!this.hasShownParkingDrawer) {
            this.hasShownParkingDrawer = true;
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
        this.hasShownParkingDrawer = false;
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
        this.setState({
            parkingDetails: {
                type: parkingType === Constants.PARKING_TYPE_FREE ? 'Free' : 'Paid'
            }
        });
        const xmlRequest = new XMLHttpRequest();
        xmlRequest.addEventListener('load', () => {
            const obj = JSON.parse(xmlRequest.response);
            const newData = {
                destination: {
                    lat: parseFloat(-obj.lng1),
                    lng: parseFloat(obj.lat1)
                }
            };
            this.setState(newData);
        });
        xmlRequest.open('POST', 'http://127.0.0.1:8080/parkingspot');
        xmlRequest.setRequestHeader('Content-Type', 'application/json');
        xmlRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
        const data = {
            "lat": this.state.destination.lat,
            "lng": this.state.destination.lng,
        };
        xmlRequest.send(JSON.stringify(data));
        
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
        window.location.reload(false);
    }

    onBackAction(newState) {
        switch (newState) {
            case Constants.STATE_SEARCH:
                this.setState({
                    overlay: {
                        search: true,
                        chooseParking: false,
                        parkingDetails: false,
                        inTransit: false,
                        endParking: false
                    }
                });
                break;
            case Constants.STATE_PICK:
                this.setState({
                    overlay: {
                        search: false,
                        chooseParking: true,
                        parkingDetails: false,
                        inTransit: false,
                        endParking: false
                    }
                });
                break;
            case Constants.STATE_DETAILS:

                this.setState({
                    overlay: {
                        search: false,
                        chooseParking: false,
                        parkingDetails: true,
                        inTransit: false,
                        endParking: false
                    }
                });
                break;
            case Constants.STATE_TRANSIT:
                this.setState({
                    overlay: {
                        search: false,
                        chooseParking: false,
                        parkingDetails: false,
                        inTransit: true,
                        endParking: false
                    }
                });
                break;
        }
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
                                backAction={this.onBackAction.bind(this, Constants.STATE_SEARCH)}
                                onChooseParkingType={this.onChooseParkingType.bind(this)}
                            />
                        }
                        {this.state.overlay.parkingDetails &&
                            <ParkingDetails
                                destination="Lonsdale St, Melbourne"
                                timeOfArrival="9:35 PM"
                                parkingType={Constants.PARKING_TYPE_FREE}
                                parkingDuration="01:00"
                                backAction={this.onBackAction.bind(this, Constants.STATE_PICK)}
                                onConfirmParking={this.onConfirmParking.bind(this)}
                            />
                        }
                        {this.state.overlay.inTransit &&
                        <InTransit
                            backAction={this.onBackAction.bind(this, Constants.STATE_DETAILS)}
                        />
                        }
                        {this.state.overlay.endParking &&
                        <EndParking
                            backAction={this.onBackAction.bind(this, Constants.STATE_TRANSIT)}
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
