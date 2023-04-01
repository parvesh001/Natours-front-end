import React, { useState } from "react";
import FormModel from "../../../../../UIs/Model/FormModel";
import StandardBtn from "../../../../../UIs/StandardBtn/StandardBtn";
import TourForm from "../../../../tour/tourForm/TourForm";
import Tours from "../../../../tour/tours/Tours";
import style from "./ManageTours.module.scss";

export default function ManageTours() {
  const [showForm, setShowForm] = useState(false);
  const [tourEditData, setTourEditData] = useState(null);

  const addTourHandler = ()=>{
    setShowForm(true)
    setTourEditData(null)
  }
  const editTourHandler = (tourEditData) => {
    setShowForm(true);
    setTourEditData(tourEditData);
  };
  const closeFormHandler = ()=>{
    setShowForm(false);
    setTourEditData(null);
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
          <TourForm onClose={()=>closeFormHandler()}  tourEditData={tourEditData} />
        </FormModel>
      )}
      <Tours className="management" onEdit={(tourEditData) => editTourHandler(tourEditData)} />
    </>
  );
}
