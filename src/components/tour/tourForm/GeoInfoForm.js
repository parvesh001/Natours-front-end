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
    type: "point",
    latitude: "",
    longitude: "",
    description: "",
    address: "",
  });

  const [locations, setLocations] = useState([{ id: uid(), isActive: true }]);
  const [locationInputs, setLocationInputs] = useState([
    {
      id: locations[0].id,
      type: "point",
      latitude: "",
      longitude: "",
      description: "",
      day: "",
      address: "",
    },
  ]);

  const startLocationChangeHandler = (event, field) => {
    setStartLocation((startLocation) => {
      let newStartLocation = { ...startLocation };
      newStartLocation[field] = event.target.value;
      return newStartLocation;
    });
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
          type: "point",
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

  const locationInputChangeHandler = (index, field, event) => {
    let value = event.target.value;
    setLocationInputs((locationInputs) => {
      const newLocationInputs = [...locationInputs];
      newLocationInputs[index][field] = value;
      return newLocationInputs;
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    props.onCompletingGeoForm({startLocation, locationInputs})
  };

  return (
    <form className={style["geo-info-form"]} onSubmit={formSubmitHandler}>
      <h2 className={style["title"]}>GEO INFORMATION</h2>
      <div>
        <h3 className={style["sub-title"]}>Start Location</h3>
        <div className={style["inputs-container"]}>
          <div className={style["form-control"]}>
            <label htmlFor="select-guide">Select Type</label>
            <select>
              <option value="point" selected>
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
                      <option value="point" selected>
                        Point
                      </option>
                    </select>
                  </div>
                  <Input
                    type="number"
                    id="latitude"
                    name="latitude"
                    label="Latitude"
                    onChange={(event) =>
                      locationInputChangeHandler(index, "latitude", event)
                    }
                    value={locationInputs[index].latitude}
                  />
                  <Input
                    type="number"
                    id="longitude"
                    name="longitude"
                    label="Longitude"
                    onChange={(event) =>
                      locationInputChangeHandler(index, "longitude", event)
                    }
                    value={locationInputs[index].longitude}
                  />
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    label="Address"
                    onChange={(event) =>
                      locationInputChangeHandler(index, "address", event)
                    }
                    value={locationInputs[index].address}
                  />
                  <Input
                    type="number"
                    id="day"
                    name="day"
                    label="Day"
                    onChange={(event) =>
                      locationInputChangeHandler(index, "day", event)
                    }
                    value={locationInputs[index].day}
                  />
                  <Textarea
                    id="description"
                    name="description"
                    label="Description"
                    onChange={(event) =>
                      locationInputChangeHandler(index, "description", event)
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
