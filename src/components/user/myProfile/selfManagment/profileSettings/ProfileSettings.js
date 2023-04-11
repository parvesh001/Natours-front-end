import React from "react";
import UpdateMeForm from "../../../updateMeForm/UpdateMeForm";
import UpdatePassword from "../../../authForms/UpdatePassword";

export default function ProfileSettings() {
  return (
    <div>
      <UpdateMeForm />
      <UpdatePassword />
    </div>
  );
}
