import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSetting, AiOutlineStar } from "react-icons/ai";
import { RiSuitcase2Line } from "react-icons/ri";
import { CiMoneyBill } from "react-icons/ci";
import style from "./UserMenu.module.scss";

export default function UserMenu(props) {
  return (
    <ul className={style["profile-menu-items-list"]}>
      <li className={style["profile-menu-item"]} onClick={props.onClose}>
        <AiOutlineSetting className={style["icon"]} />
        <NavLink
          className={(navData) => (navData.isActive ? style["active"] : "")}
          to="/my-profile/settings"
        >
          SETTINGS
        </NavLink>
      </li>
      <li className={style["profile-menu-item"]} onClick={props.onClose}>
        <RiSuitcase2Line className={style["icon"]} />
        <NavLink
          className={(navData) => (navData.isActive ? style["active"] : "")}
          to="/my-profile/my-bookings"
        >
          MY BOOKINGS
        </NavLink>
      </li>
      <li className={style["profile-menu-item"]} onClick={props.onClose}>
        <AiOutlineStar className={style["icon"]} />
        <NavLink
          className={(navData) => (navData.isActive ? style["active"] : "")}
          to="/my-profile/my-reviews"
        >
          MY REVIEWS
        </NavLink>
      </li>
      <li className={style["profile-menu-item"]} onClick={props.onClose}>
        <CiMoneyBill className={style["icon"]} />
        <NavLink
          className={(navData) => (navData.isActive ? style["active"] : "")}
          to="/my-profile/my-billing"
        >
          BILLING
        </NavLink>
      </li>
    </ul>
  );
}
