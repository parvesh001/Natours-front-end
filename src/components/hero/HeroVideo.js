import React, { useState } from "react";
import Loader from '../../UIs/loader/Loader'
import styles from "./HeroVideo.module.scss";

export default function HeroVideo({onVideoLoad}) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const videoLoadedHandler = ()=>{
    onVideoLoad()
    setVideoLoaded(true)
  }
  return (
    <>
      {!videoLoaded && <div className={styles["loading-background"]}><Loader/></div>}
      <video
        className={styles["site-hero-background"]}
        loop
        muted
        autoPlay
        onLoadedData={videoLoadedHandler}
      >
        <source
          src={`${process.env.REACT_APP_DOMAIN_NAME}/api/v1/tourista-tours-video`}
          type="video/mp4"
        />
      </video>
    </>
  );
}
