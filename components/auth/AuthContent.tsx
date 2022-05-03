import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View, Button } from "react-native";
import { RootStackParamList } from "../../screens/AuthStack";
import Colours from "../../constants/Colours";
import AuthForm from "./AuthForm";

function AuthContent({ isLogin = false }: { isLogin?: boolean }) {
  const navigation = isLogin
    ? useNavigation<NativeStackNavigationProp<RootStackParamList, "Login">>()
    : useNavigation<NativeStackNavigationProp<RootStackParamList, "Signup">>();

  function switchAuthModeHandler() {
    const screenToNavTo = isLogin ? "Signup" : "Login";
    navigation.replace(screenToNavTo);
  }

  return (
    <View style={styles.rootContainer}>
      <AuthForm isLogin={isLogin} />
      <View>
        <Button
          title={isLogin ? "Create a new account" : "Log in instead"}
          onPress={switchAuthModeHandler}
        />
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 64,
    marginHorizontal: 32,
    backgroundColor: Colours.error200,
    padding: 16,
    borderRadius: 16,
  },
});
