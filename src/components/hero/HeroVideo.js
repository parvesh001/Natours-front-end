import React, { useState } from "react";
import styles from "./HeroVideo.module.scss";

export default function HeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  return (
    <>
      {!videoLoaded && (
        <img
          className={styles["site-hero-background"]}
          src={`${process.env.REACT_APP_DOMAIN_NAME}/img/hero.jpg`}
          alt="hero-background"
        />
      )}
      <video
        className={styles["site-hero-background"]}
        loop
        muted
        autoPlay
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source
          src={`${process.env.REACT_APP_DOMAIN_NAME}/api/v1/tourista-tours-video`}
          type="video/mp4"
        />
      </video>
    </>
  );
}
