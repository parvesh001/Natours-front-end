import React from 'react'
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import styles from './HeroSwipe.module.scss'

export default function HeroSwipe() {
  return (
    <div className={styles.swipeUp}>
    <div className={styles.swipeUp}>
      <MdOutlineKeyboardDoubleArrowUp className={styles.arrow} />
    </div>
  </div>
  )
}
