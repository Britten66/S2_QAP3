// Loads the React engine so JSX works
import React from "react";

import { useState, useEffect } from "react";

// React builds the UI inside this function
function App() {
  // state memory here
  const [allCountries, setAllCountries] = useState([]);

  const [neighborsA, setNeighborsA] = useState([]);

  const [neighborsI, setNeighborsI] = useState([]);

  const [showA, setShowA] = useState(false);

  const [showI, setShowI] = useState(false);

  // This is where your page content goes inside return
  return (
    <>
      <h2> Semester 2 - QAP 3 - Christopher Britten</h2>

      <button
        onClick={() => {
          setShowA(true);
          setShowI(false);
        }}
      >
        {" "}
        Neighbor Countries Starting With A
      </button>

      <button
        onClick={() => {
          setShowI(true);
          setShowA(false);
        }}
      >
        Neighbor Countries Starting With I
      </button>
    </>
  );
}

export default App;

// Tells React -this is the component to show on the page
