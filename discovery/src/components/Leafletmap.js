import React, { Component, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css"
import { MapContainer, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "./Leafletmap.css"

function Leafletmap(props) {
  const { file } = props;

  const geoJSONKey = JSON.stringify(file);

  const countryStyle = {
    fillColor: "maroon",
    fillOpacity: 1,
    color: "black",
    weight: 2
  };


  return (
    <div>
      <MapContainer key = {geoJSONKey} style={{height: "80vh"}} center={[20,100]} zoom={2}>
        <GeoJSON style = {countryStyle} data={file}/>
      </MapContainer>
    </div>
  );
}

export default Leafletmap;