import React, { useState } from "react";
import ProfileMenu from "../profileMenu/ProfileMenu"
import {RiMenuUnfoldLine} from 'react-icons/ri'
import style from './ProfileLayout.module.scss'

export default function ProfileLayout(props) {
  const [isActive,setIsActive] = useState(false)
  return (
    <div className={style['profile-layout']}>
      <RiMenuUnfoldLine className={style['menu-controller']} onClick={()=>setIsActive(true)}/>
      <ProfileMenu className={`${style['profile-menu']} ${isActive? style['active']: ''}`} onClose={()=>setIsActive(false)}/>
      <main className={style['profile-main']}>
        {props.children}
      </main>
    </div>
  );
}
