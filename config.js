import firebase from 'firebase';
require('@firebase/firestore')

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAnV4h1_Dk-8viNJMhXHgi7-Fgf8m6ld4k",
    authDomain: "story-hub-29c90.firebaseapp.com",
    databaseURL: "https://story-hub-29c90.firebaseio.com",
    projectId: "story-hub-29c90",
    storageBucket: "story-hub-29c90.appspot.com",
    messagingSenderId: "704813750584",
    appId: "1:704813750584:web:1a8e9a90b4a48835a449cd"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  
  export default db;
