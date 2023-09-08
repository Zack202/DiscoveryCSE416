import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Leafletmap from './components/Leafletmap';


function App() {
  const [mapData, setMapData] = useState(null);
  const [validFileMessage, setValidFileMessage] = useState("Waiting for file")
  //console.log(validFileMessage)


  const correctTypes = ['application/kml', 'application/zip', 'application/json']

  const handleFileChange = async (event) => { // Handle file input, here is where to add other file types
     setSelectedFile(event.target.files[0]);

    if (selectedFile) {
      try {
        if(correctTypes.includes(selectedFile?.type)){
          setValidFileMessage("It is a valid file")
      } else { 
          setValidFileMessage("It is NOT a valid file")
          
      }    
        const fileContent = await selectedFile.text();
        // Parse JSON file
        const parsedData = JSON.parse(fileContent);
        setMapData(parsedData);

      } catch (error) {
        console.log('Error with file', error);
      }
    }
  };

  //refreshes the screen to update the correct file message
  useEffect(() => {
    if(correctTypes.includes(selectedFile?.type)){
        setValidFileMessage("It is a valid file")
    } else { 
        setValidFileMessage("It is NOT a valid file")
    }      
}, [handleFileChange])


  return (
    <div className="App">
      <h1>Discovery Part 1</h1>
      <label for="mapfile">Choose a map file:</label><br></br>
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