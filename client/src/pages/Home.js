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
    validSearch: "10A"
  };

  componentDidMount(query) {
    this.searchRoutes();
    // this.searchBuses();
    console.log("compWillMount")
    // localStorage.setItem('googleID', 'fda');
  };

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

      // Setting routename that has been verified to be existent
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

  saveRoute = () => {
    var googleID = localStorage.getItem("googleID");

    if (!googleID) {
      console.log("You need to log in, fam");
    }

    API.saveRoute(googleID, {routes: [666]});
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
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
        <RouteSaveBtn
          onClick={this.saveRoute}
        />
        <MapRender
          center={this.state.firstBus}
          defaultZoom={14}
          zoom={this.state.zoom}
          markers={this.state.buses}
          test={this.state.routeShape}
        />
        {this.state.validSearch}
      </Container>
    );
  }
}

export default Home;
