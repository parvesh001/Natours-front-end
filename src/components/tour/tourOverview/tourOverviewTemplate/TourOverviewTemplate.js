import React from "react";
import style from "./TourOverviewTemplate.module.scss";

export default function TourOverviewTemplate(props) {
  return (
    <div className={style["tour-overview-template"]}>
      {props.images.map((image) => {
        return (
          <div key={image} className={style['template-image']}>
            <img
              src={`${process.env.REACT_APP_DOMAIN_NAME}/img/tours/${image}`}
              alt={props.name}
            />
          </div>
        );
      })}
    </div>
  );
}
