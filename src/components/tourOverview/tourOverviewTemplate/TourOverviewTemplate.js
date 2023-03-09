import React from "react";
import style from "./TourOverviewTemplate.module.scss";

export default function TourOverviewTemplate(props) {
  return (
    <div className={style["tour-overview-template"]}>
      {props.images.map((image) => {
        return (
          <div key={image} className={style['template-image']}>
            <img
              src={`http://localhost:8080/img/tours/${image}`}
              alt={props.name}
            />
          </div>
        );
      })}
    </div>
  );
}
