import React, { useState } from "react";
import Map from "react-map-gl";

export default function TourOverviewMap() {
  const [viewState, setViewState] = useState({
    latitude: 37.743341,
    longitude: -122.447747,
    zoom: 10,
    height: "40vh",
    width: "100%",
  });

  return (
    <Map
      {...viewState}
      onMove={(viewPort) => {
        setViewState(viewPort.viewState);
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/vparv/clf3k1oxn000101ntjbuoi21d"
      style={{
        height: "60vh",
        width: "100%",
        transform: "skewY(-6deg)",
        transformOrigin: "bottom left",
      }}
    ></Map>
  );
}
