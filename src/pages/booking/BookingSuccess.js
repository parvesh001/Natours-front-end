
//=>>>TEMPORARY SOLUTION NOT SECURE AND RECOMMENDABLE NEED TO FIX<<===
//========================================================

import React, { useContext, useState} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import { AuthContext } from "../../context/auth-ctx";
import style from "./BookingSuccess.module.scss";
import StandardBtn from "../../UIs/StandardBtn/StandardBtn";
import Notification from "../../UIs/notification/Notification";
import { tourSliceActions } from "../../store/tour-slice";


export default function BookingSuccess() {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const { tourId, price, userId, startDate } = queryString.parse(
    location.search
  );
  const dispatch = useDispatch()
  const [notification, setNotification] = useState(null)

  const bookingSuccessHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/bookings/book-tour`,
        {
          method: "POST",
          body: JSON.stringify({ tourId, price, startDate, userId }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      dispatch(tourSliceActions.bookTour({tourId,userId}))
      setNotification({status:'success', message:'Your Booking Done!'})
      setTimeout(()=>setNotification(null),2000)
    } catch (err) {
      setNotification({status:'fail', message:err.message})
      setTimeout(()=>setNotification(null),2000)
    }
  };

  return (
    <div className={style["booking-success-page"]}>
   {notification &&  <Notification  notification ={notification}/>}
    <h2>PLEASE CONFIRM YOUR BOOKING</h2>
      <StandardBtn type="button" onClick={bookingSuccessHandler}>
        Confirm Booking
      </StandardBtn>
    </div>
  );
}
