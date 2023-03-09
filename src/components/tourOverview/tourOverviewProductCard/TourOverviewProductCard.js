import React from "react";
import style from "./TourOverviewProductCard.module.scss";

export default function TourOverviewProductCard(props) {
  return (
    <div className={style["tour-overview-product-card"]}>
      <div className={style["product-card"]}>
        <div className={style["card-images"]}>
          <img
            className={style['img1']}
            src={`http://localhost:8080/img/logo-green-round.png`}
            alt="tour"
          />
          <img
          className={style['img2']}
            src={`http://localhost:8080/img/tours/${props.images[1]}`}
            alt="tour"
          />
          <img
          className={style['img3']}
            src={`http://localhost:8080/img/tours/${props.images[2]}`}
            alt="tour"
          />
        </div>
        <div className={style["card-text"]}>
            <h4>WHAT ARE YOU WAITING FOR?</h4>
            <p>{props.duration} days. Fill your life with full of memories and adventures!</p>
        </div>
        <div className={style["card-controller"]}>
            <button className={style['card-btn']}>Login To Book Your Tour</button>
        </div>
      </div>
    </div>
  );
}
