// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHBxLJPk8Li3tEGawPWdCvfrK0qzuBG1Q",
  authDomain: "forest-skater.firebaseapp.com",
  projectId: "forest-skater",
  storageBucket: "forest-skater.appspot.com",
  messagingSenderId: "520569438457",
  appId: "1:520569438457:web:e0f8f29de2db620d21a228"
};

// Initialize Firebase
// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };