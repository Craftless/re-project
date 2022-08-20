// import { Dimensions, ScrollView, View } from "react-native";
// import AppText from "../components/ui/AppText";
// import Carousel from "react-native-reanimated-carousel";

// function ChooseAvatarScreen() {
//   const width = Dimensions.get("window").width;
//   return (
//     <ScrollView>
//       <Carousel
//         mode="parallax"
//         loop
//         width={width}
//         height={width / 2}
//         data={[...new Array(6).keys()]}
//         scrollAnimationDuration={1000}
//         onSnapToItem={(index) => console.log("current index:", index)}
//         renderItem={({ index }) => (
//           <View
//             style={{
//               flex: 1,
//               borderWidth: 1,
//               justifyContent: "center",
//             }}
//           >
//             <AppText style={{ textAlign: "center", fontSize: 30 }}>{index}</AppText>
//           </View>
//         )}
//       />
//     </ScrollView>
//   );
// }

// export default ChooseAvatarScreen;
import * as React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { BlurView as _BlurView } from "expo-blur";
import { parallaxLayout } from "../util/parallax";
import {
  ActivityIndicator,
  Button,
  Switch,
  useTheme,
} from "react-native-paper";
import { AuthContext } from "../store/auth-context";
import { avatars } from "../constants/avatars";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "./SettingsStack";
import ColorPicker from "react-native-wheel-color-picker";
import AppText from "../components/ui/AppText";
import { CustomConfig } from "react-native-reanimated-carousel/lib/typescript/types";

const BlurView = Animated.createAnimatedComponent(_BlurView);

const window = Dimensions.get("window");
const PAGE_WIDTH = window.width / 2;

function ChooseAvatarScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<SettingsStackParamList>;
}) {
  const [isAwaitingResponse, setIsAwaitingResponse] = React.useState(false);
  const authCtx = React.useContext(AuthContext);
  const [currentColor, setCurrentColor] = React.useState("");
  const [choosingColour, setChoosingColour] = React.useState(false);
  const [isTransparent, setIsTransparent] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const theme = useTheme();
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  async function chooseAvatarHandler(colour?: string) {
    if (isAwaitingResponse) return;
    console.log("current index:", currentIndex);
    const index = currentIndex;
    setIsAwaitingResponse(true);
    await authCtx.updatePfpAvatar(index, colour);
    setIsAwaitingResponse(false);
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate("Default");
  }

  function onColorChange(color: string) {
    setCurrentColor(color);
  }

  React.useEffect(() => {}, [choosingColour]);

  const onToggleSwitch = () => setIsTransparent(!isTransparent);

  return (
    <>
      {isAwaitingResponse && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      {!isAwaitingResponse && (
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              borderBottomColor: isTransparent
                ? theme.colors.placeholder
                : currentColor,
              borderBottomWidth: 2,
              padding: 16,
            }}
          >
            <Button
              mode="outlined"
              onPress={() => {
                setChoosingColour(!choosingColour);
              }}
              disabled={isTransparent}
            >
              {choosingColour ? `Confirm` : `Choose Colour`}
            </Button>
            {!choosingColour && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <AppText style={{ marginLeft: 8 }}>Transparent</AppText>
                <Switch
                  style={{ marginHorizontal: 8 }}
                  value={isTransparent}
                  onValueChange={onToggleSwitch}
                />
              </View>
            )}
          </View>

          {choosingColour && (
            <View style={{ flex: 1, margin: 16 }}>
              <ColorPicker
                color={currentColor}
                swatchesOnly={false}
                onColorChange={onColorChange}
                // onColorChangeComplete={this.onColorChangeComplete}
                thumbSize={40}
                sliderSize={40}
                noSnap={false}
                row={false}
                swatchesLast
                swatches
              />
            </View>
          )}
          {!choosingColour && (
            <>
              <Carousel
                onSnapToItem={(index) => {
                  setCurrentIndex(index);
                  console.log(index);
                }}
                loop={true}
                autoPlay={false}
                style={{
                  width: window.width,
                  height: 240,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                width={PAGE_WIDTH}
                data={[...avatars]}
                renderItem={({ item, index, animationValue }) => {
                  return (
                    <CustomItem
                      key={index}
                      source={item}
                      animationValue={animationValue}
                    />
                  );
                }}
                customAnimation={parallaxLayout(
                  {
                    size: PAGE_WIDTH,
                    vertical: false,
                  },
                  {
                    parallaxScrollingScale: 1,
                    parallaxAdjacentItemScale: 0.5,
                    parallaxScrollingOffset: 40,
                  }
                )}
                scrollAnimationDuration={500}
              />
              <Button
                mode="contained"
                onPress={async() => {
                  await delay(1500);
                  chooseAvatarHandler(currentColor);
                }}
                style={{ marginVertical: 16, marginHorizontal: 8 }}
              >
                Choose
              </Button>
            </>
          )}
        </View>
      )}
    </>
  );
}

interface ItemProps {
  source: ImageSourcePropType;
  animationValue: Animated.SharedValue<number>;
}
const CustomItem: React.FC<ItemProps> = ({ source, animationValue }) => {
  const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationValue.value, [-1, 0, 1], [1, 0, 1]);

    return {
      opacity,
    };
  }, [animationValue]);

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={source}
        resizeMode={"contain"}
        style={{ width: "150%", height: "150%" }}
      />
      <BlurView
        intensity={50}
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, maskStyle]}
      />
    </View>
  );
};

export default ChooseAvatarScreen;
