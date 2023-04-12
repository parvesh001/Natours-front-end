import React from 'react';
import style from './NoDataFound.module.scss'; // Import the Sass file for styles

const NoDataFound = () => {
  return (
    <div className={style["no-data-container"]}>
      <div className={style["no-data"]}>
        <p>No Data Found</p>
      </div>
    </div>
  );
};

export default NoDataFound;
