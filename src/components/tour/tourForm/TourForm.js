import React, { useState } from "react";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import style from "./TourForm.module.scss";
import BasicInfoForm from "./BasicInfoForm";
import GeoInfoForm from "./GeoInfoForm";

export default function TourForm() {
  const [infoPage, setInfoPage] = useState(1);
  const lastSection = 3;
  return (
    <form className={style["tour-form"]}>
      {infoPage === 1 && <BasicInfoForm />}
      {infoPage === 2 && <GeoInfoForm/>}

      <div className={style["controllers"]}>
        {infoPage === lastSection && <StandardBtn>Submit</StandardBtn>}
        <div className={style['direction-controllers']}>
          {infoPage > 1 && (
            <AiOutlineArrowLeft
              className={style["icon"]}
              onClick={() => setInfoPage((prevN) => prevN - 1)}
            />
          )}
          {infoPage < lastSection && (
            <AiOutlineArrowRight
              className={style["icon"]}
              onClick={() => setInfoPage((prevNum) => prevNum + 1)}
            />
          )}
        </div>
      </div>
    </form>
  );
}

//things to add in input
// className={emailInputClasses}
// onChange={emailChangeHandler}
// onBlur={emailBlurHandler}
// value={emailInput}
