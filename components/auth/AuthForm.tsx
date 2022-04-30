import { TextInput, View } from "react-native";
import useInput from "../../hooks/use-input";
import Input from "../ui/Input";

function AuthForm() {
  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    reset: resetEmail,
    inputBlurHandler: emailInputBlurHandler,
    valueChangeHandler: emailValueChangeHandler,
  } = useInput((val) => val.includes("@"));

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    reset: resetPassword,
    inputBlurHandler: passwordInputBlurHandler,
    valueChangeHandler: passwordValueChangeHandler,
  } = useInput((val) => val.trim().length > 6);

  return (
    <View>
      <Input
        keyboardType="email-address"
        hasError={emailHasError}
        label="Email Address"
        onInputBlur={emailInputBlurHandler}
        onValueChange={emailValueChangeHandler}
      />
      <Input
        keyboardType="default"
        hasError={passwordHasError}
        label="Password"
        onInputBlur={passwordInputBlurHandler}
        onValueChange={passwordValueChangeHandler}
      />
    </View>
  );
}

export default AuthForm;
