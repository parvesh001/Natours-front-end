import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TourOverviewBody from "../../components/tourOverview/tourOverviewBody/TourOverviewBody";
import TourOverviewHero from "../../components/tourOverview/tourOverviewHero/TourOverviewHero";
import TourOverviewProductCard from "../../components/tourOverview/tourOverviewProductCard/TourOverviewProductCard";
import TourOverviewReview from "../../components/tourOverview/tourOverviewReview/TourOverviewReview";
import TourOverviewTemplate from "../../components/tourOverview/tourOverviewTemplate/TourOverviewTemplate";
import style from "./TourOverview.module.scss";

export default function TourOverview() {
  const { slug } = useParams();
  const [tour, setTour] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(err.message);
      }
      setIsLoading(false);
    }
    fetchTour();
  }, [slug]);

  if (isLoading) return <p>Loading....</p>;

  let tourOverviewReviews;
  if (!isLoading) {
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

  return (
    <>
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
      <section className={style["reviews"]}>{tourOverviewReviews}</section>
      <TourOverviewProductCard images={tour.images} duration={tour.duration}/>
    </>
  );
}
