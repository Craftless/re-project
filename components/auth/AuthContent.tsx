import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View, Button, ScrollView } from "react-native";
import { RootStackParamList } from "../../screens/AuthStack";
import Colours from "../../constants/Colours";
import AuthForm from "./AuthForm";
import { Card } from "react-native-paper";
import AppText from "../ui/AppText";

function AuthContent({ isLogin = false }: { isLogin?: boolean }) {
  const navigation = isLogin
    ? useNavigation<NativeStackNavigationProp<RootStackParamList, "Login">>()
    : useNavigation<NativeStackNavigationProp<RootStackParamList, "Signup">>();

  function switchAuthModeHandler() {
    const screenToNavTo = isLogin ? "Signup" : "Login";
    navigation.replace(screenToNavTo);
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 5 }}>
        <Card style={styles.rootContainer}>
          <AuthForm isLogin={isLogin} />
          <View>
            <Button
              title={isLogin ? "Create a new account" : "Log in instead"}
              onPress={switchAuthModeHandler}
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  rootContainer: {
    alignSelf: "center",
    width: "80%",
    padding: 16,
    borderRadius: 16,
  },
});
