import React from "react";
import ReactDOM from "react-dom";
import style from "./FormModel.module.scss";

const FormModelBackdropShadow = (props) => {
  return <div className={style["backdrop"]} onClick={props.onClose}></div>;
};

const FormModelContent = (props) => {
  return <div className={style["model-content"]}>{props.children}</div>;
};

const FormModel = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <FormModelBackdropShadow onClose={props.onClose}/>,
        document.getElementById("form-model-root")
      )}
      {ReactDOM.createPortal(
        <FormModelContent>{props.children}</FormModelContent>,
        document.getElementById("form-model-root")
      )}
    </React.Fragment>
  );
};
export default FormModel;
