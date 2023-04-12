// FilterBookingsForm.js

import React, { useState } from "react";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import convertDateFormat from "../../../utils/convertDateFormat";
import styles from "./BookingForm.module.scss"; // Import the CSS module for styles

const BookingForm = (props) => {
  const convertedDate = props.updatingBookingValues
    ? convertDateFormat(props.updatingBookingValues.startDate)
    : "";
  const [tourId, setTourId] = useState(props.updatingBookingValues?.tour ?? "");
  const [userId, setUserId] = useState(props.updatingBookingValues?.user ?? "");
  const [price, setPrice] = useState(props.updatingBookingValues?.price ?? "");
  const [startDate, setStartDate] = useState(convertedDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data to the onSubmit callback function
    if (props.filtering && !props.updating) {
      props.onFiltering({ tourId, userId, price, startDate });
    } else if (props.updating && !props.filtering) {
      props.onUpdating({ tourId, userId, price, startDate });
    }
  };

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      <h3 className={styles.filterForm__title}>Filter Bookings</h3>
      <div className={styles.filterForm__fields}>
        <input
          type="text"
          placeholder="Tour ID"
          value={tourId}
          onChange={(e) => setTourId(e.target.value)}
          className={styles.filterForm__input}
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className={styles.filterForm__input}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.filterForm__input}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.filterForm__input}
        />
      </div>
      <div className={styles.filterForm__controllers}>
        <StandardBtn type="submit">{props.filtering?'Filter':'Update'}</StandardBtn>
        <StandardBtn danger={true} onClick={props.onCancel}>
          Cancel
        </StandardBtn>
      </div>
    </form>
  );
};

export default BookingForm;
