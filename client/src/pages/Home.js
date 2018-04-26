import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
import Search from "../components/Search";
import TestSearch from "../components/TestSearch"
import MapRender from "../components/Map"
import FavNav from "../components/FavNav"
import API from "../utils/API";
import RouteSaveBtn from "../components/RouteSaveBtn";
import "./Home.css"

class Home extends Component {
  state = {
    result: {},
    search: "10A",
    routeShape: [],
    buses: [],
    firstBus: {},
    check: false,
    zoom: 10,
    value: TestSearch.value, // this is a test from Angela
    validSearch: "10A",
    isLoggedIn: false,
    usersRoutes: [],
    savePrompt: "Save Route",
    stops: [],
    clickedMarker: null,
    predictionsInfo: []
  };

  // handleToggleOpen = (index) => (
  //         this.setState({clickedMarker: index})
  // );

  componentDidMount(query) {
    this.searchRoutes();
    // this.searchBuses();
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

  // onToggleOpen = () => (
  //   this.setState({isOpen: true})
  // );

  searchRoutes = () => {
    API.routeSearch(this.state.search)
      .then(res => {
      let ShapeDefined = [];
      res.data.Direction0.Shape.forEach(item =>
        ShapeDefined.push({
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        })
      ),

      this.setState({routeShape: ShapeDefined}),
      this.searchBuses(),
      this.searchRouteStops()
      console.log("SearchRoutes", res)
      this.setState({validSearch: this.state.search})
    })
      .catch(err => console.log(err));
  };

//work on tomorrow for bus stops
  searchRouteStops = () => {
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
      this.setState({stops: RouteStops}),
      this.searchBuses()
      console.log(this.state.stops)
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

  checkStopPrediction = (stopId) => {
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
      this.setState({predictionsInfo: predictionsArray})
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
    this.searchRoutes();
    console.log(this.state.routeShape)
  };

  handleFormSubmitTest = (event) => {
    event.preventDefault();
    this.searchRoutesTest();
    console.log(this.state.routeShape)
  };

  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  render() {
    return (
      <div>
      <Container>
      <Search
          value={this.state.search}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit.bind(this)}
        />
        {/*this is a test to see if handleformsubmit works*/}
        <TestSearch
        handleFormSubmitTest = {this.handleFormSubmit.bind(this)}
        />
        <button
          onClick={this.updateRoute}>
          {this.state.savePrompt}
        </button>
        <div
        className="nav-open"
        onClick={this.openNav}>&#9776; Veiw your saved lines
        </div>
        <MapRender
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          stops={this.state.stops}
          center={this.state.firstBus}
          defaultZoom={14}
          zoom={this.state.zoom}
          markers={this.state.buses}
          path={this.state.routeShape}
          predictions={this.checkStopPrediction}
          predictionInfo={this.state.predictionsInfo}

          />
          <FavNav
          closeNav={this.closeNav}
          />
      </Container>
      </div>
    );
  }
}
export default Home;
