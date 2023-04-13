import React from "react";
import Booking from "./Booking";

export default function Bookings({
  bookings,
  onUpdateBooking,
  onDeleteBooking,
}) {
  return (
    <>
      {bookings.map((booking) => (
        <Booking
          key={booking._id}
          productPhoto={booking.tour.imageCover}
          productName={booking.tour.name}
          startDate={new Date(booking.startDate).toDateString()}
          customerName={booking.user.name}
          customerEmail={booking.user.email}
          productPrice={booking.price}
          onUpdateBooking={() =>
            onUpdateBooking({
              id: booking._id,
              tour: booking.tour._id,
              user: booking.user._id,
              price: booking.price,
              startDate: booking.startDate,
            })
          }
          onDeleteBooking={() => onDeleteBooking(booking._id)}
        />
      ))}
    </>
  );
}
