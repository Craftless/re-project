// import axios from "axios";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ActivityIndicator, Alert, Image, View } from "react-native";
import { auth } from "../firebase/config";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
// import ExpoFastImage from "expo-fast-image";
// import CachedImage from "expo-cached-image";

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
  const { style } = props;
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const uri = props.uri || authCtx.getCurrentPfp();
  const imgStyle = style || { width: 100, height: 100 };
  return (
    <>
      <Image
        {...props}
        source={{ uri: uri }}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
        style={[imgStyle, isLoading && { opacity: 0 }]}
      />
      {isLoading && (
        <ActivityIndicator
          size="small"
          style={{ position: "absolute", alignSelf: "center" }}
        />
      )}
    </>
  );
}
