import React, { useState } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

function useInput(validationFunc: (value: string) => boolean) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validationFunc(enteredValue);
  const hasError = !valueIsValid && isTouched;

  function valueChangeHandler(text: string) {
    setEnteredValue(text);
  }

  function inputBlurHandler(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    setIsTouched(true);
  }

  function reset() {
    setEnteredValue("");
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
}

export default useInput;