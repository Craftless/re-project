import { StyleSheet, View, Button } from "react-native";
import AuthForm from "./AuthForm";

function AuthContent({ isLogin = false }: { isLogin?: boolean }) {

  function switchAuthModeHandler() {
    
  }

  return (
    <View style={styles.rootContainer}>
      <AuthForm isLogin={isLogin} />
      <View>
        <Button title={isLogin ? "Sign up" : "Log in"} onPress={switchAuthModeHandler} />
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
