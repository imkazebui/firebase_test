import React from "react";
import firebaseui from "firebaseui";

import firebase, {
  firebaseAuth,
  firebaseDatabase as database
} from "../firebase";

const ui = new firebaseui.auth.AuthUI(firebaseAuth);

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      console.log("hello", authResult, redirectUrl);

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = authResult.credential.accessToken;
      // The signed-in user info.
      var user = authResult.user;
      const name = user.displayName ? user.displayName : user.email;
      database.ref(`users/${user.uid}`).once("value", snapshot => {
        if (!snapshot.val()) {
          database.ref(`users/${user.uid}`).set({
            name,
            uid: user.uid,
            email: user.email,
            rooms: [],
            token
          });
        }
      });

      return true;
    }
  },

  signInFlow: "popup",
  signInSuccessUrl: "http://localhost:3000/#/join",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: ["https://www.googleapis.com/auth/plus.login"],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: "select_account"
      }
    }
  ]
};

export default class Login extends React.Component {
  componentDidMount() {
    ui.start("#firebaseui-auth-container", uiConfig);
  }
  render() {
    return <div id="firebaseui-auth-container" />;
  }
}
