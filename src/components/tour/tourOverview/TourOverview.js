import React from "react";
import TourOverviewHero from "./tourOverviewHero/TourOverviewHero";
import TourOverviewBody from "./tourOverviewBody/TourOverviewBody";
import TourOverviewMap from "./tourOverviewMap/TourOverviewMap";
import TourOverviewProductCard from "./tourOverviewProductCard/TourOverviewProductCard";
import TourOverviewReview from "./tourOverviewReview/TourOverviewReview";
import TourOverviewTemplate from "./tourOverviewTemplate/TourOverviewTemplate";
import style from "./TourOverview.module.scss";

export default function TourOverview({ tour, bookedByCurrentUser }) {
  let tourOverviewReviews = tour.reviews.map((review) => {
    return (
      <TourOverviewReview
        key={review._id}
        review={review.review}
        user={review.user}
        rating={review.rating}
      />
    );
  });

  return (
    <div className={style["tour-overview"]}>
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
      {/* <TourOverviewMap /> */}
      {tour.reviews.length !== 0 && (
        <section className={style["reviews"]}>{tourOverviewReviews}</section>
      )}
      {!bookedByCurrentUser && (
        <TourOverviewProductCard
          images={tour.images}
          duration={tour.duration}
          tourId={tour._id}
          bookingsPerStartDate={tour.bookingsPerStartDate}
        />
      )}
    </div>
  );
}
