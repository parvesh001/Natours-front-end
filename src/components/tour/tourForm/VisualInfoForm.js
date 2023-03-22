import React from "react";
import Input from "../../../UIs/Input/Input";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import style from "./VisualInfoForm.module.scss";

export default function VisualInfoForm() {
  return (
    <form className={style['visual-info-form']}>
      <div>
        <h3 className={style['sub-title']}>VISUAL INFORMATION</h3>
        <div className={style["inputs-container"]}>
          <Input type="file" id="cover-image" label="Cover Image" />
          <Input type="file" id="image-A" label="Image A" />
          <Input type="file" id="image-B" label="Image B" />
          <Input type="file" id="image-C" label="Image C" />
        </div>
      </div>
      <div>
        <h3 className={style['sub-title']}>IMPORTANT DATES</h3>
        <div className={style["inputs-container"]}>
          <Input type="date" id="start-date-1" label="Date One" />
          <Input type="date" id="start-date-2" label="Date Two" />
          <Input type="date" id="start-date-3" label="Date Three" />
        </div>
      </div>
      <StandardBtn className={style['submit-btn']} type="submit">Submit</StandardBtn>
    </form>
  );
}
