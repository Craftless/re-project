// import React, { useEffect, useState, useRef, useContext } from "react";

// import { Image, Alert } from "react-native";
// import * as FileSystem from "expo-file-system";

// import * as CONST from "../../constants/Paths";
// import { useSafeAreaFrame } from "react-native-safe-area-context";
// import { AuthContext } from "../../store/auth-context";
// import { useCustomEventListener } from "react-custom-events";

// const CachedFastImage = (props: any) => {
//   const authCtx = useContext(AuthContext);

//   const {
//     source: { uri },
//     // cacheKey,
//   } = props;
//   let confUri: string = uri.replace(/^[^]*.com/, "");
//   confUri = confUri
//     .replaceAll("/", "")
//     .replaceAll("?", "")
//     .replaceAll("=", "")
//     .replaceAll("&", "")
//     .replaceAll("%", "");
//   console.log(`CONFI URI: ${confUri}`);
//   const fileURI = `${CONST.IMAGE_CACHE_FOLDER}${confUri}`;

//   const [imgUri, setImgUri] = useState("");

//   const componentIsMounted = useRef(true);
//   const downloadResumableRef = useRef(
//     FileSystem.createDownloadResumable(uri, fileURI, {}, _callback)
//   );

//   useEffect(() => {
//     loadImage();

//     return () => {
//       componentIsMounted.current = false;
//     };
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // useEffect(() => {
//   //   loadImage();
//   //   console.log("Loading Image");
//   // }, [props]);

//   useEffect(() => {
//     console.log(`ImgUri: ${imgUri}`);
//   }, [imgUri]);

//   // useEffect(() => {
//   //   forceRedownload();
//   //   console.log(`FORCING, ${authCtx.change}`);
//   // }, [authCtx.change]);

//   useCustomEventListener("pfp-changed", () => {
//     forceRedownload();
//   });

//   const loadImage = async () => {
//     try {
//       // Use the cached image if it exists
//       const metadata = await FileSystem.getInfoAsync(fileURI);
//       // console.log({metadata})
//       if (!metadata.exists || metadata?.size === 0) {
//         // download to cache
//         if (componentIsMounted.current) {
//           const response = await downloadResumableRef.current.downloadAsync();
//           if (!response) {
//             Alert.alert("Response is undefined");
//             return;
//           }
//           if (componentIsMounted.current && response.status === 200) {
//             setImgUri(`${fileURI}?`); // deep clone to force re-render
//           }
//           if (response.status !== 200) {
//             FileSystem.deleteAsync(fileURI, { idempotent: true }); // delete file locally if it was not downloaded properly
//           }
//         } else {
//           setImgUri(`${fileURI}?`);
//         }
//       }
//     } catch (err) {
//       console.log(`SOMERIOAEISF:`, { err });
//     }
//   };

//   async function forceRedownload() {
//     await FileSystem.deleteAsync(fileURI, { idempotent: true });
//     if (componentIsMounted.current) {
//       const response = await downloadResumableRef.current.downloadAsync();
//       if (!response) {
//         Alert.alert("Response is undefined");
//         return;
//       }
//       if (componentIsMounted.current && response.status === 200) {
//         setImgUri(`${fileURI}?`); // deep clone to force re-render
//       }
//       if (response.status !== 200) {
//         FileSystem.deleteAsync(fileURI, { idempotent: true }); // delete file locally if it was not downloaded properly
//       }
//     } else {
//       setImgUri(`${fileURI}?`);
//     }
//   }

//   function _callback(downloadProgress: any) {
//     if (componentIsMounted.current === false) {
//       downloadResumableRef.current.pauseAsync();
//       FileSystem.deleteAsync(fileURI, { idempotent: true }); // delete file locally if it was not downloaded properly
//     }
//   }

//   if (!imgUri) return null;

//   return (
//     <Image
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       {...props}
//       source={{
//         uri: imgUri,
//       }}
//     />
//   );
// };

// export default CachedFastImage;
