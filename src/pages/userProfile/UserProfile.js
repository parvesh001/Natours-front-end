import React from "react";
import { Outlet} from "react-router-dom";
import ProfileLayout from "../../components/user/myProfile/profileLayout/ProfileLayout";

export default function UserProfile() {

  return (
    <ProfileLayout>
      <Outlet/>
    </ProfileLayout>
  );
}
