import React, { Component, Fragment } from "react";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
import Search from "../components/Search";
import MapRender from "../components/Map"
import FavNav from "../components/FavNav"
import SaveLines from "../components/SaveLine"
import API from "../utils/API";
import RouteSaveBtn from "../components/RouteSaveBtn";
import AutoCompleteExampleFilters from "../components/Autocomplete";
import { withAlert } from "react-alert";
import GeoLocation from "../components/GeoLocation";
import "./Home.css";

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class Home extends Component {
  state = {
    result: {},
    search: "10A",
    routeShape0: [],
    routeShape1: [],
    buses: [],
    allRoutes: [],
    firstBus: {},
    mapCenter: {},
    check: false,
    zoom: 10,
    stops0: [],
    stops1: [],
    validSearch: "10A",
    isLoggedIn: false,
    usersRoutes: [],
    savePrompt: "Save Route",
    checked: false,
    clickedMarker: null,
    predictionsInfo0: [],
    predictionsInfo1: [],
    countDown: 15,
    increment: null,
    userLocation: null,
    dataSource: []
  };

  componentDidMount(query) {
    this.searchRoutes0();
    console.log("compWillMount")
    this.checkLoginStatus();
    this.timer();
    this.searchAllRoutes();
  };

  componentWillUnmount() {
    if (this.state.countDown < 1) {
        clearInterval(this.state.increment)
    }
  }

  componentWillUpdate() {
    if (this.state.countDown < 1) {
      this.timerReset();
      this.searchBuses();
    }
  }

  checkLoginStatus = () => {
    // Delete after Tak implements ID-setting code
    localStorage.setItem('googleID', '100');

    var userID = localStorage.getItem('googleID');
    this.setState({ isLoggedIn: true });

    // Grabs from db the user's currently favorited routes
    API.getUsersRoutes(userID).
      then((result) => {
        const theirSaved = result.data[0].routes;
        this.setState({usersRoutes: theirSaved})

        if (this.state.usersRoutes.includes("10A")) {
            this.setState({ savePrompt: "Remove Route" })
        }
      });
  }
  zoomToThisBus = (location) => {
    this.setState({mapCenter: location})
  };
  timer = () =>  {
      this.state.increment = setInterval( () =>
        this.setState({
          countDown: this.state.countDown - 1
        }), 1000);
      console.log("this.state.increment: ",this.state.increment)
  };
  timerReset = () => {
    this.setState({
        buses: [],
        firstBus: {}
      });
    this.setState({countDown: 15});
  }
  showPosition = (position) => {
    this.setState({userLocation: {
      lat: position.coords.latitude,
      lng: position.coords.longitude}});
      this.setState({mapCenter: {
        lat: position.coords.latitude,
        lng: position.coords.longitude}});
    console.log("Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude);
  };
  getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition)
    } else {
        this.props.alert.show("Geolocation is not supported by this browser.");
    }
  };

  searchAllRoutes = () => {
    let busRoutesArr = [];
    var that = this;
    API.searchAll()
      .then(res => {
      res.data.Routes.forEach(item =>
        busRoutesArr.push(item.RouteID)
      )
      that.setState({dataSource: busRoutesArr})
      console.log("routes", that.state.dataSource)
    })
  }

  searchRoutes0 = () => {
    API.routeSearch(this.state.search)
      .then(res => {
        {
          this.props.alert.success("Search was successful! Loading Route...");
        }
      let ShapeDefined = [];
      res.data.Direction0.Shape.forEach(item =>
        ShapeDefined.push({
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        })
      ),

      this.setState({routeShape0: ShapeDefined}),
      this.searchRouteStops0(),
      this.searchRoutes1(),
      this.searchRouteStops1(),
      this.searchBuses(),
      console.log("SearchRoutes", res)
    })
      .catch(err => {
        this.props.alert.error("Not a proper route search, path cannot be displayed!"),
        this.setState({routeShape0: []}),
        this.setState({routeShape1: []}),
        this.setState({stops0: []}),
        this.setState({stops1: []}),
        this.setState({buses: []})
      })
  };
  searchRoutes1 = () => {
    API.routeSearch(this.state.search)
      .then(res => {
      let ShapeDefined = [];
      res.data.Direction1.Shape.forEach(item =>
        ShapeDefined.push({
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        })
      ),
      this.setState({routeShape1: ShapeDefined}),
      console.log("SearchRoutes", res)
      this.setState({validSearch: this.state.search})
    })
      .catch(err => console.log(err));
  };

