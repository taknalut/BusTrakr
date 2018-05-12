import React, { Component } from "react";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./components/Login";
import FavNav from "./components/FavNav"
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./pages/About";
import "./App.css";

const options = {
  timeout: 5000,
  position: "bottom center"
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSignedIn: false,
      uuid: null,
      open: false,
      routes: []
    };
  }

  onSignInSuccess = (currentUid, usersRoutes) => {
    this.setState({
      isSignedIn: true,
      uuid: currentUid,
      open: false,
      routes: usersRoutes
    });
  }

  onSignOutSuccess = () => {
    this.setState({
      isSignedIn: false,
      uuid: null
    });
  }

  openSignInModal = () => {
    this.setState({
      open: true
    });
  }

  closeSignInModal = () => {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <Router>
        <Provider template={AlertTemplate} {...options}>
            <Nav>
            <Login onSignInSuccess={this.onSignInSuccess.bind(this)} onSignOutSuccess={this.onSignOutSuccess.bind(this)} isOpenSignIn={this.state.open} isCloseSignIn={this.closeSignInModal.bind(this)}/>
            </Nav>
            <Route exact path="/" render={() => <Home isSignedIn={this.state.isSignedIn} userID={this.state.uuid} openSignIn={this.openSignInModal.bind(this)} userSavedRoutes={this.state.routes}/> }/>
            <Route exact path="/about" component={About} />
        </Provider>
      </Router>
    );
  }
}

export default App;
