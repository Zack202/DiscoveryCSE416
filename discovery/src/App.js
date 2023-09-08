import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Leafletmap from './components/Leafletmap';

function App() {
  const [mapData, setMapData] = useState(null);

  const handleFileChange = async (event) => { // Handle file input, here is where to add other file types
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        const fileContent = await selectedFile.text();
        // Parse JSON file
        const parsedData = JSON.parse(fileContent);
        setMapData(parsedData);
      } catch (error) {
        console.log('Error with file', error);
      }
    }
  };


  return (
    <div className="App">
      <h1>Discovery Part 1</h1>
      <label for="mapfile">Choose a map file:</label><br></br>
      <input type="file" id="mapfile" name="mapfile" accept="" onChange={handleFileChange}/>
      <input type="button" value="Generate"></input>
      <h4>Is valid file</h4>
      <div id="map">
      <Leafletmap file={mapData}/>
      </div>
      </div>
  );
}

export default App;
