import React, { useState } from "react";
import Input from "../../../UIs/Input/Input";
import Textarea from "../../../UIs/textArea/Textarea";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import { GiCancel } from "react-icons/gi";
import style from "./GeoInfoForm.module.scss";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export default function GeoInfoForm(props) {
  const [startLocation, setStartLocation] = useState({
    type: "Point",
    latitude: "",
    longitude: "",
    description: "",
    address: "",
  });

  const [locations, setLocations] = useState([{ id: uid(), isActive: true }]);
  const [locationInputs, setLocationInputs] = useState([
    {
      id: locations[0].id,
      type: "Point",
      latitude: "",
      longitude: "",
      description: "",
      day: "",
      address: "",
    },
  ]);
  const [errorInputs, setErrorInputs] = useState([{ id: "", field: "" }]);

  const validateInputs = (value, id, field) => {
    let valueIsValid;
    if (field === "latitude") {
      valueIsValid = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/.test(
        value
      );
    } else if (field === "longitude") {
      valueIsValid =
        /^(?:-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/.test(
          value
        );
    } else if (field === "address") {
      valueIsValid = value.trim().length > 3;
    } else if (field === "day") {
      valueIsValid = value > 0;
    } else if (field === "description") {
      valueIsValid = value.trim().length > 3;
    }
    if (!valueIsValid) {
      const inputIndex = errorInputs.findIndex(
        (errIn) => errIn.id === id && errIn.field === field
      );
      if (inputIndex !== -1) return;
      setErrorInputs((prevErrInputs) => {
        const newErrInputs = [...prevErrInputs, { id, field }];
        return newErrInputs;
      });
    } else if (valueIsValid === true) {
      const inputIndex = errorInputs.findIndex(
        (errIn) => errIn.id === id && errIn.field === field
      );
      if (inputIndex === -1) return;
      setErrorInputs((prevErrInputs) => {
        const newErrInputs = prevErrInputs.filter((prevInput) => {
          return prevInput.field !== field || prevInput.id !== id;
        });
        return newErrInputs;
      });
    }
  };

  const startLocationChangeHandler = (event, field) => {
    setStartLocation((startLocation) => {
      let newStartLocation = { ...startLocation };
      newStartLocation[field] = event.target.value;
      return newStartLocation;
    });
  };

  const locationInputChangeHandler = (index, field, event, id) => {
    let value = event.target.value;
    setLocationInputs((locationInputs) => {
      const newLocationInputs = [...locationInputs];
      newLocationInputs[index][field] = value;
      return newLocationInputs;
    });
    if (
      errorInputs.some(
        (errInput) => errInput.id === id && errInput.field === field
      )
    ) {
      validateInputs(value, id, field);
    }
  };

  const locationInputBlurHandler = (value, id, field) => {
    validateInputs(value, id, field);
  };

  const addLocationHandler = () => {
    const id = uid();
    setLocations((prevLoctions) => {
      const locations = prevLoctions.map((location) => {
        return { id: location.id, isActive: false };
      });
      return [...locations, { id, isActive: true }];
    });
    setLocationInputs((locationInputs) => {
      const newLocationInputs = [
        ...locationInputs,
        {
          id,
          type: "Point",
          latitude: "",
          longitude: "",
          description: "",
          day: "",
          address: "",
        },
      ];
      return newLocationInputs;
    });
  };

  const deleteLocationHandler = (id) => {
    setLocations((prevLocations) => {
      const filteredLocations = prevLocations.filter(
        (location) => location.id !== id
      );
      return filteredLocations;
    });
    setLocationInputs((prevLocationInputs) => {
      const filteredLocationInputs = prevLocationInputs.filter(
        (locationInput) => locationInput.id !== id
      );
      return filteredLocationInputs;
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

  const classNameHandler = (id, field) => {
    const isInValid = errorInputs.some(
      (errIn) => errIn.id === id && errIn.field === field
    );
    return isInValid;
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const transformedStartLocation = {
      type: startLocation.type,
      coordinates: [startLocation.latitude, startLocation.longitude],
      address: startLocation.address,
      description: startLocation.description,
    };
    const transformedLocations = locationInputs.map((location) => {
      return {
        type: location.type,
        coordinates: [location.latitude, location.longitude],
        address: location.address,
        day: location.day,
        description: location.description,
      };
    });
    props.onCompletingGeoForm({
      startLocation: transformedStartLocation,
      locations: transformedLocations,
    });
  };

  return (
    <form
      className={style["geo-info-form"]}
      onSubmit={formSubmitHandler}
      noValidate
    >
      <h2 className={style["title"]}>GEO INFORMATION</h2>
      <div>
        <h3 className={style["sub-title"]}>Start Location</h3>
        <div className={style["inputs-container"]}>
          <div className={style["form-control"]}>
            <label htmlFor="select-type">Select Type</label>
            <select id="select-type">
              <option value="Point" selected>
                Point
              </option>
            </select>
          </div>
          <Input
            type="number"
            id="latitude"
            name="latitude"
            label="Latitude"
            onChange={(event) => startLocationChangeHandler(event, "latitude")}
          />
          <Input
            type="number"
            id="longitude"
            name="longitude"
            label="Longitude"
            onChange={(event) => startLocationChangeHandler(event, "longitude")}
          />
          <Input
            type="text"
            id="address"
            name="address"
            label="Address"
            onChange={(event) => startLocationChangeHandler(event, "address")}
          />
          <Textarea
            id="description"
            name="description"
            label="Description"
            onChange={(event) =>
              startLocationChangeHandler(event, "description")
            }
          />
        </div>
      </div>
      <hr />
      <section className={style["locations-section"]}>
        <StandardBtn
          className={style["location-controller"]}
          type="button"
          onClick={addLocationHandler}
          disabled={locations.length === 5}
        >
          Add Location
        </StandardBtn>
        <div className={style["locations-container"]}>
          {locations.map((location, index) => {
            return (
              <div
                className={`${style["location"]} ${
                  location.isActive ? style["active"] : ""
                }`}
                key={location.id}
              >
                <div className={style["sub-title"]}>
                  <GiCancel
                    className={style["delete-location-icon"]}
                    onClick={() => deleteLocationHandler(location.id)}
                  />
                  <h3 onClick={() => locationClickHandler(location.id)}>
                    Location {index + 1}
                  </h3>
                </div>
                <div
                  className={`${style["inputs-container"]} ${style["location-inputs-container"]}`}
                >
                  <div className={style["form-control"]}>
                    <label htmlFor="select-guide">Select Type</label>
                    <select id="select-guide">
                      <option value="Point" defaultValue="point">
                        Point
                      </option>
                    </select>
                  </div>
                  <Input
                    className={
                      classNameHandler(location.id, "latitude") ? "invalid" : ""
                    }
                    type="number"
                    id="latitude"
                    name="latitude"
                    label="Latitude"
                    onChange={(event) =>
                      locationInputChangeHandler(
                        index,
                        "latitude",
                        event,
                        location.id
                      )
                    }
                    onBlur={() =>
                      locationInputBlurHandler(
                        locationInputs[index].latitude,
                        location.id,
                        "latitude"
                      )
                    }
                    value={locationInputs[index].latitude}
                  />
                  <Input
                    className={
                      classNameHandler(location.id, "longitude")
                        ? "invalid"
                        : ""
                    }
                    type="number"
                    id="longitude"
                    name="longitude"
                    label="Longitude"
                    onChange={(event) =>
                      locationInputChangeHandler(
                        index,
                        "longitude",
                        event,
                        location.id
                      )
                    }
                    onBlur={() =>
                      locationInputBlurHandler(
                        locationInputs[index].longitude,
                        location.id,
                        "longitude"
                      )
                    }
                    value={locationInputs[index].longitude}
                  />
                  <Input
                    className={
                      classNameHandler(location.id, "address") ? "invalid" : ""
                    }
                    type="text"
                    id="address"
                    name="address"
                    label="Address"
                    onChange={(event) =>
                      locationInputChangeHandler(
                        index,
                        "address",
                        event,
                        location.id
                      )
                    }
                    onBlur={() =>
                      locationInputBlurHandler(
                        locationInputs[index].address,
                        location.id,
                        "address"
                      )
                    }
                    value={locationInputs[index].address}
                  />
                  <Input
                    className={
                      classNameHandler(location.id, "day") ? "invalid" : ""
                    }
                    type="number"
                    id="day"
                    name="day"
                    label="Day"
                    onChange={(event) =>
                      locationInputChangeHandler(
                        index,
                        "day",
                        event,
                        location.id
                      )
                    }
                    onBlur={() =>
                      locationInputBlurHandler(
                        locationInputs[index].day,
                        location.id,
                        "day"
                      )
                    }
                    value={locationInputs[index].day}
                  />
                  <Textarea
                    className={
                      classNameHandler(location.id, "description")
                        ? "invalid"
                        : ""
                    }
                    id="description"
                    name="description"
                    label="Description"
                    onChange={(event) =>
                      locationInputChangeHandler(
                        index,
                        "description",
                        event,
                        location.id
                      )
                    }
                    onBlur={() =>
                      locationInputBlurHandler(
                        locationInputs[index].description,
                        location.id,
                        "description"
                      )
                    }
                    value={locationInputs[index].description}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <StandardBtn className={style["submit-btn"]} type="submit">
        Next
      </StandardBtn>
    </form>
  );
}
