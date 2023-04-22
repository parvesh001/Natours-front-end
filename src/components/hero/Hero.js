import React from "react";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <div className={styles["site-hero"]}>
      <img
        src={`http://localhost:8080/img/tourista-colored-logo.png`}
        alt="site-logo"
      />
      <div className={styles['hero-overlay']}/>
      <video className={styles["site-hero-video"]} loop muted autoPlay>
        <source
          src={`http://localhost:8080/api/v1/tourista-tours-video`}
          type="video/mp4"
        />
      </video>
      <div className={styles.swipeUp}>
        <div className={styles.swipeUp}>
          <MdOutlineKeyboardDoubleArrowUp className={styles.arrow} />
        </div>
      </div>
      <div className={styles['content']}>
        <h1 data-text="welcome to tourista tours...">Welcome to tourista tours...</h1>
      </div>
    </div>
  );
}
