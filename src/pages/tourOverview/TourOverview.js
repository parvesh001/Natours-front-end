import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TourOverviewBody from "../../components/tour/tourOverview/tourOverviewBody/TourOverviewBody";
import TourOverviewHero from "../../components/tour/tourOverview/tourOverviewHero/TourOverviewHero";
import TourOverviewMap from "../../components/tour/tourOverview/tourOverviewMap/TourOverviewMap";
import TourOverviewProductCard from "../../components/tour/tourOverview/tourOverviewProductCard/TourOverviewProductCard";
import TourOverviewReview from "../../components/tour/tourOverview/tourOverviewReview/TourOverviewReview";
import TourOverviewTemplate from "../../components/tour/tourOverview/tourOverviewTemplate/TourOverviewTemplate";
import Model from '../../UIs/Model/Model'
import Loader from '../../UIs/loader/Loader'
import HasError from "../../components/error/HasError";
import style from "./TourOverview.module.scss";

export default function TourOverview() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false)

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
        setError(err.message)
      }
      setIsLoading(false);
    }
    fetchTour();
  }, [slug]);

  if (isLoading) return <Model><Loader/></Model>;

  if(error)return <HasError message={error}/>

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

  console.log(tour)

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
      <TourOverviewMap/>
      <section className={style["reviews"]}>{tourOverviewReviews}</section>
      <TourOverviewProductCard images={tour.images} duration={tour.duration} tourId={tour._id} startDates={tour.startDates} bookingsPerStartDate={tour.bookingsPerStartDate}/>
    </>
  );
}
