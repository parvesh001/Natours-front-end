import { useState } from "react";

export default function useFileInput() {
  const [fileInput, setFileInput] = useState(undefined);
  
  const fileInputIsValid = fileInput !== undefined;

  const fileInputChangeHandler = (event)=>{
    setFileInput(event.target.files[0])
  }

  return {
    fileInput,
    fileInputIsValid,
    fileInputChangeHandler,
  }
}
