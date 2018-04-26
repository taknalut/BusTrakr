import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import API from "../../utils/API";

const config = {
    apiKey: "AIzaSyB_-pqlyQ-iBcT02LL0uDf4CPt8TPNNFog",
    authDomain: "bustrakr-146b5.firebaseapp.com",
    databaseURL: "https://bustrakr-146b5.firebaseio.com",
    projectId: "bustrakr-146b5",
    storageBucket: "bustrakr-146b5.appspot.com",
    messagingSenderId: "562142304940"
};

firebase.initializeApp(config);

class Firebase extends Component {
  state = {
    isSignedIn: false,
    currentUid: null
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessUrl: () => false,

    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => {
          this.setState({ isSignedIn: !!user })

          if (user && user.uid != this.state.currentUid) {
            this.setState({currentUid: user.uid});
            localStorage.setItem('googleID', [user.uid]);

            API.checkUserExist(user.uid).
              then((result) => {
                if (result.data.length < 1) {

                  const newUser = {
                    username: "newPerson",
                    uuid: user.uid,
                    routes: []
                  };

                  API.createUser(newUser).
                    then((result) => {
                      console.log(result);
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


  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h4 className="text-center">Welcome {firebase.auth().currentUser.displayName}!<br/> You are now signed-in!</h4>
        <a className="btn btn-dark" onClick={() => firebase.auth().signOut()}>Sign out</a>
      </div>
    );
  }
}

export default Firebase;
