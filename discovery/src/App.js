import './App.css';
import React, { useState, useEffect } from 'react';
import Leafletmap from './components/Leafletmap';
import * as tj from "@mapbox/togeojson";



function App() {
  const [mapData, setMapData] = useState(null);
  const [validFileMessage, setValidFileMessage] = useState("Waiting for file")
  var shapefile = require("shapefile");
  // console.log(validFileMessage)

  const correctTypes = ['kml','json','zip','shp'];

  const handleFileChange = async (event) => { // Handle file input, here is where to add other file types
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        
        const name = selectedFile.name;
        const lastDot = name.lastIndexOf(".");
        const ext = name.substring(lastDot + 1);

        if(correctTypes.includes(ext)){
          setValidFileMessage("It is a valid file")
        } else { 
          setValidFileMessage("It is NOT a valid file")
        }     
        const fileContent = await selectedFile.text();

        if(ext ==="kml"){
          console.log("kml was recognized");
          const xmldom = new DOMParser().parseFromString(fileContent, "text/xml"); // create xml dom object
          const kmlToGJ = tj.kml(xmldom); // convert xml dom to geojson
          setMapData(kmlToGJ);

        }
        else if(ext === "shp"){
          console.log("shp was recognized");
          await selectedFile.arrayBuffer().then(async function(buffer){ // convert to ArrayBuffer
            var feature = await shapefile.read(buffer); // convert buffer to geoJson
            setMapData(feature); // set to geoJson
          });
        }
        else{

        // Parse JSON file
        const parsedData = JSON.parse(fileContent);
        setMapData(parsedData);
        }
        
      } catch (error) {
        setValidFileMessage('Error with file', error);
        console.log(error);
      }
    }
  };


  return (
    <div className="App">
      <h1>Discovery Part 1</h1>
      <label htmlFor="mapfile">Choose a map file:</label><br></br>
      <input type="file" id="mapfile" name="mapfile" accept="" onChange={handleFileChange}/>
      <input type="button" value="Generate"></input>
      <h4>{validFileMessage}</h4>
      <div id="map">
      <Leafletmap file={mapData}/>
      </div>
      </div>
  );
}

export default App;