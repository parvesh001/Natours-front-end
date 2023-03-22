import React, { useState } from "react";
import Input from "../../../UIs/Input/Input";
import Textarea from "../../../UIs/textArea/Textarea";
import style from "./BasicInfoForm.module.scss";

export default function BasicInfoForm(props) {

  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedValues(selectedValues);
  };
  return (
    <>
      <h2 className={style["sub-title"]}>BASIC INFORMATION</h2>
      <div className={style["inputs-container"]}>
        <Input type="text" id="tour-name" name="tour-name" label="Name"/>
        <Input
          type="number"
          id="tour-duration"
          name="tour-duration"
          label="Duration"
        />
        <Input
          type="number"
          id="tour-maxGroupSize"
          name="tour-maxGroupSize"
          label="Max Group Size"
        />
        <Input
          type="number"
          id="tour-ratingsAvg"
          name="tour-ratingsAvg"
          label="Ratings Average"
        />
        <Input
          type="number"
          id="tour-ratingsQty"
          name="tour-ratingsQty"
          label="Ratings Qantity"
        />
        <Input type="number" id="tour-price" name="tour-price" label="Price" />
        <Input
          type="number"
          id="tour-discount"
          name="tour-discount"
          label="Discount"
        />
        <Input
          type="text"
          id="tour-difficulty"
          name="tour-difficulty"
          label="Difficulty"
        />
        <Input
          type="text"
          id="tour-secrecy"
          name="tour-secrecy"
          label="Secret"
        />
        <Textarea
          id="tour-description"
          name="tour-description"
          label="Description"
        />
        <Textarea id="tour-summary" name="tour-summary" label="Summary" />
        <div className={style["form-control"]}>
          <label htmlFor="select-guide">Select Guides</label>
          <select multiple onChange={handleSelectChange} value={selectedValues}>
            <option value="Select Guides">Abhi</option>
            <option value="Select Guides">Rohan</option>
            <option value="Select Guides">Sumit</option>
            <option value="Select Guides">Ajay</option>
            <option value="Select Guides">Jatin</option>
          </select>
        </div>
      </div>
    </>
  );
}
