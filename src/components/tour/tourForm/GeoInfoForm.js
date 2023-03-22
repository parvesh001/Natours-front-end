import React, { useState } from "react";
import Input from "../../../UIs/Input/Input";
import Textarea from "../../../UIs/textArea/Textarea";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import { GiCancel } from "react-icons/gi";
import style from "./GeoInfoForm.module.scss";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export default function GeoInfoForm() {
  const [locations, setLocations] = useState([{ id: uid(), isActive: true }]);

  const addLocationHandler = () => {
    if (locations.length > 4) return;
    setLocations((prevLoctions) => {
      const locations = prevLoctions.map((location) => {
        return { id: location.id, isActive: false };
      });
      return [...locations, { id: uid(), isActive: true }];
    });
  };

  const deleteLocationHandler = (id) => {
    console.log("delete location");
    setLocations((prevLoctions) => {
      const filteredLocations = prevLoctions.filter(
        (location) => location.id !== id
      );
      return [...filteredLocations];
    });
  };
  console.log(locations);

  const locationClickHandler = (id) => {
    console.log("location clicked");
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
        <h3 className={style["sub-title-1"]}>Start Location</h3>
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
      <div className={style["locations"]}>
        <h3 className={style["sub-title-1"]}>Locations</h3>
        <div className={style["locations-container"]}>
          {locations.map((location, index) => {
            return (
              <div
                className={`${style["location"]} ${
                  location.isActive ? style["active"] : ""
                }`}
                key={location.id}
              >
                <div className={style["sub-title-2"]}>
                  <GiCancel
                    className={style["icon"]}
                    onClick={() => deleteLocationHandler(location.id)}
                  />
                  <h3 onClick={() => locationClickHandler(location.id)}>
                    Location {index + 1}
                  </h3>
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
            disabled={locations.length > 4}
          >
            Add Location
          </StandardBtn>
        </div>
      </div>
    </div>
  );
}
