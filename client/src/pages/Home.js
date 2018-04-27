import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
import Search from "../components/Search";
import MapRender from "../components/Map"
import API from "../utils/API";
import RouteSaveBtn from "../components/RouteSaveBtn";

class Home extends Component {
  state = {
    result: {},
    search: "10A",
    routeShape0: [],
    routeShape1: [],
    buses: [],
    firstBus: {},
    check: false,
    zoom: 10,
    stops0: [],
    stops1: [],
    validSearch: "10A",
    isLoggedIn: false,
    usersRoutes: [],
    savePrompt: "Save Route",
    clickedMarker: null,
    predictionsInfo0: [],
    predictionsInfo1: []
  };

  componentDidMount(query) {
    this.searchRoutes0();
    //Need to fix the error of too many requests
    this.searchRouteStops1();
    console.log("compWillMount")

    this.checkLoginStatus();
  };


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

  searchRoutes0 = () => {
    API.routeSearch(this.state.search)
      .then(res => {
      let ShapeDefined = [];
      res.data.Direction0.Shape.forEach(item =>
        ShapeDefined.push({
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        })
      ),

      this.setState({routeShape0: ShapeDefined}),
      this.searchBuses(),
      this.searchRouteStops0(),
      this.searchRoutes1(),
      console.log("SearchRoutes", res)
    })
      .catch(err => console.log(err));
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
    var theirRoutes = this.state.usersRoutes;

    console.log(theirRoutes);

    theirRoutes.push(this.state.validSearch);

    this.setState({ usersRoutes: theirRoutes});
    this.setState({ savePrompt: "Remove Route" })

    console.log("This is usersRoutes as defined by the state, on save");
    console.log(this.state.usersRoutes);
  }

  removeRoute = () => {
    var theirRoutes = this.state.usersRoutes;

    console.log(theirRoutes);
    var index = theirRoutes.indexOf(this.state.validSearch);

    if (index > -1) {
      theirRoutes.splice(index, 1);
    }

    this.setState({ usersRoutes: theirRoutes});
    this.setState({ savePrompt: "Save Route" })

    console.log("This is usersRoutes as defined by the state, on remove");
    console.log(this.state.usersRoutes);
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

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchRoutes0();
    console.log(this.state.routeShape0)
  };

  render() {
    return (
      <Container>
        <Search
          value={this.state.search}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit.bind(this)}
        />
        <button
          onClick={this.updateRoute}>
          {this.state.savePrompt}
        </button>
        <MapRender
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          stops0={this.state.stops0}
          stops1={this.state.stops1}
          center={this.state.firstBus}
          defaultZoom={14}
          zoom={this.state.zoom}
          markers={this.state.buses}
          path0={this.state.routeShape0}
          path1={this.state.routeShape1}
          predictions0={this.checkStopPrediction0}
          predictionInfo0={this.state.predictionsInfo0}
          predictions1={this.checkStopPrediction1}
          predictionInfo1={this.state.predictionsInfo1}
          />
      </Container>
    );
  }
}
export default Home;
