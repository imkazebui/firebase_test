import React, { Component } from "react";
import firebase from "firebase";
import firebaseui from "firebaseui";
import logo from "./logo.svg";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyC6gvbFhVRuvbLyVRACGaA4lQjTuAApa9M",
  authDomain: "testfirebase-71bb3.firebaseapp.com",
  databaseURL: "https://testfirebase-71bb3.firebaseio.com",
  projectId: "testfirebase-71bb3",
  storageBucket: "testfirebase-71bb3.appspot.com",
  messagingSenderId: "641513398983"
};

firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
};

class App extends Component {
  componentDidMount() {
    ui.start("#firebaseui-auth-container", uiConfig);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="firebaseui-auth-container" />
      </div>
    );
  }
}

export default App;
