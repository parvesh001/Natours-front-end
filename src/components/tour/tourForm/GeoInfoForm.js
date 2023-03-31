import React, { useState } from "react";
import Input from "../../../UIs/Input/Input";
import Textarea from "../../../UIs/textArea/Textarea";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import { GiCancel } from "react-icons/gi";
import style from "./GeoInfoForm.module.scss";
import useInput from "../../../hooks/use-input";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export default function GeoInfoForm(props) {
  const {
    userInput: startLocationLatitudeInput,
    userInputIsValid: startLocationLatitudeInputIsValid,
    hasError: startLocationLatitudeInputHasError,
    userInputChangeHandler: startLocationLatitudeChangeHandler,
    userInputBlurHandler: startLocationLatitudeBlurHandler,
  } = useInput(
    (value) => /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/.test(value),
    props.tour.startLocation ? props.tour.startLocation.coordinates[0] : ""
  );
  const {
    userInput: startLocationLongitudeInput,
    userInputIsValid: startLocationLongitudeInputIsValid,
    hasError: startLocationLongitudeInputHasError,
    userInputChangeHandler: startLocationLongitudeChangeHandler,
    userInputBlurHandler: startLocationLongitudeBlurHandler,
  } = useInput(
    (value) =>
      /^(?:-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/.test(
        value
      ),
    props.tour.startLocation ? props.tour.startLocation.coordinates[1] : ""
  );
  const {
    userInput: startLocationAddressInput,
    userInputIsValid: startLocationAddressInputIsValid,
    hasError: startLocationAddressInputHasError,
    userInputChangeHandler: startLocationAddressChangeHandler,
    userInputBlurHandler: startLocationAddressBlurHandler,
  } = useInput(
    (value) => value.trim().length > 3,
    props.tour.startLocation ? props.tour.startLocation.address : ""
  );
  const {
    userInput: startLocationDescriptionInput,
    userInputIsValid: startLocationDescriptionInputIsValid,
    hasError: startLocationDescriptionInputHasError,
    userInputChangeHandler: startLocationDescriptionChangeHandler,
    userInputBlurHandler: startLocationDescriptionBlurHandler,
  } = useInput(
    (value) => value.trim().length > 3,
    props.tour.startLocation ? props.tour.startLocation.description : ""
  );

  const initialLocationsState = props.tour.locations
    ? props.tour.locations.map((location, index) => {
        if (index === 0) return { id: uid(), isActive: true };
        return { id: uid(), isActive: false };
      })
    : [{ id: uid(), isActive: true }];

  const initialLocationsInputs = initialLocationsState.map(
    (location, index) => {
      if (props.tour.locations) {
        return {
          id: location.id,
          type: "Point",
          latitude: props.tour.locations[index].coordinates[0],
          longitude: props.tour.locations[index].coordinates[1],
          description: props.tour.locations[index].description,
          day: props.tour.locations[index].day,
        };
      } else {
        return {
          id: location.id,
          type: "Point",
          latitude: "",
          longitude: "",
          description: "",
          day: "",
        };
      }
    }
  );

  const [locations, setLocations] = useState(initialLocationsState);

  const [locationInputs, setLocationInputs] = useState(initialLocationsInputs);

  const [errorInputs, setErrorInputs] = useState([]);

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

  let formIsValid = false;
  if (
    startLocationLatitudeInputIsValid &&
    startLocationLongitudeInputIsValid &&
    startLocationAddressInputIsValid &&
    startLocationDescriptionInputIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const transformedStartLocation = {
      type: "Point",
      coordinates: [startLocationLatitudeInput, startLocationLongitudeInput],
      address: startLocationAddressInput,
      description: startLocationDescriptionInput,
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

  const startLocationLatitudeClass = startLocationLatitudeInputHasError
    ? "invalid"
    : "";
  const startLocationLongitudeClass = startLocationLongitudeInputHasError
    ? "invalid"
    : "";
  const startLocationAddressClass = startLocationAddressInputHasError
    ? "invalid"
    : "";
  const startLocationDescriptionClass = startLocationDescriptionInputHasError
    ? "invalid"
    : "";

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
            className={startLocationLatitudeClass}
            type="number"
            id="latitude"
            name="latitude"
            label="Latitude"
            onChange={startLocationLatitudeChangeHandler}
            onBlur={startLocationLatitudeBlurHandler}
            value={startLocationLatitudeInput}
          />
          <Input
            className={startLocationLongitudeClass}
            type="number"
            id="longitude"
            name="longitude"
            label="Longitude"
            onChange={startLocationLongitudeChangeHandler}
            onBlur={startLocationLongitudeBlurHandler}
            value={startLocationLongitudeInput}
          />
          <Input
            className={startLocationAddressClass}
            type="text"
            id="address"
            name="address"
            label="Address"
            onChange={startLocationAddressChangeHandler}
            onBlur={startLocationAddressBlurHandler}
            value={startLocationAddressInput}
          />
          <Textarea
            className={startLocationDescriptionClass}
            id="description"
            name="description"
            label="Description"
            onChange={startLocationDescriptionChangeHandler}
            onBlur={startLocationDescriptionBlurHandler}
            value={startLocationDescriptionInput}
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
      <StandardBtn
        disabled={!formIsValid}
        className={style["submit-btn"]}
        type="submit"
      >
        Next
      </StandardBtn>
    </form>
  );
}
