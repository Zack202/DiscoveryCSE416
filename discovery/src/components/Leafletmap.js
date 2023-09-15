import React, { Component, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css"
import { MapContainer, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "./Leafletmap.css"

function Leafletmap(props) {
  if(props.file == null){
    return null;
  }
  const file = props.file;
  const fileType = props.ext;
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
        <GeoJSON style = {countryStyle} data={file}
        onEachFeature={(feature, layer) => {
          if(fileType === "zip"){
            console.log("zip")
            if (feature.properties && feature.properties.NAME_1) {
              layer.bindTooltip(feature.properties.NAME_1, { permanent: true });
            }
          }else{
            if (feature.properties && feature.properties.name) {
              layer.bindTooltip(feature.properties.name, { permanent: true });
            }
          }
        }}/>
      </MapContainer>
    </div>
  );
}

export default Leafletmap;