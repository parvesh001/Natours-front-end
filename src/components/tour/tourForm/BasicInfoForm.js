import React, { useState } from "react";
import Input from "../../../UIs/Input/Input";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import Textarea from "../../../UIs/textArea/Textarea";
import useInput from "../../../hooks/use-input";
import style from "./BasicInfoForm.module.scss";

export default function BasicInfoForm(props) {
  const [selectedGuides, setSelectedGuides] = useState([]);
  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedGuides([...selectedValues]);
  };

  const {
    userInput: nameInput,
    userInputIsValid: nameInputIsValid,
    hasError: nameInputHasError,
    userInputChangeHandler: nameChangeHandler,
    userInputBlurHandler: nameBlurHandler,
  } = useInput((value) =>
    /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/.test(value)
  );

  const {
    userInput: durationInput,
    userInputIsValid: durationInputIsValid,
    hasError: durationInputHasError,
    userInputChangeHandler: durationChangeHandler,
    userInputBlurHandler: durationBlurHandler,
  } = useInput((value) => value >= 1);

  const {
    userInput: groupSizeInput,
    userInputIsValid: groupSizeInputIsValid,
    hasError: groupSizeInputHasError,
    userInputChangeHandler: groupSizeChangeHandler,
    userInputBlurHandler: groupSizeBlurHandler,
  } = useInput((value) => value >= 2);
  const {
    userInput: ratingsAverageInput,
    userInputIsValid: ratingsAverageInputIsValid,
    hasError: ratingsAverageInputHasError,
    userInputChangeHandler: ratingsAverageChangeHandler,
    userInputBlurHandler: ratingsAverageBlurHandler,
  } = useInput((value) => (value.trim() === '') || ( value > 0 && value <= 5));
  const {
    userInput: ratingsQuantityInput,
    userInputIsValid: ratingsQuantityInputIsValid,
    hasError: ratingsQuantityInputHasError,
    userInputChangeHandler: ratingsQuantityChangeHandler,
    userInputBlurHandler: ratingsQuantityBlurHandler,
  } = useInput((value) => value >= 0);

  const {
    userInput: priceInput,
    userInputIsValid: priceInputIsValid,
    hasError: priceInputHasError,
    userInputChangeHandler: priceChangeHandler,
    userInputBlurHandler: priceBlurHandler,
  } = useInput((value) => value >= 0);

  const {
    userInput: discountInput,
    userInputIsValid: discountInputIsValid,
    hasError: discountInputHasError,
    userInputChangeHandler: discountChangeHandler,
    userInputBlurHandler: discountBlurHandler,
  } = useInput((value) =>
    priceInput > 0 ? value < priceInput : value === priceInput
  );

  const {
    userInput: difficultyInput,
    userInputIsValid: difficultyInputIsValid,
    hasError: difficultyInputHasError,
    userInputChangeHandler: difficultyChangeHandler,
    userInputBlurHandler: difficultyBlurHandler,
  } = useInput(
    (value) => value === "easy" || value === "medium" || value === "difficult"
  );

  const {
    userInput: descriptionInput,
    userInputIsValid: descriptionInputIsValid,
    hasError: descriptionInputHasError,
    userInputChangeHandler: descriptionChangeHandler,
    userInputBlurHandler: descriptionBlurHandler,
  } = useInput((value) => value.trim().length >= 100);
  const {
    userInput: summaryInput,
    userInputIsValid: summaryInputIsValid,
    hasError: summaryInputHasError,
    userInputChangeHandler: summaryChangeHandler,
    userInputBlurHandler: summaryBlurHandler,
  } = useInput((value) => value.trim().length >= 50);
  const {
    userInput: secretInput,
    userInputIsValid: secretInputIsValid,
    hasError: secretInputHasError,
    userInputChangeHandler: secretChangeHandler,
    userInputBlurHandler: secretBlurHandler,
  } = useInput(
    (value) =>
      value.trim() === "true" || value.trim() === "false" || value.trim() === ""
  );

  let formIsValid = false;
  if (
    nameInputIsValid &&
    durationInputIsValid &&
    priceInputIsValid &&
    groupSizeInputIsValid &&
    difficultyInputIsValid &&
    descriptionInputIsValid &&
    summaryInputIsValid &&
    discountInputIsValid &&
    ratingsAverageInputIsValid &&
    ratingsQuantityInputIsValid &&
    secretInputIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    const basicFormInputs = {
      name: nameInput,
      duration: durationInput,
      maxGroupSize: groupSizeInput,
      ratingsAverage:
        ratingsAverageInput.trim() === ""
          ? 4.5
          : ratingsAverageInput,
      ratingsQuantity:
        ratingsQuantityInput.trim() === "" ? 0 : ratingsQuantityInput,
      price: priceInput.trim() === "" ? 0 : priceInput,
      discount: discountInput.trim() === "" ? 0 : discountInput,
      difficulty:difficultyInput,
      secret:secretInput.trim() === '' ? false: secretInput,
      description:descriptionInput,
      summary:summaryInput,
      guides:[...selectedGuides]
    };
    props.onCompletingBasicForm(basicFormInputs);
  };

  const nameInputClass = nameInputHasError ? "invalid" : "";
  const difficultyInputClass = difficultyInputHasError ? "invalid" : "";
  const priceInputClass = priceInputHasError ? "invalid" : "";
  const descriptionInputClass = descriptionInputHasError ? "invalid" : "";
  const summaryInputClass = summaryInputHasError ? "invalid" : "";
  const discountInputClass = discountInputHasError ? "invalid" : "";
  const durationInputClass = durationInputHasError ? "invalid" : "";
  const groupSizeInputClass = groupSizeInputHasError ? "invalid" : "";
  const ratingsAverageInputClass = ratingsAverageInputHasError ? "invalid" : "";
  const ratingsQuantityInputClass = ratingsQuantityInputHasError
    ? "invalid"
    : "";
  const secretInputClass = secretInputHasError ? "invalid" : "";

  return (
    <form onSubmit={formSubmitHandler}>
      <h2 className={style["sub-title"]}>BASIC INFORMATION</h2>
      <div className={style["inputs-container"]}>
        <Input
          className={nameInputClass}
          type="text"
          id="tour-name"
          name="tour-name"
          label="Name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameInput}
        />
        <Input
          className={durationInputClass}
          type="number"
          id="tour-duration"
          name="tour-duration"
          label="Duration"
          onChange={durationChangeHandler}
          onBlur={durationBlurHandler}
          value={durationInput}
        />
        <Input
          className={groupSizeInputClass}
          type="number"
          id="tour-maxGroupSize"
          name="tour-maxGroupSize"
          label="Max Group Size"
          onChange={groupSizeChangeHandler}
          onBlur={groupSizeBlurHandler}
          value={groupSizeInput}
        />
        <Input
          className={ratingsAverageInputClass}
          type="number"
          id="tour-ratingsAvg"
          name="tour-ratingsAvg"
          label="Ratings Average"
          onChange={ratingsAverageChangeHandler}
          onBlur={ratingsAverageBlurHandler}
          value={ratingsAverageInput}
        />
        <Input
          className={ratingsQuantityInputClass}
          type="number"
          id="tour-ratingsQty"
          name="tour-ratingsQty"
          label="Ratings Qantity"
          onChange={ratingsQuantityChangeHandler}
          onBlur={ratingsQuantityBlurHandler}
          value={ratingsQuantityInput}
        />
        <Input
          className={priceInputClass}
          type="number"
          id="tour-price"
          name="tour-price"
          label="Price"
          onChange={priceChangeHandler}
          onBlur={priceBlurHandler}
          value={priceInput}
        />
        <Input
          className={discountInputClass}
          type="number"
          id="tour-discount"
          name="tour-discount"
          label="Discount"
          onChange={discountChangeHandler}
          onBlur={discountBlurHandler}
          value={discountInput}
        />
        <Input
          className={difficultyInputClass}
          type="text"
          id="tour-difficulty"
          name="tour-difficulty"
          label="Difficulty"
          onChange={difficultyChangeHandler}
          onBlur={difficultyBlurHandler}
          value={difficultyInput}
        />
        <Input
          className={secretInputClass}
          type="text"
          id="tour-secrecy"
          name="tour-secrecy"
          label="Secret"
          onChange={secretChangeHandler}
          onBlur={secretBlurHandler}
          value={secretInput}
        />
        <Textarea
          className={descriptionInputClass}
          id="tour-description"
          name="tour-description"
          label="Description"
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
          value={descriptionInput}
        />
        <Textarea
          className={summaryInputClass}
          id="tour-summary"
          name="tour-summary"
          label="Summary"
          onChange={summaryChangeHandler}
          onBlur={summaryBlurHandler}
          value={summaryInput}
        />
        <div className={style["form-control"]}>
          <label htmlFor="select-guide">Select Guides</label>
          <select multiple onChange={handleSelectChange} value={selectedGuides}>
            {props.tourGuides.map((guide) => {
              return <option value={guide._id} key={guide._id}>{guide.name}</option>;
            })}
          </select>
        </div>
      </div>
      <StandardBtn disabled={!formIsValid} type="submit" className={style["submit-btn"]}>
        Next
      </StandardBtn>
    </form>
  );
}

