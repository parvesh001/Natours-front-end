import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../../../context/auth-ctx";
import { tourSliceActions } from "../../../../../store/tour-slice";
import FormModel from "../../../../../UIs/Model/FormModel";
import StandardBtn from "../../../../../UIs/StandardBtn/StandardBtn";
import TourForm from "../../../../tour/tourForm/TourForm";
import Tours from "../../../../tour/tours/Tours";
import Model from "../../../../../UIs/Model/Model";
import Loader from "../../../../../UIs/loader/Loader";
import Notification from "../../../../../UIs/notification/Notification";
import style from "./ManageTours.module.scss";

export default function ManageTours() {
  const authCtx = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [tourEditData, setTourEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();

  const addTourHandler = () => {
    setShowForm(true);
    setTourEditData(null);
  };
  
  const editTourHandler = (tourEditData) => {
    setShowForm(true);
    setTourEditData(tourEditData);
  };
  const closeFormHandler = () => {
    setShowForm(false);
    setTourEditData(null);
  };

  const tourDeleteHandler = async (tourId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/tours/${tourId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      dispatch(tourSliceActions.deleteTour(tourId));
      setNotification({ status: "success", message: "Tour deleted!" });
      setTimeout(() => setNotification(null), 1000);
    } catch (err) {
      setNotification({ status: "fail", message: err.message });
      setTimeout(() => setNotification(null), 1000);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <Model>
          <Loader />
        </Model>
      )}
      {notification && <Notification notification={notification} />}
      <StandardBtn
        className={style["add-tour-controller"]}
        onClick={() => addTourHandler()}
      >
        Add New Tour
      </StandardBtn>
      {showForm && (
        <FormModel onClose={() => closeFormHandler()}>
          <TourForm
            onClose={() => closeFormHandler()}
            tourEditData={tourEditData}
          />
        </FormModel>
      )}
      <Tours
        className="management"
        onEdit={(tourEditData) => editTourHandler(tourEditData)}
        onTourDelete={(tourId) => tourDeleteHandler(tourId)}
        managing ={true}
      />
    </>
  );
}
