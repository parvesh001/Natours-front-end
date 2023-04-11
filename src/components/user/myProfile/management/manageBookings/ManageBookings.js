import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../context/auth-ctx";
import Loader from "../../../../../UIs/loader/Loader";
import Model from "../../../../../UIs/Model/Model";
import Notification from "../../../../../UIs/notification/Notification";
import StandardBtn from "../../../../../UIs/StandardBtn/StandardBtn";
import style from "./ManageBookings.module.scss";
import Booking from "./Booking";
import FilterBookingsForm from "../../../bookingForms/FilterBookingsForm";

export default function ManageBookings() {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const docsPerPage = 3;
  // console.log(bookings);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/bookings?page=${currentPage}&&limit=${docsPerPage}`,
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
        setBookings(data.data.data);
        const totalPages = Math.ceil(data.data.docsAvailabe / docsPerPage);
        setTotalPages(Array.from({ length: totalPages }, (val, ind) => ind));
      } catch (err) {
        setNotification({ status: "fail", message: err.message });
        setTimeout(() => setNotification(null));
      }
      setIsLoading(false);
    };
    fetchBookings();
  }, [currentPage, docsPerPage, token]);

  const filterFormSubmitHandler = async(filterData) => {
    const {tourId, userId,price,startDate} = filterData
    
    
  };

  if (isLoading) {
    return (
      <Model>
        <Loader />
      </Model>
    );
  }

  return (
    <>
      {notification && <Notification notification={notification} />}
      <div className={style["controllers"]}>
        <StandardBtn className={style["add-booking-controller"]}>
          New Booking
        </StandardBtn>
        <StandardBtn
          className={style["filter-booking-controller"]}
          onClick={() => setFiltering(true)}
        >
          Filter Bookings
        </StandardBtn>
      </div>
      {filtering && (
        <Model>
          <FilterBookingsForm
            onSubmit={(filterData) => filterFormSubmitHandler(filterData)}
            onCancel={() => setFiltering(false)}
          />
        </Model>
      )}
      <div className={style["bookings-container"]}>
        {bookings.map((booking) => (
          <Booking
            productPhoto={booking.tour.imageCover}
            productName={booking.tour.name}
            startDate={new Date(booking.startDate).toDateString()}
            customerName={booking.user.name}
            customerEmail={booking.user.email}
            productPrice={booking.price}
          />
        ))}
      </div>
      <div className={style["pagination"]}>
        {totalPages.map((page) => (
          <div
            className={`${style["page"]} ${
              currentPage === page + 1 ? style["active"] : ""
            }`}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </div>
        ))}
      </div>
    </>
  );
}
