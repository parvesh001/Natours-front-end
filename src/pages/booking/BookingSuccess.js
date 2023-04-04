
//=>>>TEMPORARY SOLUTION NOT SECURE AND RECOMMENDABLE NEED TO FIX<<===
//========================================================

import React, { useContext} from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { AuthContext } from "../../context/auth-ctx";
import style from "./BookingSuccess.module.scss";
import StandardBtn from "../../UIs/StandardBtn/StandardBtn";

export default function BookingSuccess() {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const { tourId, price, userId, startDate } = queryString.parse(
    location.search
  );

  const bookingSuccessHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/bookings/create-booking`,
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
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={style["booking-success-page"]}>
    <h2>PLEASE CONFIRM YOUR BOOKING</h2>
      <StandardBtn type="button" onClick={bookingSuccessHandler}>
        Confirm Booking
      </StandardBtn>
    </div>
  );
}
