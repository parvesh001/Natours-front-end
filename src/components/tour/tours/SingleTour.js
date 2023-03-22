import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth-ctx";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import { useNavigate } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { CgMenuRound } from "react-icons/cg";
import {
  AiOutlineCalendar,
  AiOutlineFlag,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFolderView,
} from "react-icons/ai";
import style from "./SingleTour.module.scss";


export default function SingleTour(props) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  return (
    <div className={style["card"]}>
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
        {authCtx.user.role === "admin" && (
          <div className={style["tour-menu"]}>
            <CgMenuRound className={style["menu-icon"]} />
            <div className={style["menu-controllers"]}>
              <div className={style["controller"]}>
                <AiOutlineFolderView
                  onClick={() => navigate(`/tour/${props.slug}`)}
                />
              </div>
              <div className={style["controller"]}>
                <AiOutlineEdit />
              </div>
              <div className={style["controller"]}>
                <AiOutlineDelete />
              </div>
            </div>
          </div>
        )}
        {authCtx.user.role !== "admin" && (
          <StandardBtn
            type="button"
            onClick={() => navigate(`/tour/${props.slug}`)}
            className={style['controller']}
          >
           Details
          </StandardBtn>
        )}
      </div>
    </div>
  );
}
