import React from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiOutlineCalendar, AiOutlineFlag } from "react-icons/ai";
import style from "./SingleTour.module.scss";
import SingleTourControllers from "./SingleTourControllers";

export default function SingleTour(props) {
  const bookedByCurrentUser = props.bookedByCurrentUser;
  const fullyBookedTour = props.fullyBookedTour;

  return (
    <div className={style["card"]}>
      {fullyBookedTour && !bookedByCurrentUser && (
        <div
          className={`${style["tour-label"]} ${style["tour-label__fully-booked"]}`}
        >
          Fully Booked
        </div>
      )}
      {bookedByCurrentUser && (
        <div
          className={`${style["tour-label"]} ${style["tour-label__you-booked"]}`}
        >
          You Booked
        </div>
      )}
      <div className={style["card-container"]}>
        <div className={style["card-header"]}>
          <div className={style["card-picture"]}>
            <div className={style["card-picture-overlay"]} />
            <img
              src={`${process.env.REACT_APP_DOMAIN_NAME}/img/tours/${props.imageCover}`}
              alt={props.name}
            />
          </div>
          <div className={style["card-heading"]}>
            <h2>{props.name}</h2>
          </div>
        </div>
        <div className={style["card-details"]}>
          <h4 className={style["sub-heading"]}>
            {props.difficulty} {props.duration}-Day Tour
          </h4>
          <p className={style["card-text"]}>{props.summary}</p>
          <div className={style["card-data"]}>
            <div className={style["card-data-item"]}>
              <BiCurrentLocation />
              <span>{props.startLocation.description}</span>
            </div>
            <div className={style["card-data-item"]}>
              <AiOutlineCalendar />
              <span>
                {new Date(props.startDates[0]).toLocaleString("ind", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className={style["card-data-item"]}>
              <AiOutlineFlag />
              <span>{props.locations.length} Stops</span>
            </div>
            <div className={style["card-data-item"]}>
              <BsFillPeopleFill />
              <span>{props.maxGroupSize} People</span>
            </div>
          </div>
        </div>
        <div className={style["card-footer"]}>
          <div className={style["price-rating-container"]}>
            <div className={style["card-price"]}>
              <h4>${props.price}</h4>
              <span>per person</span>
            </div>
            <div className={style["card-rating"]}>
              <h4>{props.ratingsAverage}</h4>
              <span>rating({props.ratingsQuantity})</span>
            </div>
          </div>
          <SingleTourControllers
            managing={props.managing}
            slug={props.slug}
            id={props.id}
            onEdit={props.onEdit}
            onTourDelete={props.onTourDelete}
          />
        </div>
      </div>
    </div>
  );
}
