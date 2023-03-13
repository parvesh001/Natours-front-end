import React, { useEffect, useState } from "react";
import SingleTour from "./SingleTour";
import Loader from "../../UIs/loader/Loader";
import Model from "../../UIs/Model/Model";
import style from "./Tours.module.scss";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTours() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/tours");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const { data } = await response.json();
        setTours(data.data);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    }
    fetchTours();
  }, []);

  if (isLoading)
    return (
      <Model>
        <Loader />
      </Model>
    );

  return (
    <div className={style["tours-container"]}>
      {tours.map((tour) => {
        return (
          <SingleTour
            key={tour._id}
            name={tour.name}
            imageCover={tour.imageCover}
            difficulty={tour.difficulty}
            duration={tour.duration}
            summary={tour.summary}
            startLocation={tour.startLocation}
            startDates={tour.startDates}
            locations={tour.locations}
            maxGroupSize={tour.maxGroupSize}
            price={tour.price}
            ratingsAverage={tour.ratingsAverage}
            ratingsQuantity={tour.ratingsQuantity}
            slug={tour.slug}
          />
        );
      })}
    </div>
  );
}
