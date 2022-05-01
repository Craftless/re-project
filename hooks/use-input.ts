import React, { useState } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

function useInput(validationFunc: (value: string) => boolean) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const [enteredConfirmValue, setEnteredConfirmValue] = useState("");
  const [confirmIsTouched, setConfirmIsTouched] = useState(false);

  const valueIsValid = validationFunc(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const confirmFieldIsValid = enteredValue === enteredConfirmValue && valueIsValid;
  const confirmFieldHasError = !confirmFieldIsValid && confirmIsTouched;

  function valueChangeHandler(text: string) {
    setEnteredValue(text);
  }

  function inputTouchedHandler(event?: NativeSyntheticEvent<TextInputFocusEventData>) {
    setIsTouched(true);
  }

  function confirmValueChangeHandler(text: string) {
    setEnteredConfirmValue(text);
  }

  function confirmInputTouchedHandler(event?: NativeSyntheticEvent<TextInputFocusEventData>) {
    setConfirmIsTouched(true);
  }

  function reset() {
    setEnteredValue("");
    setIsTouched(false);
    setEnteredConfirmValue("");
    setConfirmIsTouched(false);
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputTouchedHandler,
    reset,
    enteredConfirmValue,
    confirmFieldIsValid,
    confirmFieldHasError,
    confirmValueChangeHandler,
    confirmInputTouchedHandler,
  };
}

export default useInput;