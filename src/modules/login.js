import React from "react";
import firebaseui from "firebaseui";

import firebase, { firebaseAuth } from "../firebase";

const ui = new firebaseui.auth.AuthUI(firebaseAuth);

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
};

export default class Login extends React.Component {
  componentDidMount() {
    ui.start("#firebaseui-auth-container", uiConfig);
  }
  render() {
    return <div id="firebaseui-auth-container" />;
  }
}
