import React, { useState } from "react";
import styles from "./HeroVideo.module.scss";

export default function HeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  return (
    <>
      {!videoLoaded && <div className={styles["site-hero-background"]}/>}
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
