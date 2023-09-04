import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Discovery Part 1</h1>
      <label for="map">Choose a map file:</label><br></br>
      <input type="file" id="map" name="map" accept=""/>
      <h4>Is valid file</h4>
      <div class="file-upload">MAP HERE</div>
    </div>
  );
}

export default App;
