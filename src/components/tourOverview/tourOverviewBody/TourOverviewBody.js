import React from "react";
import { AiOutlineCalendar, AiOutlineStar } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import style from "./TourOverviewBody.module.scss";

export default function TourOverviewBody(props) {
  const tourGuides = props.guides.map((guide) => {
    return (
      <div key={guide._id} className={style["data"]}>
        <img
          src={`http://localhost:8080/img/users/${guide.photo}`}
          alt={guide.name}
        />
        <span className={style["name"]}>
          {guide.role === "guide" ? "Tour Guide" : "Lead Guide"}
        </span>
        <span className={style["text"]}>{guide.name}</span>
      </div>
    );
  });

  return (
    <section className={style["tour-overview-body"]}>
      <div className={style["body-section-b1"]}>
        <div className={style["sub-box"]}>
          <h2 className={style["heading"]}>QUICK FACTS</h2>
          <div className={style["data"]}>
            <span className={style["icon"]}>
              <AiOutlineCalendar />
            </span>
            <span className={style["name"]}>NEXT DATE</span>
            <span className={style["text"]}>{props.date}</span>
          </div>
          <div className={style["data"]}>
            <span className={style["icon"]}>
              <BiTrendingUp />
            </span>
            <span className={style["name"]}>DIFFICULTY</span>
            <span className={style["text"]}>{props.difficulty}</span>
          </div>
          <div className={style["data"]}>
            <span className={style["icon"]}>
              <BsPeople />
            </span>
            <span className={style["name"]}>PARTICIPANTS</span>
            <span className={style["text"]}>{props.maxGroupSize} People</span>
          </div>
          <div className={style["data"]}>
            <span className={style["icon"]}>
              <AiOutlineStar />
            </span>
            <span className={style["name"]}>RATING</span>
            <span className={style["text"]}>
              {props.ratingsAverage}/{props.ratingsQuantity}
            </span>
          </div>
        </div>
        <div className={style["sub-box"]}>
          <h2 className={style["heading"]}>YOUR TOUR GUIDES</h2>
          {tourGuides}
        </div>
      </div>
      <div className={style["body-section-b2"]}>
        <div className={style["sub-box"]}>
          <h2 className={style["heading"]}>ABOUT {props.name} Tour</h2>
          <p className={style["text"]}>{props.description}</p>
        </div>
      </div>
    </section>
  );
}
