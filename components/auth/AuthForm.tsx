import { useContext } from "react";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import useInput from "../../hooks/use-input";
import { AuthContext } from "../../store/auth-context";
import { createUser, logIn } from "../../util/auth";
import Input from "../ui/Input";
import RegularButton from "../ui/RegularButton";

function AuthForm({ isLogin = false }: { isLogin?: boolean }) {
  const authCtx = useContext(AuthContext);

  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    reset: resetEmail,
    inputTouchedHandler: emailInputTouchedHandler,
    valueChangeHandler: emailValueChangeHandler,
    enteredConfirmValue: enteredConfirmEmail,
    confirmFieldIsValid: confirmEmailIsValid,
    confirmFieldHasError: confirmEmailHasError,
    confirmValueChangeHandler: confirmEmailChangeHandler,
    confirmInputTouchedHandler: confirmEmailTouchedHandler,
  } = useInput((val) => val.includes("@"));

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    reset: resetPassword,
    inputTouchedHandler: passwordInputTouchedHandler,
    valueChangeHandler: passwordValueChangeHandler,
    enteredConfirmValue: enteredConfirmPassword,
    confirmFieldIsValid: confirmPasswordIsValid,
    confirmFieldHasError: confirmPasswordHasError,
    confirmValueChangeHandler: confirmPasswordChangeHandler,
    confirmInputTouchedHandler: confirmPasswordTouchedHandler,
  } = useInput((val) => val.trim().length > 6);

  const formIsValid =
    emailIsValid &&
    (confirmEmailIsValid || isLogin) &&
    passwordIsValid &&
    (confirmPasswordIsValid || isLogin);

  function setAllTouched() {
    emailInputTouchedHandler();
    confirmEmailTouchedHandler();
    passwordInputTouchedHandler();
    confirmPasswordTouchedHandler();
  }

  async function formSubmitHandler(email: string, password: string) {
    resetEmail();
    resetPassword();
    let user;
    try {
      if (isLogin) {
        user = await logIn(email.trim(), password.trim(), (error) => {
          Alert.alert(`${error.code}: ${error.message}`);
        });
      } else {
        user = await createUser(email.trim(), password.trim(), (error) => {
          Alert.alert(`${error.code}: ${error.message}`);
        });
      }
      console.log("LLLL");
    } catch (e: any) { // TODO find out what type Error is
      Alert.alert(e.message);
      return;
    }
    
  }

  return (
    <View>
      <Input
        keyboardType="email-address"
        hasError={emailHasError}
        label="Email Address"
        onInputBlur={emailInputTouchedHandler}
        onValueChange={emailValueChangeHandler}
        valueObj={{value: enteredEmail}}
      />
      {!isLogin && (
        <Input
          keyboardType="email-address"
          hasError={confirmEmailHasError}
          label="Confirm Email Address"
          onInputBlur={confirmEmailTouchedHandler}
          onValueChange={confirmEmailChangeHandler}
          valueObj={{value: enteredConfirmEmail}}
        />
      )}
      <Input
        keyboardType="default"
        hasError={passwordHasError}
        label="Password"
        onInputBlur={passwordInputTouchedHandler}
        onValueChange={passwordValueChangeHandler}
        valueObj={{value: enteredPassword}}
      />
      {!isLogin && (
        <Input
          keyboardType="default"
          hasError={confirmPasswordHasError}
          label="Confirm Password"
          onInputBlur={confirmPasswordTouchedHandler}
          onValueChange={confirmPasswordChangeHandler}
          valueObj={{value: enteredConfirmPassword}}
        />
      )}
      <RegularButton
        onPress={() => {
          if (!formIsValid) {
            setAllTouched();
            return;
          }
          formSubmitHandler(enteredEmail, enteredPassword);
        }}
        disabled={!formIsValid}
      >
        {isLogin ? "Log in" : "Sign up"}
      </RegularButton>
    </View>
  );
}

export default AuthForm;
