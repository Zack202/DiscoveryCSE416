import './App.css';
import React, { useState } from 'react';
import Leafletmap from './components/Leafletmap';
import  shp  from 'shpjs';

function App() {
  const [mapData, setMapData] = useState(null);
  const [validFileMessage, setValidFileMessage] = useState("Waiting for file")
  //console.log(validFileMessage)


  const correctTypes = ['application/kml', 'application/zip', 'application/json']

  const handleFileChange = async (event) => { // Handle file input, here is where to add other file types
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        //check if the file type is valid
        if(correctTypes.includes(selectedFile?.type)){
          setValidFileMessage("It is a valid file")
        } else { 
          setValidFileMessage("It is NOT a valid file")
        }     
        const fileContent = await selectedFile.text();
        console.log('selected file:', selectedFile);

        const fileType = selectedFile.name.substr(selectedFile.name.length-4, selectedFile.name.length);
        if(fileType === '.zip'){
          console.log('Is a zip');
    
          	//for the shapefiles in the folder called 'files' with the name pandr.shp
            
            // proof the package is installed correctly
            // await shp("C:/Users/camgr/Documents/Downloads/DEU_adm.zip").then(function(geojson){
            //});

            // var buffer = new ArrayBuffer(selectedFile.size); // not needed
            // const buffer = await selectedFile.arrayBuffer();

            await selectedFile.arrayBuffer().then(async function(buffer){
              console.log("arrayBuffer:", buffer);

              // SHP+buffer Direct
              /*
              const geojson = await shp(buffer);
              console.log("passed check");
              console.log('geojson', geojson);
              */
              
              // SHP+buffer then
              //await shp(buffer).then(function(geojson) {
              //  console.log('passed Test');
              //  console.log('geojson', geojson);
              //});     
              
              // SHP+file Direct
              /*
              const geojson = await shp(selectedFile);
              console.log("passed check");
              console.log('geojson', geojson);
              */
              
              // SHP+file then
              /*
              await shp(selectedFile).then(function(geojson) {
                console.log('passed Test');
                console.log('geojson', geojson);
              });  
              */

             });
            
            

            //await shp.getShapeFile(buffer).then(function(geojson){
              //see bellow for whats here this internally call shp.parseZip()
            // console.log('Passed check');
            // console.log('geojson:', geojson);
            //});
            console.log('Passed check');
            
            
        }
        console.log('passedCheck');


        // Parse JSON file
        const parsedData = JSON.parse(fileContent);
        setMapData(parsedData);
      } catch (error) {
        setValidFileMessage('Error with file', error);
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