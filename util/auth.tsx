// import axios from "axios";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import { ActivityIndicator, Image } from "react-native";
import { auth, projectDatabase } from "../firebase/config";

import { useState } from "react";

export async function createUser(
  email: string,
  password: string,
  onError: (error: any) => void
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // await updateUserProfile({

    // })
    return user;
  } catch (error) {
    onError(error);
  }
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

export function writeUserData(data: { displayName: string; pfpUrl: string }) {
  if (!auth.currentUser) return;
  projectDatabase.ref("userInfo/" + auth.currentUser.uid).set(data);
}

export function getCurrentUserDisplayNameOrEmailNonNullFromUser(
  user: firebase.User
) {
  return getCurrentUserDisplayNameFromUser(user) || user.email || "None";
}

export function getCurrentUserProfilePictureNonNullFromUser(
  user: firebase.User
) {
  return getCurrentUserProfilePictureFromUser(user) || "None";
}

export function getCurrentUserProfilePictureFromUser(user: firebase.User) {
  if (user.photoURL) {
    return user.photoURL;
  }
  return "None";
}

export function getCurrentUserDisplayNameFromUser(user: firebase.User) {
  if (user) {
    return user.displayName;
  }
  return null;
}

export async function updateUserProfile(
  user: firebase.User,
  object: {
    displayName?: string;
    photoURL?: string;
  }
) {
  if (user) {
    await user.updateProfile({
      displayName: object.displayName || undefined,
      photoURL: object.photoURL || undefined,
    });
    await writeUserData({
      displayName: getCurrentUserDisplayNameOrEmailNonNullFromUser(user),
      pfpUrl: getCurrentUserProfilePictureNonNullFromUser(user),
    });
  }
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
  const [isLoading, setIsLoading] = useState(true);
  const uri =
    props.self && auth.currentUser
      ? getCurrentUserProfilePictureNonNullFromUser(auth.currentUser)
      : props.uri;
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
