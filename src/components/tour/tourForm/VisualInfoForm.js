import React from "react";
import useFileInput from "../../../hooks/use-fileInput";
import useInput from "../../../hooks/use-input";
import Input from "../../../UIs/Input/Input";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import style from "./VisualInfoForm.module.scss";

function convertformat(inputDate) {
  let curr_dt = new Date(inputDate);
  let form_dt =
    curr_dt.getFullYear() +
    "-" +
    (curr_dt.getMonth() + 1) +
    "-" +
    curr_dt.getDate();
  return form_dt.replace(/\b\d\b/g, "0$&");
}

export default function VisualInfoForm(props) {
  const {
    fileInput: coverImageInput,
    fileInputIsValid: coverImageIsValid,
    fileInputChangeHandler: coverImageChangeHandler,
  } = useFileInput();
  const {
    fileInput: imageAInput,
    fileInputIsValid: imageAIsValid,
    fileInputChangeHandler: imageAChangeHandler,
  } = useFileInput();
  const {
    fileInput: imageBInput,
    fileInputIsValid: imageBIsValid,
    fileInputChangeHandler: imageBChangeHandler,
  } = useFileInput();
  const {
    fileInput: imageCInput,
    fileInputIsValid: imageCIsValid,
    fileInputChangeHandler: imageCChangeHandler,
  } = useFileInput();

  const {
    userInput: date1Input,
    userInputIsValid: date1IsValid,
    userInputChangeHandler: date1ChangeHandler,
  } = useInput(
    (value) => value !== "",
    props.tour.startDates ? convertformat(props.tour.startDates[0]) : ""
  );
  const {
    userInput: date2Input,
    userInputIsValid: date2IsValid,
    userInputChangeHandler: date2ChangeHandler,
  } = useInput(
    (value) => value !== "",
    props.tour.startDates ? convertformat(props.tour.startDates[1]) : ""
  );
  const {
    userInput: date3Input,
    userInputIsValid: date3IsValid,
    userInputChangeHandler: date3ChangeHandler,
  } = useInput(
    (value) => value !== "",
    props.tour.startDates ? convertformat(props.tour.startDates[2]) : ""
  );
  const {
    userInput: date4Input,
    userInputIsValid: date4IsValid,
    userInputChangeHandler: date4ChangeHandler,
  } = useInput(
    (value) => value !== "",
    props.tour.startDates ? convertformat(props.tour.startDates[3]) : ""
  );

  let formIsValid = false;
  if (
    coverImageIsValid &&
    imageAIsValid &&
    imageBIsValid &&
    imageCIsValid &&
    date1IsValid &&
    date2IsValid &&
    date3IsValid &&
    date4IsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    
    props.onSubmittingTourForm({
      imageCover: coverImageInput,
      images: [imageAInput, imageBInput, imageCInput],
      startDates: [date1Input, date2Input, date3Input, date4Input],
    });
  };

  return (
    <form className={style["visual-info-form"]} onSubmit={formSubmitHandler}>
      <div>
        <h2 className={style["title"]}>VISUAL INFORMATION</h2>
        <div className={style["inputs-container"]}>
          <Input
            type="file"
            id="cover-image"
            label="Cover Image"
            onChange={coverImageChangeHandler}
          />
          <Input
            type="file"
            id="image-A"
            label="Image A"
            onChange={imageAChangeHandler}
          />
          <Input
            type="file"
            id="image-B"
            label="Image B"
            onChange={imageBChangeHandler}
          />
          <Input
            type="file"
            id="image-C"
            label="Image C"
            onChange={imageCChangeHandler}
          />
        </div>
      </div>
      <hr />
      <div>
        <h2 className={style["title"]}>START DATES</h2>
        <div className={style["inputs-container"]}>
          <Input
            type="date"
            id="date-1"
            label="Date 1"
            onChange={date1ChangeHandler}
            value={date1Input}
          />
          <Input
            type="date"
            id="date-2"
            label="Date 2"
            onChange={date2ChangeHandler}
            value={date2Input}
          />
          <Input
            type="date"
            id="date-3"
            label="Date 3"
            onChange={date3ChangeHandler}
            value={date3Input}
          />
          <Input
            type="date"
            id="date-4"
            label="Date 4"
            onChange={date4ChangeHandler}
            value={date4Input}
          />
        </div>
      </div>
      <StandardBtn disabled={!formIsValid} className={style["submit-btn"]}>
        Submit
      </StandardBtn>
    </form>
  );
}
