import React from "react";
import UpdateMe from "../../../updateMe/UpdateMe";
import UpdatePassword from "../../../authForms/UpdatePassword";

export default function ProfileSettings() {
  return (
    <div>
      <UpdateMe />
      <UpdatePassword />
    </div>
  );
}
