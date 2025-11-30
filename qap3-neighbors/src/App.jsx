// Loads the React engine so JSX works
import NeighborsA from "./components/NeighborA";
import NeighborsI from "./components/NeighborI";
import mapBackground from "./images/mapbackground.png";
import MapView from "./components/MapView";

import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [neighborsA, setNeighborsA] = useState([]);
  const [neighborsI, setNeighborsI] = useState([]);
  const [showA, setShowA] = useState(false);
  const [showI, setShowI] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(null);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3,languages,currencies"
    )
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(data);

        // Filtering A here
        const filteredResultA = data.filter((country) => {
          if (!country.borders) return false;
          return country.borders.some((borderCode) => {
            const neighbor = data.find((c) => c.cca3 === borderCode);
            return neighbor?.name.common.startsWith("A");
          });
        });
        setNeighborsA(filteredResultA);

        // Filtering I here
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

  const activeCountries = showA ? neighborsA : showI ? neighborsI : [];

  useEffect(() => {
    if (activeCountries.length > 0) {
      setCurrentCountry(activeCountries[0]);
    } else {
      setCurrentCountry(null);
    }
  }, [activeCountries]);

  return (
    <>
      <div className="container">
        <div className="headerText">
          <h2>Semester 2 - QAP 3 - Christopher Britten</h2>
        </div>

        <div className="countryBtn">
          <button
            onClick={() => {
              setShowA(true);
              setShowI(false);
            }}
          >
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
        </div>
        {/* added this so the text disapears when button selected */}
        {!showA && !showI && (
          <div className="enter-text">
            <h3>Select Filtering Option Above & the info will display!</h3>
          </div>
        )}
        <div className="contentLayout">
          {activeCountries.length > 0 && (
            <MapView countries={activeCountries} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
