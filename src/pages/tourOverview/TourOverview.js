import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-ctx";
import TourOverviewBody from "../../components/tour/tourOverview/tourOverviewBody/TourOverviewBody";
import TourOverviewHero from "../../components/tour/tourOverview/tourOverviewHero/TourOverviewHero";
import TourOverviewMap from "../../components/tour/tourOverview/tourOverviewMap/TourOverviewMap";
import TourOverviewProductCard from "../../components/tour/tourOverview/tourOverviewProductCard/TourOverviewProductCard";
import TourOverviewReview from "../../components/tour/tourOverview/tourOverviewReview/TourOverviewReview";
import TourOverviewTemplate from "../../components/tour/tourOverview/tourOverviewTemplate/TourOverviewTemplate";
import Model from "../../UIs/Model/Model";
import Loader from "../../UIs/loader/Loader";
import HasError from "../../components/error/HasError";
import Notification from "../../UIs/notification/Notification";
import style from "./TourOverview.module.scss";
import AddReview from "../../components/user/addReviewForm/AddReview";

export default function TourOverview() {
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

  let userCanAddReview = false;
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

  let currentUserAlreadyAddedReview = false;
  for (let i = 0; i < tour.reviews.length; i++) {
    const review = tour.reviews[i];
    if (review.user._id === authCtx.user._id) {
      currentUserAlreadyAddedReview = true;
      break;
    }
  }

  return (
    <>
      {notification && <Notification notification={notification} />}
      {userCanAddReview && !currentUserAlreadyAddedReview && reviewState && (
        <AddReview
          tourId={tour._id}
          onReviewFormSubmit={reviewFormSubmitHandler}
          setIsLoading={(value) => setIsLoading(value)}
          setReviewState={(value) => setReviewState(value)}
          setNotification={(value) => setNotification(value)}
        />
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
