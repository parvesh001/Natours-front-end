import React from "react";
import ProfileMenu from "../profileMenu/ProfileMenu";
import style from './ProfileLayout.module.scss'

export default function ProfileLayout(props) {
  return (
    <div className={style['profile-layout']}>
      <ProfileMenu />
      <main>
        {props.children}
      </main>
    </div>
  );
}
