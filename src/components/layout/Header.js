import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.scss";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarToggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const loggedIn = false;
  return (
    <header className={style["main-header"]}>
      <h4 className={style["brand-name"]}>
        <Link to="/">NATOURS</Link>
      </h4>
      <div className={style["brand-logo"]}>
        <img src="http://localhost:8080/img/logo-white.png" alt="logo" />
        <h4>
          <Link to="/">NATOURS</Link>
        </h4>
      </div>
      <div
        className={`${style["navbar-toggle"]} ${isOpen ? style["active"] : ""}`}
        onClick={navbarToggleHandler}
      >
        <span className={style["bar"]}></span>
        <span className={style["bar"]}></span>
        <span className={style["bar"]}></span>
      </div>
      <nav className={`${style["main-nav"]} ${isOpen ? style["active"] : ""}`}>
        {!loggedIn && (
          <ul className={style["main-nav-list"]}>
            <li className={style["main-nav-list-item"]}>
              <Link to="/login">Login</Link>
            </li>
            <li className={style["main-nav-list-item"]}>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        )}
        {loggedIn && (
          <ul className={style["main-nav-list"]}>
            <li className={style["main-nav-list-item"]}>
              <Link to="/">Logout</Link>
            </li>
            <li className={style["main-nav-list-item"]}>
              <Link to="/">Profile</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
