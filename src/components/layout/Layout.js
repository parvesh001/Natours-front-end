import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
  return (
    <div>
      <Header />
      <main style={{paddingTop:'8rem', paddingBottom:'2rem'}}>{props.children}</main>
      <Footer/>
    </div>
  );
}
