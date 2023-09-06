import React, { useEffect } from 'react';
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer} from 'react-leaflet'

function Leafletmap() {
  return (
    <MapContainer center={[48.8566,2.3522]} zoom= {13}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
  );
}

export default Leafletmap;