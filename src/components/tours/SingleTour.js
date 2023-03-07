import React from "react";
import style from "./SingleTour.module.scss";
import { BiCurrentLocation } from "react-icons/bi";
import { AiOutlineCalendar, AiOutlineFlag } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";

export default function SingleTour(props) {
  return (
    <div className={style["card"]}>
      <div className={style["card-header"]}>
        <div className={style["card-picture"]}>
          <div className={style["card-picture-overlay"]} />
          <img src={`http://localhost:8080/img/tours/${props.imageCover}`} alt={props.name} />
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
            <span>{props.startDates[0]}</span>
          </div>
          <div className={style["card-data-item"]}>
            <AiOutlineFlag />
            <span>{props.locations.length} stops</span>
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
        <div className={style["controller"]}>
          <button>Details</button>
        </div>
      </div>
    </div>
  );
}