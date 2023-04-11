import React from "react";
import style from "./Booking.module.scss";

export default function Booking(props) {
  return (
    <div className={style["booking-card"]}>
      <img
        className={style["booking-card__product-photo"]}
        src={`${process.env.REACT_APP_DOMAIN_NAME}/img/tours/${props.productPhoto}`}
        alt={props.productName}
      />
      <div className={style["booking-card__details"]}>
        <h3 className={style["booking-card__product-name"]}>
          {props.productName}
        </h3>
        <p className={style["booking-card__price"]}>${props.productPrice}</p>
        <p className={style["booking-card__booking-date"]}>
          Start Date: {props.startDate}
        </p>
        <p className={style["booking-card__customer-name"]}>
          Customer Name: {props.customerName}
        </p>
        <p className={style["booking-card__customer-email"]}>
          Customer Email: {props.customerEmail}
        </p>
      </div>
    </div>
  );
}
