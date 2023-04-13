import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../context/auth-ctx";
import Loader from "../../../../../UIs/loader/Loader";
import Model from "../../../../../UIs/Model/Model";
import Notification from "../../../../../UIs/notification/Notification";
import StandardBtn from "../../../../../UIs/StandardBtn/StandardBtn";
import Booking from "./Booking";
import BookingForm from "../../../bookingForm/BookingForm";
import NoDataFound from "../../../../../UIs/noDataFound/NoDataFound";
import style from "./ManageBookings.module.scss";

export default function ManageBookings() {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatingBooking, setUpdatingBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [queryObj, setQueryObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const docsPerPage = 3;

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (queryObj.tour) params.append("tour", queryObj.tour);
      if (queryObj.user) params.append("user", queryObj.user);
      if (queryObj.price) params.append("price", queryObj.price);
      if (queryObj.startDate) params.append("startDate", queryObj.startDate);
      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_DOMAIN_NAME
          }/api/v1/bookings?${params.toString()}&page=${currentPage}&&limit=${docsPerPage}`,
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
  }, [currentPage, docsPerPage, token, queryObj]);

  const filterHandler = async (filterData) => {
    const { tourId, userId, price, startDate } = filterData;
    setIsLoading(true);
    setCurrentPage(1);
    setQueryObj({
      tour: tourId,
      user: userId,
      price: price,
      startDate: startDate,
    });
    setFiltering(false);
  };

  const updateBookingHandler = async (formData) => {
    setIsLoading(true);
    const bookingId = updatingBooking.id;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/bookings/${bookingId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            user: formData.userId,
            tour: formData.tourId,
            startDate: formData.startDate,
            price: formData.price,
          }),
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      setBookings((prevBookings) => {
        const newBookings = [...prevBookings];
        const updatingBookingInd = newBookings.findIndex(
          (booking) => booking._id === bookingId
        );
        newBookings[updatingBookingInd] = data.data.data;
        return newBookings;
      });
    } catch (err) {
      setNotification({ status: "fail", message: err.message });
      setTimeout(() => setNotification(null), 3000);
    }
    setIsLoading(false);
    setUpdating(false);
    setUpdatingBooking(null);
  };

  const deleteBookingHandler = async (bookingId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      setBookings((prevBookings) => {
        const filteredBookings = prevBookings.filter(
          (booking) => booking._id !== bookingId
        );
        return filteredBookings;
      });
    } catch (err) {
      setNotification({ status: "fail", message: err.message });
      setTimeout(() => setNotification(null), 3000);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Model>
        <Loader />
      </Model>
    );
  }

  const queryObjHasValue = Object.values(queryObj).some(
    (val) => (val?.trim() ?? "") !== ""
  );

  return (
    <>
      {(filtering || updating) && (
        <Model>
          <BookingForm
            onFiltering={(filterData) => filterHandler(filterData)}
            onUpdating={(updateData) => updateBookingHandler(updateData)}
            updatingBookingValues={updatingBooking}
            onCancel={() => {
              setFiltering(false);
              setUpdating(false);
            }}
            filtering={filtering}
            updating={updating}
          />
        </Model>
      )}
      {notification && <Notification notification={notification} />}
      <div className={style["manage-bookings"]}>
        <div className={style["controllers"]}>
          <StandardBtn className={style["add-booking-controller"]}>
            New Booking
          </StandardBtn>
          {!queryObjHasValue && bookings.length > 0 && (
            <StandardBtn
              className={style["filter-booking-controller"]}
              onClick={() => {
                setUpdating(false);
                setFiltering(true);
                setUpdatingBooking(null);
              }}
            >
              Filter Bookings
            </StandardBtn>
          )}
          {queryObjHasValue && (
            <StandardBtn
              className={style["filter-booking-controller"]}
              onClick={() => {
                setQueryObj({});
                setCurrentPage(1);
              }}
            >
              Reset Filter
            </StandardBtn>
          )}
        </div>
        {bookings.length === 0 && <NoDataFound />}
        <div className={style["bookings-container"]}>
          {bookings.map((booking) => (
            <Booking
              key={booking._id}
              productPhoto={booking.tour.imageCover}
              productName={booking.tour.name}
              startDate={new Date(booking.startDate).toDateString()}
              customerName={booking.user.name}
              customerEmail={booking.user.email}
              productPrice={booking.price}
              onUpdateBooking={() => {
                setFiltering(false);
                setUpdating(true);
                setUpdatingBooking({
                  id: booking._id,
                  tour: booking.tour._id,
                  user: booking.user._id,
                  price: booking.price,
                  startDate: booking.startDate,
                });
              }}
              onDeleteBooking={() => deleteBookingHandler(booking._id)}
            />
          ))}
        </div>
        <div className={style["pagination"]}>
          {totalPages.map((page, ind) => (
            <div
              key={ind}
              className={`${style["page"]} ${
                currentPage === page + 1 ? style["active"] : ""
              }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
