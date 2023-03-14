import React from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import style from "./TourOverviewHero.module.scss";

export default function TourOverviewHero(props) {
  return (
    <section className={style["tour-overview-hero"]}>
      <div className={style["hero-img"]}>
        <div className={style["hero-img-overlay"]} />
        <img
          src={`${process.env.REACT_APP_DOMAIN_NAME}/img/tours/${props.imageCover}`}
          alt={props.name}
        />
      </div>
      <div className={style["hero-content"]}>
        <h1 className={style["hero-content-title"]}>{props.name} Tour</h1>
        <div className={style["hero-content-body"]}>
          <div className={style["hero-content-text"]}>
            <AiOutlineFieldTime />
            <span>{props.duration} Days</span>
          </div>
          <div className={style["hero-content-text"]}>
            <BiCurrentLocation />
            <span>{props.startLocation.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
