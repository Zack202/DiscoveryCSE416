import logo from './logo.svg';
import './App.css';
import React from 'react';
import Leafletmap from './components/Leafletmap';

function App() {
  return (
    <div className="App">
      <h1>Discovery Part 1</h1>
      <label for="mapfile">Choose a map file:</label><br></br>
      <input type="file" id="mapfile" name="mapfile" accept=""/>
      <input type="button" value="Generate"></input>
      <h4>Is valid file</h4>
      <div id="map">
      <Leafletmap/>
      </div>
      </div>
  );
}

export default App;
