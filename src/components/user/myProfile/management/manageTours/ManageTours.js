import React, { useState } from "react";
import FormModel from "../../../../../UIs/Model/FormModel";
import StandardBtn from "../../../../../UIs/StandardBtn/StandardBtn";
import TourForm from "../../../../tour/tourForm/TourForm";
import Tours from "../../../../tour/tours/Tours";
import style from "./ManageTours.module.scss";

export default function ManageTours() {
  const [showForm, setShowForm] = useState(false);
  const [tourSlug, setTourSlug] = useState(null);

  const addTourHandler = ()=>{
    setShowForm(true)
    setTourSlug(null)
  }
  const editTourHandler = (tourSlug) => {
    setShowForm(true);
    setTourSlug(tourSlug);
  };
  const closeFormHandler = ()=>{
    setShowForm(false);
    setTourSlug(null);
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
          <TourForm onClose={()=>closeFormHandler()}  tourSlug={tourSlug} />
        </FormModel>
      )}
      <Tours className="management" onEdit={(tourSlug) => editTourHandler(tourSlug)} />
    </>
  );
}
