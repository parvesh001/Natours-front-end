import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../context/auth-ctx";
import SingleTour from "../../../../tour/tours/SingleTour";
import Model from "../../../../../UIs/Model/Model";
import Loader from "../../../../../UIs/loader/Loader";
import Notification from "../../../../../UIs/notification/Notification";
import NoDataFound from '../../../../../UIs/noDataFound/NoDataFound'
import style from "./Bookings.module.scss";

export default function MyBookings() {
  const { token } = useContext(AuthContext);
  const [bookedTours, setBookedTours] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBookedTours = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/bookings/my-bookings`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setBookedTours(data.data.bookings);
      } catch (err) {
        setNotification({ status: "fail", message: err.message });
        setTimeout(() => setNotification(null), 3000);
      }
      setIsLoading(false);
    };
    fetchBookedTours();
  }, [token]);

  if (isLoading) {
    return (
      <Model>
        <Loader />
      </Model>
    );
  }

  return (
    <>
      {notification && <Notification notification={notification} />}
      {!bookedTours.length && <NoDataFound/>}
      <div className={style["my-bookings-page"]}>
        {bookedTours.length !== 0 && bookedTours.map((bookedTour) => {
          return (
            <SingleTour
              key={bookedTour._id}
              id={bookedTour.tour._id}
              name={bookedTour.tour.name}
              imageCover={bookedTour.tour.imageCover}
              difficulty={bookedTour.tour.difficulty}
              duration={bookedTour.tour.duration}
              summary={bookedTour.tour.summary}
              startLocation={bookedTour.tour.startLocation}
              startDates={bookedTour.tour.startDates}
              locations={bookedTour.tour.locations}
              maxGroupSize={bookedTour.tour.maxGroupSize}
              price={bookedTour.tour.price}
              ratingsAverage={bookedTour.tour.ratingsAverage}
              ratingsQuantity={bookedTour.tour.ratingsQuantity}
              slug={bookedTour.tour.slug}
              bookedByCurrentUser={true}
            />
          );
        })}
      </div>
    </>
  );
}
