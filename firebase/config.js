// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/database";

import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

// Optionally import the services that you want to use
import { initializeAuth } from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
// import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9gIkbRc-zbcp75JhIrarBw_8hAz1pqME",
  authDomain: "re-project-c17f7.firebaseapp.com",
  projectId: "re-project-c17f7",
  storageBucket: "re-project-c17f7.appspot.com",
  messagingSenderId: "264830207640",
  appId: "1:264830207640:web:1295f907eb2988624bf2ed",
};

let app;
if (firebase.apps.length <= 0) app = firebase.initializeApp(firebaseConfig);
else app = firebase.app();

if (firebase.auth.length <= 0) {
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorageLib),
  });
}

const auth = firebase.auth();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectDatabase = firebase.database();

export { auth, projectStorage, projectFirestore, projectDatabase };
