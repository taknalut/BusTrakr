import React, { Component } from "react";
import ReactDOM from 'react-dom'
import Modal from 'react-responsive-modal';
import "./Login.css";
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import API from "../../utils/API";
import { config } from './config';

firebase.initializeApp(config);

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      open: false,
      isSignedIn: false,
      currentUid: null
    };
  }

  uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessUrl: () => {
          console.log("signin");
          return false
        }
      }
   };


  componentDidMount() {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
          (user) => {
            this.setState({ isSignedIn: !!user })
            console.log(this.state);

            if (user && user.uid != this.state.currentUid) {
              this.setState({currentUid: user.uid});
              localStorage.setItem('googleID', [user.uid]);

              API.checkUserExist(user.uid).
                then((result) => {
                  console.log("check user");
                  console.log(result);
                  if (result.data.length < 1) {
                    const newUser = {
                      username: user.displayName,
                      uuid: user.uid,
                      routes: []
                    };

                    API.createUser(newUser).
                      then((result) => {
                        console.log("line 59", result);
                      })
                  }

                  else {
                    console.log("User extant, don't do anything.");
                  }
              })
            }
            else {
              localStorage.removeItem('googleID');
            }
          }
      );
    }

    componentWillUnmount() {
      this.unregisterAuthObserver();
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
    };

  render() {
    const { open } = this.state;
    if (!this.state.isSignedIn) {
    return (
      <div className="cl-effect-7">
        <a className="mobile-view" onClick={this.onOpenModal}>Login/Register</a>
        <Modal open={open} onClose={this.onCloseModal} little>
          <div>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
        </Modal>
    </div>
    );
  }
  return (
    <div>
    <div>
    <Modal open={open} onClose={this.onCloseModal} little>
        <p className="text-center">Welcome {firebase.auth().currentUser.displayName}!<br/> You are now signed-in!</p>
    </Modal>
    </div>
    <div className="cl-effect-7">
      <a className="mobile-view" onClick={() => firebase.auth().signOut()}>Log out</a>
    </div>
    </div>
  );
}
}
