import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/auth-ctx";
import StandardBtn from "../../../../UIs/StandardBtn/StandardBtn";
import Notification from "../../../../UIs/notification/Notification";
import Model from "../../../../UIs/Model/Model";
import style from "./TourOverviewProductCard.module.scss";

export default function TourOverviewProductCard(props) {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  const [startDateInputIsValid, setStartDateInputIsValid] = useState(false);
  const [startDateInputHasTouched, setStartDateInputHasTouched] =
    useState(false);
  const [bookingTour, setBookingTour] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const startDateInputHasError =
    !startDateInputIsValid && startDateInputHasTouched;

  const cardControllerHandler = async () => {
    if (!authCtx.isLoggedIn) return navigate("/login");
    setBookingTour(true);
  };

  const startDateInputChangeHandler = (event) => {
    setStartDate(event.target.value);
    if (event.target.value !== "") {
      setStartDateInputIsValid(true);
    } else {
      setStartDateInputIsValid(false);
    }
  };

  const bookMyTourFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (startDate === "" || !startDate) {
      setStartDateInputIsValid(false);
      setStartDateInputHasTouched(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_DOMAIN_NAME
        }/api/v1/bookings/checkout-session/tour/${
          props.tourId
        }/startDate/${new Date(startDate).toISOString()}`,
        {
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      await stripe.redirectToCheckout({
        sessionId: data.data.session.id,
      });
    } catch (err) {
      setNotification({ status: "fail", message: err.message });
      setTimeout(() => setNotification(null), 2000);
    }
    setIsLoading(false);
  };

  return (
    <>
      {notification && <Notification notification={notification} />}
      {bookingTour && (
        <Model>
          <div className={style["book-your-tour"]}>
            <h3>
              We are pleased to see you with us, Please select a tour date
            </h3>
            <form onSubmit={bookMyTourFormSubmitHandler}>
              <div
                className={`${style["form-control"]} ${
                  startDateInputHasError ? style["invalid"] : ""
                }`}
              >
                <label htmlFor="select-guide">Select Start Date</label>
                <select onChange={startDateInputChangeHandler}>
                  <option value={""}>Select Preferred Date</option>
                  {props.bookingsPerStartDate.map((BPSD) => {
                    return (
                      <option
                        key={BPSD.startDate}
                        value={BPSD.startDate}
                        disabled={BPSD.availableCapacity <= 0}
                      >
                        {BPSD.startDate}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={style["form-controllers"]}>
                <StandardBtn type="submit">
                  {isLoading ? "processing" : "Book your tour"}
                </StandardBtn>
                <StandardBtn
                  type="button"
                  danger={true}
                  onClick={() => setBookingTour(false)}
                >
                  Close
                </StandardBtn>
              </div>
            </form>
          </div>
        </Model>
      )}
      <div className={style["tour-overview-product-card"]}>
        <div className={style["product-card"]}>
          <div className={style["card-images"]}>
            <img
              className={style["img1"]}
              src={`${process.env.REACT_APP_DOMAIN_NAME}/img/logo-green-round.png`}
              alt="tour"
            />
            <img
              className={style["img2"]}
              src={`${process.env.REACT_APP_DOMAIN_NAME}/img/tours/${props.images[1]}`}
              alt="tour"
            />
            <img
              className={style["img3"]}
              src={`${process.env.REACT_APP_DOMAIN_NAME}/img/tours/${props.images[2]}`}
              alt="tour"
            />
          </div>
          <div className={style["card-text"]}>
            <h4>WHAT ARE YOU WAITING FOR?</h4>
            <p>
              {props.duration} days. Fill your life with full of memories and
              adventures!
            </p>
          </div>
          <div className={style["card-controller"]}>
            <StandardBtn
              type="button"
              className={style["card-btn"]}
              onClick={cardControllerHandler}
            >
              {authCtx.isLoggedIn ? "Book Tour" : "Login To Book Tour"}
            </StandardBtn>
          </div>
        </div>
      </div>
    </>
  );
}
