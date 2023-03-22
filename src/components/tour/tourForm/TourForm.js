import React, { useContext, useEffect, useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import GeoInfoForm from "./GeoInfoForm";
import VisualInfoForm from "./VisualInfoForm";
import HasError from "../../error/HasError";
import { AuthContext } from "../../../context/auth-ctx";
import style from "./TourForm.module.scss";

export default function TourForm() {
  const { token } = useContext(AuthContext);
  const [guides, setGuides] = useState([]);
  const [basicFormInputs, setBasicFormInputs] = useState(null);
  const [geoFormInputs, setGeoFormInputs] = useState(null);
  const [visualFormInputs, setVisualFormInputs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGuides() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/users?role=guide`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setGuides(data.data.data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchGuides();
  }, [token]);

  if (error) return <HasError message={error} />;

  return (
    <div className={style["tour-form"]}>
      {!basicFormInputs && (
        <BasicInfoForm
          tourGuides={guides}
          onCompletingBasicForm={(inputs) => setBasicFormInputs({ ...inputs })}
        />
      )}
      {basicFormInputs && !geoFormInputs && <GeoInfoForm onCompletingGeoForm={(inputs) => setGeoFormInputs({ ...inputs })} />}

      {basicFormInputs && geoFormInputs && <VisualInfoForm />}
    </div>
  );
}
