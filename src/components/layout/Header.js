import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-ctx";
import style from "./Header.module.scss";

export default function Header() {
  const authCtx = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navbarToggleHandler = () => {
    setIsOpen(!isOpen);
  };

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
        {!authCtx.isLoggedIn && (
          <ul className={style["main-nav-list"]}>
            <li className={style["main-nav-list-item"]}>
              <Link to="/login">Login</Link>
            </li>
            <li className={style["main-nav-list-item"]}>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        )}
        {authCtx.isLoggedIn && (
          <ul className={style["main-nav-list"]}>
            <li className={style["main-nav-list-item"]}>
              <button onClick={()=>authCtx.logout()}>Logout</button>
            </li>
            <li className={style["main-nav-list-item"]}>
              <Link to="/my-profile" className={style['user-profile']}>
                <img
                  className={style.userPhoto}
                  src={`http://localhost:8080/img/users/${authCtx.user.photo}`}
                  alt={authCtx.user.name}
                />
                <span className={style.userName}>{authCtx.user.name}</span>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
