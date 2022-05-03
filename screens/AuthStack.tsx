import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};

function AuthStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Log in",
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            title: "Sign up",
          }}
        />
      </Stack.Navigator>
    </>
  );
}

export default AuthStack;
