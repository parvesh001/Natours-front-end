import { useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth-ctx";
import SingleTour from "./SingleTour";
import Loader from "../../../UIs/loader/Loader";
import Model from "../../../UIs/Model/Model";
import style from "./Tours.module.scss";
import HasError from "../../error/HasError";


export default function Tours(props) {
  const tourData = useSelector(state => state.tour)
  const authCtx = useContext(AuthContext)

  if (tourData.isLoading)
    return (
      <Model>
        <Loader />
      </Model>
    );

    if(tourData.error){
      return <HasError message={tourData.error}/>
    }

  return (
    <div className={`${style["tours-container"]} ${style[props.className]}`}>
      {tourData.tours.map((tour) => {
        return (
          <SingleTour
            key={tour._id}
            id={tour._id}
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
            participants = {tour.tourBookingsDetails.participants}
            bookedByCurrentUser = {tour.tourBookingsDetails.participants.includes(authCtx.user._id)}
            fullyBookedTour = {tour.tourBookingsDetails.availableCapacity <= 0}
            onEdit={props.onEdit}
            onTourDelete={props.onTourDelete}
          />
        );
      })}
    </div>
  );
}
