import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth-ctx";
import Model from "../../../UIs/Model/Model";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import useInput from "../../../hooks/use-input";
import Input from "../../../UIs/Input/Input";
import style from "./AddReviewForm.module.scss";

export default function AddReview(props) {
  const authCtx = useContext(AuthContext);
  const {
    userInput: reviewInput,
    userInputIsValid: reviewInputIsValid,
    hasError: reviewInputHasError,
    userInputChangeHandler: reviewChangeHandler,
    userInputBlurHandler: reviewBlurHandler,
  } = useInput((value) => value.trim().length > 8, props.editing?props.review.review:'');
  const {
    userInput: ratingInput,
    userInputIsValid: ratingInputIsValid,
    hasError: ratingInputHasError,
    userInputChangeHandler: ratingChangeHandler,
    userInputBlurHandler: ratingBlurHandler,
  } = useInput((value) => value > 0 && value <= 5, props.editing?props.review.rating:'');

  let formIsValid = false;
  if (reviewInputIsValid && ratingInputIsValid) {
    formIsValid = true;
  }

  const reviewFormSubmitHandler = async (event) => {
    event.preventDefault();
    props.setIsLoading(true);
    let endpoint = props.editing ? `/${props.review._id}` : "";
    let method = props.editing ? "PATCH" : "POST";
    let body = props.editing
      ? JSON.stringify({
        review: reviewInput,
        rating: ratingInput
      })
      : JSON.stringify({
        review: reviewInput,
        rating: ratingInput,
        tour: props.tourId,
        user: authCtx.user._id,
      })

    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/reviews${endpoint}`,
        {
          method: method,
          body: body,
          headers: {
            Authorization: "Bearer " + authCtx.token,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      props.onReviewFormSubmit(data.data.data);
      props.setReviewState(false);
      props.setNotification({
        status: "success",
        message: "Thank You For Kind Review",
      });
      setTimeout(() => props.setNotification(null), 2000);
    } catch (err) {
      props.setNotification({ status: "fail", message: err.message });
      setTimeout(() => props.setNotification(null), 2000);
    }
    props.setIsLoading(false);
  };

  const reviewInputClasses = reviewInputHasError ? "invalid" : "";
  const ratingInputClasses = ratingInputHasError ? "invalid" : "";
  return (
    <Model>
      <div className={style["review-box"]}>
        <h2>{props.editing?'Edit your review':'Please add a new review'}</h2>
        <form
          className={style["review-form"]}
          onSubmit={reviewFormSubmitHandler}
        >
          <Input
            className={reviewInputClasses}
            type="text"
            id="review"
            name="review"
            label="Review"
            onChange={reviewChangeHandler}
            onBlur={reviewBlurHandler}
            value={reviewInput}
          />
          <Input
            className={ratingInputClasses}
            type="number"
            id="rating"
            name="rating"
            label="Rating"
            onChange={ratingChangeHandler}
            onBlur={ratingBlurHandler}
            value={ratingInput}
          />
          <div className={style["review-form-controllers"]}>
            <StandardBtn
              disabled={!formIsValid}
              type="submit"
              className={style["submit-btn"]}
            >
              {props.editing?'Edit':'Add'}
            </StandardBtn>
            <StandardBtn
              onClick={() => props.setReviewState(false)}
              type="button"
              danger={true}
            >
              Skip
            </StandardBtn>
          </div>
        </form>
      </div>
    </Model>
  );
}
