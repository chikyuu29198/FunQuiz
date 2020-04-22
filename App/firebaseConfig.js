import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAg0UKk4WI8Zz7BymV-TcpMHeB6uE66Wu8",
    authDomain: "runaway-d66da.firebaseapp.com",
    databaseURL: "https://runaway-d66da.firebaseio.com",
    projectId: "runaway-d66da",
    storageBucket: "runaway-d66da.appspot.com",
    messagingSenderId: "611689075000",
    appId: "1:611689075000:web:6de5909c5ef8fb89c431cd",
    measurementId: "G-FWZPFZ19FR"
  };

  export const app = firebase.initializeApp(firebaseConfig)