import React from "react";
import Tours from "../../components/tour/tours/Tours";
import Hero from "../../components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Tours managing={false} className="home-tours" />
    </>
  );
}
