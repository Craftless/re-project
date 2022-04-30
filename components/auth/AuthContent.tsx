import { View } from "react-native";
import AuthForm from "./AuthForm";

function AuthContent({ isLogin = false }: { isLogin?: boolean }) {
  return (
    <View>
      <AuthForm />
      <View></View>
    </View>
  );
}

export default AuthContent;
