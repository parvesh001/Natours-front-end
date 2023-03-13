import React from "react";
import ReactDOM from "react-dom";
import style from "./Model.module.scss";

const BackdropShadow = () => {
  return <div className={style["backdrop"]}></div>;
};

const ModelContent = (props) => {
  return <div className={style["model-content"]}>{props.children}</div>;
};

const Model = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackdropShadow />,
        document.getElementById("model-root")
      )}
      {ReactDOM.createPortal(
        <ModelContent>{props.children}</ModelContent>,
        document.getElementById("model-root")
      )}
    </React.Fragment>
  );
};
export default Model;
