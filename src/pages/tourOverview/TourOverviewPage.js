import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-ctx";
import AddReviewForm from "../../components/user/addReviewForm/AddReviewForm";
import Model from "../../UIs/Model/Model";
import Loader from "../../UIs/loader/Loader";
import HasError from "../../components/error/HasError";
import Notification from "../../UIs/notification/Notification";
import TourOverview from "../../components/tour/tourOverview/TourOverview";
// import style from "./TourOverviewPage.module.scss";

export default function TourOverviewPage() {
  const authCtx = useContext(AuthContext);
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [reviewState, setReviewState] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function fetchTour() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/tours/${slug}`
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

  const reviewFormSubmitHandler = (newReview) => {
    setTour((prevTour) => {
      const newRatingsAverage =
        (prevTour.ratingsAverage * prevTour.ratingsQuantity +
          newReview.rating) /
        (prevTour.ratingsQuantity + 1);
      const newRatingsQuantity = prevTour.ratingsQuantity + 1;
      const newReviews = [...prevTour.reviews, newReview];
      const updatedTour = {
        ...prevTour,
        ratingsAverage: Math.round(newRatingsAverage * 10) / 10,
        ratingsQuantity: newRatingsQuantity,
        reviews: newReviews,
      };
      return updatedTour;
    });
  };
  if (isLoading)
    return (
      <Model>
        <Loader />
      </Model>
    );

  if (error) return <HasError message={error} />;

  let bookedByCurrentUser = false;
  if (!isLoading && tour !== null) {
    for (let i = 0; i < tour.bookingsPerStartDate.length; i++) {
      const BPSD = tour.bookingsPerStartDate[i];
      if (BPSD.participants.includes(authCtx.user._id)) {
        bookedByCurrentUser = true;
        break;
      }
    }
  }

  let userCanAddReview = false;
  if (!isLoading && tour !== null) {
    for (let i = 0; i < tour.bookingsPerStartDate.length; i++) {
      const BPSD = tour.bookingsPerStartDate[i];
      if (
        BPSD.participants.includes(authCtx.user._id) &&
        new Date(BPSD.startDate) < new Date()
      ) {
        userCanAddReview = true;
        break;
      }
    }
  }

  let currentUserAlreadyAddedReview = false;
  if (!isLoading && tour !== null) {
    for (let i = 0; i < tour.reviews.length; i++) {
      const review = tour.reviews[i];
      if (review.user._id === authCtx.user._id) {
        currentUserAlreadyAddedReview = true;
        break;
      }
    }
  }

  return (
    <>
      {notification && <Notification notification={notification} />}
      {userCanAddReview && !currentUserAlreadyAddedReview && reviewState && (
        <AddReviewForm
          tourId={tour._id}
          onReviewFormSubmit={reviewFormSubmitHandler}
          setIsLoading={(value) => setIsLoading(value)}
          setReviewState={(value) => setReviewState(value)}
          setNotification={(value) => setNotification(value)}
        />
      )}
      <TourOverview tour={tour} bookedByCurrentUser={bookedByCurrentUser} />
    </>
  );
}
