// Importing the components I created for displaying the filtered lists
import MapView from "./components/MapView";

import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Storing the full set of countries returned from the API

  const [allCountries, setAllCountries] = useState([]);

  // These hold the two filtered groups:
  const [neighborsA, setNeighborsA] = useState([]);

  const [neighborsI, setNeighborsI] = useState([]);

  // These track which list should be shown on screen
  const [showA, setShowA] = useState(false);
  const [showI, setShowI] = useState(false);

  // Stores whichever country should be focused/displayed first in the map view
  const [currentCountry, setCurrentCountry] = useState(null);

  // Fetching all the country data

  // I only want this to run once when the app loads, so the dependency array is empty.
  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,borders,cca3,languages,currencies"
    )
      .then((res) => res.json())
      .then((data) => {
        // Saving the full dataset so I can filter from it
        setAllCountries(data);

        // ------------------------------
        // Filtering for countries that have
        // a neighbor whose name starts with A
        // ------------------------------
        const filteredResultA = data.filter((country) => {
          // Countries with no borders can't be checked
          if (!country.borders) return false;

          // Look through each border code and try to match it to a country
          return country.borders.some((borderCode) => {
            const neighbor = data.find((c) => c.cca3 === borderCode);
            // Only keep if the neighbor exists + starts with "A"
            return neighbor?.name.common.startsWith("A");
          });
        });
        setNeighborsA(filteredResultA);

        // ------------------------------
        // Same filtering logic as above,
        // but checking for neighbors starting with I
        // ------------------------------
        const filteredResultI = data.filter((country) => {
          if (!country.borders) return false;
          return country.borders.some((borderCode) => {
            const neighbor = data.find((c) => c.cca3 === borderCode);
            return neighbor?.name.common.startsWith("I");
          });
        });
        setNeighborsI(filteredResultI);
      })

      // Basic error logging and handling if something goes wrong .. it always does ..
      .catch((error) => console.error("Error:", error));
  }, []);

  // Deciding which set should currently be displayed
  const activeCountries = showA ? neighborsA : showI ? neighborsI : [];

  // Whenever the selected list changes, set a default country
  useEffect(() => {
    if (activeCountries.length > 0) {
      // Pick the first country in the filtered list
      setCurrentCountry(activeCountries[0]);
    } else {
      // Clear when nothing is selected
      setCurrentCountry(null);
    }
  }, [activeCountries]);

  // QAP Header displaying here

  return (
    <>
      <div className="container">
        <div className="headerText">
          <h2>Semester 2 - QAP 3 - Christopher Britten</h2>
        </div>
        <div className="countryBtn">
          <button
            onClick={() => {
              // When A is shown, I must be hidden
              setShowA(true);
              setShowI(false);
            }}
          >
            Neighbor Countries Starting With A
          </button>

          <button
            onClick={() => {
              // When I is shown, A must be hidden
              setShowI(true);
              setShowA(false);
            }}
          >
            Neighbor Countries Starting With I
          </button>
        </div>
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
