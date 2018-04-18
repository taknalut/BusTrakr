import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Search from "../components/Search";
import API from "../utils/API";
import MapRender from "../components/Map";

class Home extends Component {
  state = {
    result: {},
    search: "",
    routeShape: [],
    buses: [],
    check: false
  };
  componentDidMount(query) {
    this.searchRoutes1(JSON.stringify(70));
    console.log("compWillMount")
  }
  // componentWillUpdate(nextProps, nextState) {
  //   if (nextState.check) {
  //     console.log("made it?")
  //     //here it isnt changing the render()...........
  //     this.searchRoutes2(this.state.search)
  //   }
  // }
  // componentDidMount(query) {
  //   this.searchBuses(JSON.stringify(70));
  // }
  searchBuses = query => {
    let busesArray = [];
    API.busPositions(query)
      .then(res =>
      res.data.BusPositions.forEach(item =>
        busesArray.push({
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        })
      ),
      this.setState({buses: busesArray}))
      .catch(err => console.log(err));
  };
  searchRoutes1 = query => {
    let ShapeDefined = [];
    API.routeSearch(query)
      .then(res =>
      res.data.Direction0.Shape.forEach(item =>
        ShapeDefined.push({
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        })
      ),
      this.setState({routeShape: ShapeDefined}))
      .catch(err => console.log(err));
  };
        searchRoutes2 = (query) => {
          let ShapeDefined = [];
          API.routeSearch(query)
            .then(res =>
            res.data.Direction0.Shape.forEach(item =>
              ShapeDefined.push({
                lat: parseFloat(item.Lat),
                lng: parseFloat(item.Lon)
              })
            ),
            this.setState({routeShape: ShapeDefined, check:false}))
            .catch(err => console.log(err));
        };
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
    this.setState({check: true});
    // this.searchMovies2(this.state.search);
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

        <MapRender
          defaultZoom={10}
          markers={this.state.buses}
          test={this.state.routeShape}/>
      </Container>
    );
  }
}

export default Home;
