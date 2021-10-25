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
const db = firebase.firestore()

// const getUsers = async () => {
//   const userDocuments = db.collection("users").get()
//   console.log(userDocumets)
// }

export const getUsers = async () => {
  const userRef = db.collection("users")
  const snapshot = await userRef.get();

  try {
    return snapshot.docs.map(doc => doc.data());
  } catch {
    console.log("Error in returning data")
    return
  }
}

export const getUser = async (uid) => {
  const userRef = db.collection("users").doc(uid)
  const snapshot = await userRef.get()
  
  try {
    if (snapshot.exists) {
      return snapshot.data()
    }
  } catch {
    console.log("Error in returning data")
    return
  }
}

export const createUserDocument = async (uid, email) => {
  const userRef = db.doc(`users/${uid}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
      const name = email;
      const highscore = 0;

      try {
          userRef.set({
              name,
              highscore,
          })
        } catch(error) {
          console.log("Error in creating user", error)
      }
    }
}

export const updateHighScore = async (uid, score) => {
  const userRef = db.doc(`users/${uid}`)
  const snapshot = await userRef.get()

  if (snapshot.exists) {
    if (snapshot.data().highscore < score) {
      userRef.update({
        highscore: score,
      }).then(() => {
        console.log("New Highscore!")
        
      })
    }
  }
}

export { auth };