
// FilterBookingsForm.js

import React, { useState } from 'react';
import styles from './FilterBookingsForm.module.scss'; // Import the CSS module for styles
import StandardBtn from '../../../UIs/StandardBtn/StandardBtn';

const FilterBookingsForm = (props) => {
  const [tourId, setTourId] = useState('');
  const [userId, setUserId] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data to the onSubmit callback function
    props.onSubmit({ tourId, userId, price, startDate });
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
      <StandardBtn type="submit">Filter</StandardBtn>
      <StandardBtn danger={true} onClick={props.onCancel}>Cancel</StandardBtn>
      </div>
    </form>
  );
};

export default FilterBookingsForm;
