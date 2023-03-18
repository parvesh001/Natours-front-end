import React, { useState } from "react";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import style from "./TourForm.module.scss";
import BasicInfoForm from "./BasicInfoForm";

export default function TourForm() {
  const [infoPage, setInfoPage] = useState(1);

  return (
    <form className={style["tour-form"]}>
      <h1 className={style["title"]}>ADD TOUR</h1>
      {infoPage === 1 && <BasicInfoForm />}
      {infoPage === 2 && (
        <div className={style["geo-information"]}>
          <h2 className={style["sub-title"]}>GEOGRAPHIC INFORMATION</h2>
          <div className={style["geo-info-inputs-container"]}></div>
        </div>
      )}

      <div className={style["controllers"]}>
        {infoPage === 2 && <StandardBtn>Submit</StandardBtn>}
        {infoPage === 1 && (
          <AiOutlineArrowRight
            className={style["icon"]}
            onClick={() => setInfoPage(2)}
          />
        )}
        {infoPage === 2 && (
          <AiOutlineArrowLeft
            className={style["icon"]}
            onClick={() => setInfoPage(1)}
          />
        )}
      </div>
    </form>
  );
}

//things to add in input
// className={emailInputClasses}
// onChange={emailChangeHandler}
// onBlur={emailBlurHandler}
// value={emailInput}
