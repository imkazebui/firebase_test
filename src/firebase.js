import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC6gvbFhVRuvbLyVRACGaA4lQjTuAApa9M",
  authDomain: "testfirebase-71bb3.firebaseapp.com",
  databaseURL: "https://testfirebase-71bb3.firebaseio.com",
  projectId: "testfirebase-71bb3",
  storageBucket: "testfirebase-71bb3.appspot.com",
  messagingSenderId: "641513398983"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const firebaseAuth = firebase.auth();

export const firebaseDatabase = firebase.database();
