import React, { useState } from "react";

function useInput(validationFunc: (value: string) => boolean) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validationFunc(enteredValue);
  const hasError = !valueIsValid && isTouched;

  function valueChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
  }

  function inputBlurHandler(event: React.FocusEvent<HTMLInputElement>) {
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