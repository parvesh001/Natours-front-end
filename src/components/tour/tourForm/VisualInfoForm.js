import React from "react";
import Input from "../../../UIs/Input/Input";
import style from "./VisualInfoForm.module.scss";

export default function VisualInfoForm() {
  return (
    <div className={style['visual-info-form']}>
      <div>
        <h2 className={style["title"]}>VISUAL INFORMATION</h2>
        <div className={style["inputs-container"]}>
          <Input type="file" id="cover-image" label="Cover Image" />
          <Input type="file" id="image-A" label="Image A" />
          <Input type="file" id="image-B" label="Image B" />
          <Input type="file" id="image-C" label="Image C" />
        </div>
      </div>
      <hr />
      <div>
        <h2 className={style["title"]}>START DATES</h2>
        <div className={style["inputs-container"]}>
          <Input type="date" id="date-1" label="Date 1" />
          <Input type="date" id="date-2" label="Date 2" />
          <Input type="date" id="date-2" label="Date 3" />
          <Input type="date" id="date-2" label="Date 4" />
        </div>
      </div>
    </div>
  );
}
