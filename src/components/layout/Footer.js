import React from "react";
import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={style['footer']}>
      <div className={style["brand-logo"]}>
        <img src="http://localhost:8080/img/logo-green.png" alt="logo" />
      </div>
      <div>
        <nav className={style['footer-nav']}>
          <ul className={style['footer-navlist']}>
            <li className={style['footer-navlist-item']}>
              <a href="#">About Us</a>
            </li>
            <li className={style['footer-navlist-item']}>
              <a href="#">Download App</a>
            </li>
            <li className={style['footer-navlist-item']}>
              <a href="#">Become Guide</a>
            </li>
            <li className={style['footer-navlist-item']}>
              <a href="#">Careers</a>
            </li>
            <li className={style['footer-navlist-item']}>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
        <p className={style['footer-copy-right']}>&copy;2023 by Parvesh</p>
      </div>
    </footer>
  );
}
