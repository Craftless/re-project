// import axios from "axios";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Alert, Image } from "react-native";
import { auth } from "../firebase/config";

import CachedImage from "expo-cached-image";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
// import CachedFastImage from "../components/functionality/CachedFastImage";

// const API_KEY = "AIzaSyB9gIkbRc-zbcp75JhIrarBw_8hAz1pqME";

// async function authenticate(
//   mode: "signUp" | "logIn",
//   email: string,
//   password: string
// ) {
//   let urlCont;
//   switch (mode) {
//     case "signUp":
//       urlCont = "signUp";
//       break;
//     case "logIn":
//       urlCont = "signInWithPassword";
//       break;
//   }
//   const response = await axios.post(
//     `https://identitytoolkit.googleapis.com/v1/accounts:${urlCont}?key=${API_KEY}`,
//     { email: email, password: password, returnSecureToken: true }
//   );
// }

export async function createUser(
  email: string,
  password: string,
  onError: (error: any) => void
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      onError(error);
    });
  // authenticate("signUp", email, password);
}

export async function logIn(
  email: string,
  password: string,
  onError: (error: any) => void
) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      onError(error);
    });
  // authenticate('logIn', email, password);
}

// export function CachedProfilePicture(props: any) {
//   const authCtx = useContext(AuthContext);
//   return (
//     <CachedFastImage
//       {...props}
//       source={{ uri: authCtx.getCurrentPfp() }}
//       // cacheKey={`${authCtx.user?.uid}-pfp`}
//     />
//   );
// }


export function ProfilePicture(props: any) {
  const authCtx = useContext(AuthContext);
  return (
    <Image
      {...props}
      source={{ uri: authCtx.getCurrentPfp() }}
    />
  );
}
