import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-ctx";
import TourOverviewBody from "../../components/tour/tourOverview/tourOverviewBody/TourOverviewBody";
import TourOverviewHero from "../../components/tour/tourOverview/tourOverviewHero/TourOverviewHero";
import TourOverviewMap from "../../components/tour/tourOverview/tourOverviewMap/TourOverviewMap";
import TourOverviewProductCard from "../../components/tour/tourOverview/tourOverviewProductCard/TourOverviewProductCard";
import TourOverviewReview from "../../components/tour/tourOverview/tourOverviewReview/TourOverviewReview";
import TourOverviewTemplate from "../../components/tour/tourOverview/tourOverviewTemplate/TourOverviewTemplate";
import Input from "../../UIs/Input/Input";
import useInput from "../../hooks/use-input";
import Model from "../../UIs/Model/Model";
import Loader from "../../UIs/loader/Loader";
import HasError from "../../components/error/HasError";
import StandardBtn from "../../UIs/StandardBtn/StandardBtn";
import Notification from "../../UIs/notification/Notification";
import style from "./TourOverview.module.scss";

export default function TourOverview() {
  const authCtx = useContext(AuthContext);
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [reviewState, setReviewState] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notification, setNotification] = useState(null);

  const {
    userInput: reviewInput,
    userInputIsValid: reviewInputIsValid,
    hasError: reviewInputHasError,
    userInputChangeHandler: reviewChangeHandler,
    userInputBlurHandler: reviewBlurHandler,
  } = useInput((value) => value.trim().length > 8);
  const {
    userInput: ratingInput,
    userInputIsValid: ratingInputIsValid,
    hasError: ratingInputHasError,
    userInputChangeHandler: ratingChangeHandler,
    userInputBlurHandler: ratingBlurHandler,
  } = useInput((value) => value > 0 && value <= 5);

  useEffect(() => {
    async function fetchTour() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/tours/${slug}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const { data } = await response.json();
        setTour(data.data);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }
    fetchTour();
  }, [slug]);

  let formIsValid = false;
  if (reviewInputIsValid && ratingInputIsValid) {
    formIsValid = true;
  }

  const reviewFormSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/reviews`,
        {
          method: "POST",
          body: JSON.stringify({
            review: reviewInput,
            rating: ratingInput,
            tour: tour._id,
            user: authCtx.user._id,
          }),
          headers: {
            Authorization: "Bearer " + authCtx.token,
            "Content-Type": "application/json",
          },
        }
      );
      if(!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
      const data = await response.json();
      console.log(data)
      setReviewState(false)
      setNotification({status:'success', message:'Thank You For Kind Review'})
      setTimeout(()=>setNotification(null),2000)
    } catch (err) {
      setNotification({status:'fail', message:err.message})
      setTimeout(()=>setNotification(null),2000)
    }
    setIsLoading(false)
  };

  if (isLoading)
    return (
      <Model>
        <Loader />
      </Model>
    );

  if (error) return <HasError message={error} />;

  let tourOverviewReviews;
  if (!isLoading && !error) {
    tourOverviewReviews = tour.reviews.map((review) => {
      return (
        <TourOverviewReview
          key={review._id}
          review={review.review}
          user={review.user}
          rating={review.rating}
        />
      );
    });
  }

  let bookedByCurrentUser = false;
  for (let i = 0; i < tour.bookingsPerStartDate.length; i++) {
    const BPSD = tour.bookingsPerStartDate[i];
    if (BPSD.participants.includes(authCtx.user._id)) {
      bookedByCurrentUser = true;
      break;
    }
  }

  let currentUserAlreadyAddedReview = false;
  for (let i = 0; i < tour.reviews.length; i++) {
    const review = tour.reviews[i];
    if (review.user._id === authCtx.user._id) {
      currentUserAlreadyAddedReview = true;
      break;
    }
  }

  const reviewInputClasses = reviewInputHasError ? "invalid" : "";
  const ratingInputClasses = ratingInputHasError ? "invalid" : "";

  return (
    <>
      {notification && <Notification notification={notification} />}
      {bookedByCurrentUser && !currentUserAlreadyAddedReview && reviewState && (
        <Model>
          <div className={style["review-box"]}>
            <h2>Please add a review</h2>
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
                  Add
                </StandardBtn>
                <StandardBtn
                  onClick={() => setReviewState(false)}
                  type="button"
                  danger={true}
                >
                  Skip
                </StandardBtn>
              </div>
            </form>
          </div>
        </Model>
      )}
      <TourOverviewHero
        imageCover={tour.imageCover}
        name={tour.name}
        duration={tour.duration}
        startLocation={tour.startLocation}
      />
      <TourOverviewBody
        guides={tour.guides}
        difficulty={tour.difficulty}
        maxGroupSize={tour.maxGroupSize}
        ratingsAverage={tour.ratingsAverage}
        ratingsQuantity={tour.ratingsQuantity}
        date={new Date(tour.startDates[0]).toLocaleString("ind", {
          month: "short",
          year: "numeric",
        })}
        name={tour.name}
        description={tour.description}
      />
      <TourOverviewTemplate images={tour.images} name={tour.name} />
      <TourOverviewMap />
      <section className={style["reviews"]}>{tourOverviewReviews}</section>
      {!bookedByCurrentUser && (
        <TourOverviewProductCard
          images={tour.images}
          duration={tour.duration}
          tourId={tour._id}
          bookingsPerStartDate={tour.bookingsPerStartDate}
        />
      )}
    </>
  );
}
