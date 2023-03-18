import React, { useState } from "react";
// import { AuthContext } from "../../context/auth-ctx";
import style from "./Select.module.scss";

export default function Select() {
  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedValues(selectedValues);
  };

  return (
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
  );
}
