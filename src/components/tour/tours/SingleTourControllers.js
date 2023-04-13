import React, { useContext } from "react";
import StandardBtn from "../../../UIs/StandardBtn/StandardBtn";
import { CgMenuRound } from "react-icons/cg";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFolderView,
} from "react-icons/ai";
import { AuthContext } from "../../../context/auth-ctx";
import { useNavigate } from "react-router-dom";
import style from "./SingleTourControllers.module.scss";

export default function SingleTourControllers(props) {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      {authCtx.user.role === "admin" && props.managing && (
        <div className={style["tour-menu"]}>
          <CgMenuRound className={style["menu-icon"]} />
          <div className={style["menu-controllers"]}>
            <div className={style["controller"]}>
              <AiOutlineFolderView
                onClick={() => navigate(`/tour/${props.slug}`)}
              />
            </div>
            <div className={style["controller"]}>
              <AiOutlineEdit
                onClick={() => props.onEdit({ slug: props.slug, id: props.id })}
              />
            </div>
            <div className={style["controller"]}>
              <AiOutlineDelete onClick={() => props.onTourDelete(props.id)} />
            </div>
          </div>
        </div>
      )}
      {(authCtx.user.role !== "admin" || !props.managing) && (
        <StandardBtn
          type="button"
          onClick={() => navigate(`/tour/${props.slug}`)}
          className={style["controller"]}
        >
          Details
        </StandardBtn>
      )}
    </>
  );
}
