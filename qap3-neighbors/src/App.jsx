// Loads the React engine so JSX works
import NeighborsA from "./components/NeighborA";
import NeighborsI from "./components/NeighborI";

import "./app.css";
import { useState, useEffect } from "react";

// React builds the UI inside this function
function App() {
  // state memory here
  const [allCountries, setAllCountries] = useState([]);

  const [neighborsA, setNeighborsA] = useState([]);

  const [neighborsI, setNeighborsI] = useState([]);

  const [showA, setShowA] = useState(false);

  const [showI, setShowI] = useState(false);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3"
    )
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(data);

        // kept that [] empty as to not loop infinitly

        // filtering main array that will be poulated

        // this is done by making a const of final result

        const filteredResultA = data.filter((country) => {
          if (!country.borders) return false;
          return country.borders.some((borderCode) => {
            const neighbor = data.find((c) => c.cca3 === borderCode);
            return neighbor?.name.common.startsWith("A");
          });
        });
        setNeighborsA(filteredResultA);

        const filteredResultI = data.filter((country) => {
          if (!country.borders) return false;
          return country.borders.some((borderCode) => {
            const neighbor = data.find((c) => c.cca3 === borderCode);
            return neighbor?.name.common.startsWith("I");
          });
        });
        setNeighborsI(filteredResultI);
      })

      .catch((error) => console.error("Error:", error));
  }, []);
  // This is where your page content goes inside return

  return (
    <>
      <div className="container">
        <div className="headerText">
          <h2> Semester 2 - QAP 3 - Christopher Britten</h2>
        </div>
        <div className="countryBtn">
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
        </div>{" "}
        {/* closing countryBtn */}
        {showA && <NeighborsA countries={neighborsA} />}
        {showI && <NeighborsI countries={neighborsI} />}
      </div>{" "}
      {/* closing container */}
    </>
  );
}

export default App;

// Tells React -this is the component to show on the page
