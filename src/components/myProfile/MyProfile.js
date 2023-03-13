import React from "react";
import ProfileMenu from "./ProfileMenu";
import ProfileSettings from "./ProfileSettings";
import PasswordReset from "../auth/PasswordRest";
import style from "./MyProfile.module.scss";

export default function MyProfile() {
  return (
    <div className={style["my-profile"]}>
      <ProfileMenu />
      <div>
        <ProfileSettings />
        <hr />
        <PasswordReset />
      </div>
    </div>
  );
}
