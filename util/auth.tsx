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
  const uri = props.self ? authCtx.getCurrentPfp() : props.uri;
  const uriValid = !!uri && uri !== "None";
  const imgStyle = style || { width: 100, height: 100 };
  return (
    <>
      <Image
        {...props}
        source={uriValid ? { uri: uri } : require("../assets/blankpfp.png")}
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
