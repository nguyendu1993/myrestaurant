import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: 'AIzaSyAftz67ITYF0_o89L1ERADmvYPc-7YhgEU',
  authDomain: 'duanttn.firebaseapp.com',
  databaseURL: 'https://duanttn.firebaseio.com',
  projectId: 'duanttn',
  storageBucket: 'duanttn.appspot.com',
  messagingSenderId: '646002843115',
  appId: '1:646002843115:web:76e231d4be9f5157e5cdae',
  measurementId: 'G-KBNTKYJ4HS',

  // apiKey: "AIzaSyBRuH1YiiJRwrQVge9tuDh80GzIJpwVAWY",
  // authDomain: "projectfinal-db031.firebaseapp.com",
  // databaseURL: "https://projectfinal-db031.firebaseio.com",
  // projectId: "projectfinal-db031",
  // storageBucket: "projectfinal-db031.appspot.com",
  // messagingSenderId: "588075255846",
  // appId: "1:588075255846:web:02a53bfc925ab73bcfbee7",
  // measurementId: "G-BWJX1X84CL"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
