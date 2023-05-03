import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import HeroVideo from "./HeroVideo";
import HeroSlogan from "./HeroSlogan";
import HeroSwipe from "./HeroSwipe";
import StandardBtnTP from "../../UIs/StandardBtn/StandardBtnTP";
import styles from "./Hero.module.scss";

export default function Hero({ onSwipeUp, className, style }) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handlers = useSwipeable(
    {
      onSwipedUp: (eventData) => onSwipeUp(),
    },
    { preventScrollOnSwipe: true }
  );

  return (
    <div
      className={`${styles["site-hero"]} ${styles[className]}`}
      {...handlers}
      style={style}
    >
      <img
        src={`${process.env.REACT_APP_DOMAIN_NAME}/img/tourista-colored-logo.png`}
        alt="site-logo"
        className={styles["logo"]}
      />
      <div className={styles["hero-overlay"]} />
      <HeroVideo onVideoLoad={() => setVideoLoaded(true)} />
      {videoLoaded && <HeroSlogan />}
      {videoLoaded && <HeroSwipe />}
      {videoLoaded && (
        <StandardBtnTP
          className={styles["hero-controller"]}
          onClick={() => onSwipeUp()}
        >
          Explore Tours
        </StandardBtnTP>
      )}
    </div>
  );
}
