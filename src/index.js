import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import AppBar from "./components/AppBar";
import BarWeightsPage from "./components/bar-weights/BarWeights";

function App() {
  return (
    <div className="App">
      <AppBar />
      <BarWeightsPage />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
