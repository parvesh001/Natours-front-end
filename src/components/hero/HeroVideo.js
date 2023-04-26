import React from 'react'
import styles from './HeroVideo.module.scss'

export default function HeroVideo() {
  return (
    <video className={styles["site-hero-video"]} loop muted autoPlay>
    <source
      src={`${process.env.REACT_APP_DOMAIN_NAME}/api/v1/tourista-tours-video`}
      type="video/mp4"
    />
  </video>
  )
}
