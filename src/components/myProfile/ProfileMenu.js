import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSetting, AiOutlineStar } from "react-icons/ai";
import { RiSuitcase2Line } from "react-icons/ri";
import { CiMoneyBill } from "react-icons/ci";
import style from "./ProfileMenu.module.scss";

export default function ProfileMenu() {
  return (
    <div className={style["profile-menu"]}>
      <ul className={style["profile-menu-items-list"]}>
        <li className={style["profile-menu-item"]}>
          <AiOutlineSetting className={style["icon"]} />
          <NavLink
            className={(navData) => (navData.isActive ? style["active"] : "")}
            to="/my-profile"
          >
            SETTINGS
          </NavLink>
        </li>
        <li className={style["profile-menu-item"]}>
          <RiSuitcase2Line className={style["icon"]} />
          <NavLink
            className={(navData) => (navData.isActive ? style["active"] : "")}
            to="/my-profile/my-bookings"
          >
            MY BOOKINGS
          </NavLink>
        </li>
        <li className={style["profile-menu-item"]}>
          <AiOutlineStar className={style["icon"]} />
          <NavLink
            className={(navData) => (navData.isActive ? style["active"] : "")}
            to="/my-profile/my-reviews"
          >
            MY REVIEWS
          </NavLink>
        </li>
        <li className={style["profile-menu-item"]}>
          <CiMoneyBill className={style["icon"]} />
          <NavLink
            className={(navData) => (navData.isActive ? style["active"] : "")}
            to="/my-profile/billing"
          >
            BILLING
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
