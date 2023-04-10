import React from "react";
import style from "./SingleReview.module.scss";
import { AiOutlineStar, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function SingleReview(props) {
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
    <div className={style["my-review"]}>
      <div className={style["review-header"]}>
        <img
          src={`${process.env.REACT_APP_DOMAIN_NAME}/img/users/${props.user.photo}`}
          alt={props.user.name}
        />
        <span>{props.user.name}</span>
      </div>
      <div className={style["review-body"]}>
        <p>{props.review}</p>
      </div>
      <div className={style["review-footer"]}>{stars}</div>
      <div className={style["review-controllers"]}>
        <AiOutlineEdit className={style['controller']} onClick={props.onEditingReview}/>
        <AiOutlineDelete className={style['controller']} onClick={props.onDeletingReview}/>
      </div>
    </div>
  );
}
