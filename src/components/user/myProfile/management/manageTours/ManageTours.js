import React, { useState } from "react";
import FormModel from "../../../../../UIs/Model/FormModel";
import StandardBtn from "../../../../../UIs/StandardBtn/StandardBtn";
import TourForm from "../../../../tour/tourForm/TourForm";
import Tours from "../../../../tour/tours/Tours";
import style from "./ManageTours.module.scss";

export default function ManageTours() {
  const [showForm, setShowForm] = useState(false);
  const [tourData, setTourData] = useState(null);

  const addTourHandler = ()=>{
    setShowForm(true)
    setTourData(null)
  }
  const editTourHandler = (tourData) => {
    setShowForm(true);
    setTourData(tourData);
  };
  const closeFormHandler = ()=>{
    setShowForm(false);
    setTourData(null);
  }

  return (
    <>
      <StandardBtn
        className={style["add-tour-controller"]}
        onClick={() => addTourHandler()}
      >
        Add New Tour
      </StandardBtn>
      {showForm && (
        <FormModel onClose={()=>closeFormHandler()}>
          <TourForm onClose={()=>closeFormHandler()}  tourData={tourData} />
        </FormModel>
      )}
      <Tours className="management" onEdit={(tourData) => editTourHandler(tourData)} />
    </>
  );
}
