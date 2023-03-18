import React, {useState} from "react";
import Model from "../../../../../UIs/Model/Model";
import StandardBtn from "../../../../../UIs/StandardBtn/StandardBtn";
import TourForm from "../../../../tour/tourForm/TourForm";
import Tours from "../../../../tour/tours/Tours";
import style from './ManageTours.module.scss'

export default function ManageTours() {
  const [isAdding, setIsAdding] = useState(false)
  return (
    <>
      <StandardBtn className={style['add-tour-controller']} onClick={()=>setIsAdding(true)}>Add New Tour</StandardBtn>
      {isAdding && <Model onClose={()=>setIsAdding(false)}><TourForm/></Model>}
      <Tours className="management" />
    </>
  );
}
