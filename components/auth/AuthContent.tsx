import { StyleSheet, View, Button } from "react-native";
import Colours from "../../constants/Colours";
import AuthForm from "./AuthForm";

function AuthContent({ isLogin = false }: { isLogin?: boolean }) {

  function switchAuthModeHandler() {

  }

  return (
    <View style={styles.rootContainer}>
      <AuthForm isLogin={isLogin} />
      <View>
        <Button title={isLogin ? "Create a new account" : "Log in instead"} onPress={switchAuthModeHandler} />
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 64 ,
    marginHorizontal: 32,
    backgroundColor: Colours.error200,
    padding: 16,
    borderRadius: 16,
  },
});
