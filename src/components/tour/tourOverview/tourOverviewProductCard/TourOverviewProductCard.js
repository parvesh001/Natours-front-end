import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/auth-ctx";
import StandardBtn from "../../../../UIs/StandardBtn/StandardBtn";
import Notification from "../../../../UIs/notification/Notification";
import style from "./TourOverviewProductCard.module.scss";

export default function TourOverviewProductCard(props) {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const cardControllerHandler = async () => {
    if (!authCtx.isLoggedIn) return navigate("/login");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN_NAME}/api/v1/bookings/checkout-session/${props.tourId}`,
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
      setTimeout(() => setNotification(null), 1000);
    }
    setIsLoading(false);
  };

  return (
    <>
      {notification && <Notification notification={notification} />}
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
              {authCtx.isLoggedIn
                ? isLoading
                  ? "processing..."
                  : "Book Tour"
                : "Login To Book Tour"}
            </StandardBtn>
          </div>
        </div>
      </div>
    </>
  );
}
