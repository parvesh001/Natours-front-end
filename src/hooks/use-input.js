import { useState } from "react";

export default function useInput(checkValidation, initialValue) {
  const [userInput, setUserInput] = useState(initialValue || "");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const userInputIsValid = checkValidation(userInput);
  const hasError = !userInputIsValid && inputIsTouched;

  const userInputChangeHandler = (event)=>{
    setUserInput(event.target.value)
  }
  const userInputBlurHandler = ()=>{
    setInputIsTouched(true)
  }
 

  return {
    userInput,
    userInputIsValid,
    hasError,
    userInputChangeHandler,
    userInputBlurHandler
  }
}
