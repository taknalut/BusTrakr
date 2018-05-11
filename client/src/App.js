import React, { Component } from "react";
import Home from "./pages";
import Nav from "./components/Nav";
import Login from "./components/Login";
import FavNav from "./components/FavNav"
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
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
    console.log("Sign in", this.state.isSignedIn);
    console.log(this.state.routes);
  }

  onSignOutSuccess = () => {
    this.setState({
      isSignedIn: false,
      uuid: null
    });
    console.log("Sign out", this.state.isSignedIn);
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
      <Provider template={AlertTemplate} {...options}>
          <Nav>
          <Login onSignInSuccess={this.onSignInSuccess.bind(this)} onSignOutSuccess={this.onSignOutSuccess.bind(this)} isOpenSignIn={this.state.open} isCloseSignIn={this.closeSignInModal.bind(this)}/>
          </Nav>
          <Home isSignedIn={this.state.isSignedIn} userID={this.state.uuid} openSignIn={this.openSignInModal.bind(this)} userSavedRoutes={this.state.routes}/>
      </Provider>
    );
  }
}

export default App;
