import React from "react";
import style from "./TourOverviewReview.module.scss";
import { AiOutlineStar } from "react-icons/ai";

export default function TourOverviewReview(props) {
  let count = [1, 2, 3, 4, 5];
  let stars = count.map((c) => {
    return (
      <AiOutlineStar
        key={c}
        className={style[`star-${props.rating >= c ? "active" : "inactive"}`]}
      />
    );
  });

  return (
    <div className={style["tour-overview-review"]}>
      <div className={style["review-header"]}>
        <img
          src={`http://localhost:8080/img/users/${props.user.photo}`}
          alt={props.user.name}
        />
        <span>{props.user.name}</span>
      </div>
      <div className={style["review-body"]}>
        <p>{props.review}</p>
      </div>
      <div className={style["review-footer"]}>{stars}</div>
    </div>
  );
}
