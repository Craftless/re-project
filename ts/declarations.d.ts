declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "expo-cached-image";
declare module "expo-fast-image"
declare module 'tinycolor2';
eclare module 'expo-chart-kit';