//work on tomorrow for bus stops
  searchRouteStops0 = () => {
    API.routeSearch(this.state.search)
      .then(res => {
      let RouteStops = [];
      let firstStopCenter;
      let stopLat = res.data.Direction0.Stops[0].Lat;
      let stopLng = res.data.Direction0.Stops[0].Lon;
      res.data.Direction0.Stops.forEach(item =>
        RouteStops.push({
        location: {
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        },
        StopID: Number(item.StopID),
        Name: String(item.Name),
        Routes: String(item.Routes)
        })
      ),
      this.setState({stops0: RouteStops}),
      console.log(this.state.stops0)
      firstStopCenter = {
          lat: parseFloat(stopLat),
          lng: parseFloat(stopLng)
        }
      this.setState({ mapCenter: firstStopCenter })
      console.log(this.state.firstBus)
    })
      .catch(err => console.log(err));
  };
  searchRouteStops1 = () => {
    API.routeSearch(this.state.search)
      .then(res => {
        console.log("stops1", res)
      let RouteStops = [];
      res.data.Direction1.Stops.forEach(item =>
        RouteStops.push({
        location: {
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        },
        StopID: Number(item.StopID),
        Name: String(item.Name),
        Routes: String(item.Routes)
        })
      ),
      this.setState({stops1: RouteStops}),
      console.log("stops1",this.state.stops1)
    })
      .catch(err => console.log(err));
  };

  // this is a test from Angela
  searchRoutesTest = () => {
    API.routeSearch(this.state.value)
    console.log("this is the value")
    console.log(this.state.value)
      .then(res => {
      let ShapeDefined = [];
      res.data.Direction0.Shape.forEach(item =>
        ShapeDefined.push({
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        })
      ),
      this.setState({routeShape: ShapeDefined, zoom: 9}),
      this.searchBuses()
    })
      .catch(err => console.log(err));
  };

  searchBuses = () => {
    API.busPositions(this.state.search)
      .then(res => {

      let busesArray = [];
      let firstBusCenter;
      let busLat = res.data.BusPositions[0].Lat;
      let busLng = res.data.BusPositions[0].Lon;

      res.data.BusPositions.forEach(item =>
        busesArray.push({
        position: {
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        },
        tripHeadSign: String(item.TripHeadsign),
        directionText: String(item.DirectionText),
        deviation: parseFloat(item.Deviation)
      })
      ),
      this.setState({ buses: busesArray}),
      console.log(res),
      //Grab First Bus in Array
      firstBusCenter = {
          lat: parseFloat(busLat),
          lng: parseFloat(busLng)
        }
      this.setState({ firstBus: firstBusCenter })
      console.log(this.state.firstBus)
    })
      .catch(err => console.log(err));
  };

  updateRoute = () => {
    var googleID = localStorage.getItem("googleID");

    if (!googleID) {
      console.log("You need to log in, fam");
    }

    if (this.state.usersRoutes.includes(this.state.validSearch)) {
      this.removeRoute();
    }

    else {
      this.saveRoute();
    }

    API.saveRoute(googleID, {routes: this.state.usersRoutes});
  }

  saveRoute = () => {
    var theirRoutes = this.state.usersRoutes.slice();

    theirRoutes.push(this.state.validSearch);

    this.setState({ usersRoutes: theirRoutes});
    this.setState({ savePrompt: "Remove Route" })
  }

  // for the heart
  updateSaved() {
    this.updateRoute();
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  removeRoute = () => {
    var theirRoutes = this.state.usersRoutes.slice();

    var index = theirRoutes.indexOf(this.state.validSearch);

    if (index > -1) {
      theirRoutes.splice(index, 1);
    }

    this.setState({ usersRoutes: theirRoutes});
    this.setState({ savePrompt: "Save Route" })

  }

   //checkStopPrediction keeps getting called after Marker is clicked
  checkStopPrediction0 = (stopId) => {
    console.log('checkStopPrediction0', stopId)
    API.stopBusPrediction(stopId)
      .then(res => {
      let predictionsArray = [];
      res.data.Predictions.forEach(item =>
        predictionsArray.push({
          DirectionNum: String(item.DirectionNum),
          DirectionText: String(item.DirectionText),
          MinutesAwayPrediction: parseFloat(item.Minutes),
          RouteID: String(item.RouteID),
          TripID: String(item.TripID),
        })
      )
      this.setState({predictionsInfo0: predictionsArray})
      return
      console.log("Predictions for Location:", this.state.predictionsInfo)
    })
      .catch(err => console.log(err));
  };

  checkStopPrediction1 = (stopId) => {
    console.log('checkStopPrediction1', stopId)
    API.stopBusPrediction(stopId)
      .then(res => {
      let predictionsArray = [];
      res.data.Predictions.forEach(item =>
        predictionsArray.push({
          DirectionNum: String(item.DirectionNum),
          DirectionText: String(item.DirectionText),
          MinutesAwayPrediction: parseFloat(item.Minutes),
          RouteID: String(item.RouteID),
          TripID: String(item.TripID),
        })
      )
      this.setState({predictionsInfo1: predictionsArray})
      return
      console.log("Predictions for Location:", this.state.predictionsInfo)
    })
      .catch(err => console.log(err));
  };

  handleInputChange = (newValue) => {
    this.setState({
      'search': newValue
    });
  };

  handleFormSubmit = () => {
    this.searchRoutes0();
    console.log("Submit Route Shape", this.state.routeShape0)
  };

  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

  openNavBus = () => {
    document.getElementById("mySideNavBus").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNavBus = () => {
    document.getElementById("mySideNavBus").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  render() {
    return (
      <div>
        <Container>
          <GeoLocation userLocation={this.getLocation}/>
          <AutoCompleteExampleFilters
          dataSource={this.state.dataSource}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          />
          <br />
          <div className="in-line">
          <h2>Tracking bus {this.state.search}
          </h2>
          <SaveLines
          updateSaved={this.updateSaved.bind(this)}
          checked={this.state.checked}
          />
          <button className="btn btn-primary btn-sm"
            onClick={this.updateRoute}>
            {this.state.savePrompt}
          </button>
          </div>
          <div
            className="nav-open"
            onClick={this.openNav}>&#9776; View your saved lines
          </div>
          {this.state.buses.length ? (
            <div
              className="nav-open"
              onClick={this.openNavBus}> &#9776; View active Buses
            </div>
          ) : (
            <div></div>
          )}
          {this.state.buses.length ? (
            <List closeNav={this.closeNavBus}>
              {this.state.buses.map((bus,index) => (
                <ListItem key={index} position={bus.position}>
                  This bus is headed to {bus.tripHeadSign}, going {bus.directionText} <button onClick={()=> this.zoomToThisBus(bus.position)}>Zoom To</button>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Buses Currently In Service</h3>
          )}
          <MapRender
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            stops0={this.state.stops0}
            stops1={this.state.stops1}
            userLocation={this.state.userLocation}
            center={this.state.mapCenter}
            defaultZoom={16}
            zoom={this.state.zoom}
            markers={this.state.buses}
            timer={this.state.countDown}
            path0={this.state.routeShape0}
            path1={this.state.routeShape1}
            predictions0={this.checkStopPrediction0}
            predictionInfo0={this.state.predictionsInfo0}
            predictions1={this.checkStopPrediction1}
            predictionInfo1={this.state.predictionsInfo1}
            />
            <FavNav
            closeNav={this.closeNav}
            />
            These are the user's routes: {this.state.usersRoutes}
        </Container>
      </div>
    )
  }
}
export default withAlert(Home);
