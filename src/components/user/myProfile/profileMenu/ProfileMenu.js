import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSetting, AiOutlineStar } from "react-icons/ai";
import { RiSuitcase2Line } from "react-icons/ri";
import { CiMoneyBill } from "react-icons/ci";
import { BsMap, BsFillJournalBookmarkFill, BsArrowBarLeft } from "react-icons/bs";
import { SlPeople } from "react-icons/sl";
import style from "./ProfileMenu.module.scss";
import { AuthContext } from "../../../../context/auth-ctx";

export default function ProfileMenu(props) {
  const authCtx = useContext(AuthContext);
  return (
    <div className={`${style["profile-menu"]} ${props.className}`}>
      <BsArrowBarLeft className={style['close-icon']} onClick={props.onClose}/>
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
            to="/my-profile/billing"
          >
            BILLING
          </NavLink>
        </li>
      </ul>
      {authCtx.user.role === "admin" && (
        <div className={style["admin-block"]}>
          <div className={style["admin-block-title"]}>
            <h4>ADMIN</h4>
          </div>
          <ul className={style["profile-menu-items-list"]}>
            <li className={style["profile-menu-item"]} onClick={props.onClose}>
              <BsMap className={style["icon"]} />
              <NavLink
                className={(navData) =>
                  navData.isActive ? style["active"] : ""
                }
                to="/my-profile/manage-tours"
              >
                MANAGE TOURS
              </NavLink>
            </li>
            <li className={style["profile-menu-item"]} onClick={props.onClose}>
              <SlPeople className={style["icon"]} />
              <NavLink
                className={(navData) =>
                  navData.isActive ? style["active"] : ""
                }
                to="/my-profile/manage-users"
              >
                MANAGE USERS
              </NavLink>
            </li>
            <li className={style["profile-menu-item"]} onClick={props.onClose}>
              <AiOutlineStar className={style["icon"]} />
              <NavLink
                className={(navData) =>
                  navData.isActive ? style["active"] : ""
                }
                to="/my-profile/manage-reviews"
              >
                MANAGE REVIEWS
              </NavLink>
            </li>
            <li className={style["profile-menu-item"]} onClick={props.onClose}>
              <BsFillJournalBookmarkFill className={style["icon"]} />
              <NavLink
                className={(navData) =>
                  navData.isActive ? style["active"] : ""
                }
                to="/my-profile/manage-bookings"
              >
                MANAGE BOOKINGS
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
