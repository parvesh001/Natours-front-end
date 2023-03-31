import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BasicInfoForm from "./BasicInfoForm";
import GeoInfoForm from "./GeoInfoForm";
import VisualInfoForm from "./VisualInfoForm";
import HasError from "../../error/HasError";
import Model from "../../../UIs/Model/Model";
import Loader from "../../../UIs/loader/Loader";
import { AuthContext } from "../../../context/auth-ctx";
import { tourSliceActions } from "../../../store/tour-slice";
import style from "./TourForm.module.scss";

export default function TourForm(props) {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const [tour, setTour] = useState({});
  const [guides, setGuides] = useState([]);
  const [basicFormInputs, setBasicFormInputs] = useState({});
  const [geoFormInputs, setGeoFormInputs] = useState({});
  const [basicFormIsCompleted, setBasicFormIsCompleted] = useState(false);
  const [geoFormIsCompleted, setGeoFormIsCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  let slug;
  let id;
  if(props.tourData){
    slug = props.tourData.slug
    id = props.tourData.id
  }
  
  useEffect(() => {
    async function fetchingRelevantData() {
      try {
        if (slug) {
          const response = await fetch(
            `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/tours/${slug}`
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }
          const data = await response.json();
          setTour(data.data.data);
        }

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
      setIsLoading(false);
    }

    fetchingRelevantData();
  }, [token, slug]);

  const tourFormSubmitHandler = async (visualInfo) => {
    setIsLoading(true);
    const tourData = {
      name: basicFormInputs.name,
      duration: basicFormInputs.duration,
      maxGroupSize: basicFormInputs.maxGroupSize,
      ratingsAverage: basicFormInputs.ratingsAverage,
      ratingsQuantity: basicFormInputs.ratingsQuantity,
      price: basicFormInputs.price,
      priceDiscount: basicFormInputs.discount,
      description: basicFormInputs.description,
      summary: basicFormInputs.summary,
      secret: basicFormInputs.secret,
      guides: [...basicFormInputs.guides],
      difficulty: basicFormInputs.difficulty,
      startLocation: geoFormInputs.startLocation,
      locations: geoFormInputs.locations,
      startDates: visualInfo.startDates,
    };
    let url;
    let method;
    if (slug && id) {
      url = `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/tours/${id}`;
      method = "PATCH";
    } else {
      url = `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/tours`;
      method = "POST";
    }
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(tourData),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const { data } = await response.json();

      const formData = new FormData();
      formData.append("imageCover", visualInfo.imageCover);
      formData.append("images", visualInfo.images[0]);
      formData.append("images", visualInfo.images[1]);
      formData.append("images", visualInfo.images[2]);
    
      const results = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/tours/${data.data._id}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!results.ok) {
        const errorData = await results.json();
        throw new Error(errorData.message);
      }
      const finalData = await results.json();
      dispatch(tourSliceActions.createTour(finalData.data.data));
      props.onClose();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  if (error) return <HasError message={error} />;
  if (isLoading) {
    return (
      <Model>
        <Loader />
      </Model>
    );
  }

  return (
    <div className={style["tour-form"]}>
      {!basicFormIsCompleted && (
        <BasicInfoForm
          tourGuides={guides}
          onCompletingBasicForm={(inputs) => {
            setBasicFormInputs({ ...inputs });
            setBasicFormIsCompleted(true);
          }}
          tour={tour}
        />
      )}
      {basicFormIsCompleted && !geoFormIsCompleted && (
        <GeoInfoForm
          onCompletingGeoForm={(inputs) => {
            setGeoFormInputs({ ...inputs });
            setGeoFormIsCompleted(true);
          }}
          tour={tour}
        />
      )}

      {basicFormIsCompleted && geoFormIsCompleted && (
        <VisualInfoForm
          onSubmittingTourForm={(visualInfo) =>
            tourFormSubmitHandler(visualInfo)
          }
          tour={tour}
        />
      )}
    </div>
  );
}
