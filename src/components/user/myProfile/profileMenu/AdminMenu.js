import React from "react";
import { NavLink } from "react-router-dom";
import { BsMap, BsFillJournalBookmarkFill } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { SlPeople } from "react-icons/sl";
import style from "./AdminMenu.module.scss";

export default function AdminMenu(props) {
  return (
    <div className={style["admin-block"]}>
      <div className={style["admin-block-title"]}>
        <h4>ADMIN</h4>
      </div>
      <ul className={style["profile-menu-items-list"]}>
        <li className={style["profile-menu-item"]} onClick={props.onClose}>
          <BsMap className={style["icon"]} />
          <NavLink
            className={(navData) => (navData.isActive ? style["active"] : "")}
            to="/my-profile/manage-tours"
          >
            MANAGE TOURS
          </NavLink>
        </li>
        <li className={style["profile-menu-item"]} onClick={props.onClose}>
          <SlPeople className={style["icon"]} />
          <NavLink
            className={(navData) => (navData.isActive ? style["active"] : "")}
            to="/my-profile/manage-users"
          >
            MANAGE USERS
          </NavLink>
        </li>
        <li className={style["profile-menu-item"]} onClick={props.onClose}>
          <AiOutlineStar className={style["icon"]} />
          <NavLink
            className={(navData) => (navData.isActive ? style["active"] : "")}
            to="/my-profile/manage-reviews"
          >
            MANAGE REVIEWS
          </NavLink>
        </li>
        <li className={style["profile-menu-item"]} onClick={props.onClose}>
          <BsFillJournalBookmarkFill className={style["icon"]} />
          <NavLink
            className={(navData) => (navData.isActive ? style["active"] : "")}
            to="/my-profile/manage-bookings"
          >
            MANAGE BOOKINGS
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
