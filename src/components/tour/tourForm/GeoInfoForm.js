import React, { useState } from "react";
import Input from "../../../UIs/Input/Input";
import Textarea from "../../../UIs/textArea/Textarea";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import {GiCancel} from "react-icons/gi"
import style from "./GeoInfoForm.module.scss";

export default function GeoInfoForm() {
  const [locations, setLocations] = useState([{ id: 0, isActive: true }]);

  const addLocationHandler = () => {
    setLocations((prevLoctions) => {
      const locations = prevLoctions.map((location) => {
        return { id: location.id, isActive: false };
      });
      return [...locations, { id: locations.length, isActive: true }];
    });
  };

  const locationClickHandler = (id) => {
    setLocations((prevLoctions) => {
      const updatedLocations = prevLoctions.map((location) => {
        if (location.id === id) {
          return { id: location.id, isActive: true };
        }
        return { id: location.id, isActive: false };
      });
      return [...updatedLocations];
    });
  };

  return (
    <div className={style["geo-info-form"]}>
      <h2 className={style["title"]}>GEO INFORMATION</h2>
      <div>
        <h3 className={style["sub-title"]}>Start Location</h3>
        <div className={style["inputs-container"]}>
          <div className={style["form-control"]}>
            <label htmlFor="select-guide">Select Type</label>
            <select>
              <option value="Select Guides">Point</option>
            </select>
          </div>
          <Input type="number" id="latitude" name="latitude" label="Latitude" />
          <Input
            type="number"
            id="longitude"
            name="longitude"
            label="Longitude"
          />
          <Input type="text" id="address" name="address" label="Address" />
          <Textarea id="description" name="description" label="Description" />
        </div>
      </div>
      <hr />
      <div className={style["locations-container"]}>
        {locations.map((location, index) => {
          return (
            <div
              className={`${style["location"]} ${
                location.isActive ? style["active"] : ""
              }`}
              key={location.id}
            >
              <div
                className={style["sub-title"]}
                style={{ cursor: "pointer" }}
                onClick={() => locationClickHandler(location.id)}
              >
                <GiCancel className={style['icon']}/>
                <h3>Location {index + 1}</h3>
              </div>
              <div className={style["location-inputs-container"]}>
                <div className={style["form-control"]}>
                  <label htmlFor="select-guide">Select Type</label>
                  <select>
                    <option value="Select Guides">Point</option>
                  </select>
                </div>
                <Input
                  type="number"
                  id="latitude"
                  name="latitude"
                  label="Latitude"
                />
                <Input
                  type="number"
                  id="longitude"
                  name="longitude"
                  label="Longitude"
                />
                <Input
                  type="text"
                  id="address"
                  name="address"
                  label="Address"
                />
                <Input type="number" id="day" name="day" label="Day" />
                <Textarea
                  id="description"
                  name="description"
                  label="Description"
                />
              </div>
            </div>
          );
        })}
        <StandardBtn
          className={style["add-location-btn"]}
          type="button"
          onClick={addLocationHandler}
        >
          Add Location
        </StandardBtn>
      </div>
    </div>
  );
}
