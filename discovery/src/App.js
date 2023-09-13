import './App.css';
import React, { useState, useEffect } from 'react';
import Leafletmap from './components/Leafletmap';
import * as tj from "@mapbox/togeojson";
import { file } from '@babel/types';
const shp = require('shpjs');


function App() {
  const [mapData, setMapData] = useState(null);
  const [validFileMessage, setValidFileMessage] = useState("Waiting for file")
  const [ext, setExt] = useState("");
  //console.log(validFileMessage)

  const correctTypes = ['kml','json','zip'];

  const handleFileChange = async (event) => { // Handle file input, here is where to add other file types
    const selectedFile = event.target.files[0];


    if (selectedFile) {
      try {
        
        const name = selectedFile.name;
        const lastDot = name.lastIndexOf(".");
        const fileExt = name.substring(lastDot + 1);
        setExt(name.substring(lastDot + 1));

        if(correctTypes.includes(fileExt)){
          setValidFileMessage("It is a valid file")
        } else { 
          setValidFileMessage("It is NOT a valid file")
        }     
        const fileContent = await selectedFile.text();

        if(fileExt ==="kml"){
          console.log("kml was recognized");
          const xmldom = new DOMParser().parseFromString(fileContent, "text/xml"); // create xml dom object
          const kmlToGJ = tj.kml(xmldom); // convert xml dom to geojson
          setMapData(kmlToGJ);

        }else if(fileExt ==="zip"){
          var reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = function (buffer) {
            console.log("loading in progress", selectedFile.name)
            async function convert(data){
              console.log("converting to shp")
              const response = await shp(data);
              console.log("2nd step")
              setMapData(response);
            }
            
            convert(buffer.target.result);
          }
        }else{


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
      <label for="mapfile">Choose a map file:</label><br></br>
      <input type="file" id="mapfile" name="mapfile" accept="" onChange={handleFileChange}/>
      <h4>{validFileMessage}</h4>
      <div id="map">
      <Leafletmap file={mapData} ext={ext}/>
      </div>
      </div>
  );
}

export default App;