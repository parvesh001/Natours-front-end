import React, { useContext, useEffect, useState } from "react";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import BasicInfoForm from "./BasicInfoForm";
import GeoInfoForm from "./GeoInfoForm";
import VisualInfoForm from "./VisualInfoForm";
import HasError from "../../error/HasError";
import { AuthContext } from "../../../context/auth-ctx";
import style from "./TourForm.module.scss";

export default function TourForm() {
  const { token } = useContext(AuthContext);
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null)
  const [infoPage, setInfoPage] = useState(1);
  const [v, setv] = useState(null)
  console.log(v)
  const lastSection = 3;

  useEffect(() => {
    async function fetchGuides() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/users?role=guide`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setGuides(data.data.data);
      } catch (err) {
        setError(err.message)
      }
    }
    fetchGuides();
  }, [token]);

  if(error)return <HasError message={error}/>

  return (
    <form className={style["tour-form"]} onClick={()=>setv('hii')}>
      {infoPage === 1 && <BasicInfoForm tourGuides={guides}/>}
      {infoPage === 2 && <GeoInfoForm />}
      {infoPage === 3 && <VisualInfoForm />}
      <div className={style["controllers"]}>
        {infoPage === lastSection && <StandardBtn>Submit</StandardBtn>}
        <div className={style["direction-controllers"]}>
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
