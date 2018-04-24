import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
// import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
import Search from "../components/Search";
import API from "../utils/API";
import MapRender from "../components/Map";
import RouteSaveBtn from "../components/RouteSaveBtn";

class Home extends Component {
  state = {
    result: {},
    search: "10A",
    routeShape: [],
    buses: [],
    firstBus: {},
    check: false,
    zoom: 10,
    validSearch: "10A",
    isLoggedIn: false,
    usersRoutes: [],
    savePrompt: "Save Route"
  };

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
      this.setState({routeShape: ShapeDefined, zoom: 9}),
      this.searchBuses(),

      // Set routename that has been verified to exist
      this.setState({validSearch: this.state.search})
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
        tripHeadSign: String(item.tripHeadsign),
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
          center={this.state.firstBus}
          defaultZoom={14}
          zoom={this.state.zoom}
          markers={this.state.buses}
          test={this.state.routeShape}
        />
        {this.state.usersRoutes}, {this.state.validSearch}
      </Container>
    );
  }
}

export default Home;
