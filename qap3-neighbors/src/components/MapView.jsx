// using state + effect here
import { useState, useEffect } from "react";

// this shows a little map viewer for whatever countries get passed in
function MapView({ countries }) {
  // keeping track of which country I'm looking at
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // whenever the list changes, reset back to the first one
    setIndex(0);
  }, [countries]);

  // if nothing is passed in, don't show anything
  if (!countries || countries.length === 0) return null;

  // grab the country I'm currently on
  const current = countries[index];

  // cleaning up the name so Google Maps link works
  const query = encodeURIComponent(current.name.common);

  // go forward (loops around)
  const next = () => {
    setIndex((prev) => (prev + 1) % countries.length);
  };

  // go backwards (also loops)
  const prev = () => {
    setIndex((prev) => (prev - 1 + countries.length) % countries.length);
  };

  return (
    <div className="viewMap">
      <h3>
        Country {index + 1} of {countries.length}: {current.name.common}
      </h3>

      <div className="viewMap-button">
        <button onClick={prev}>Previous</button>
        <button onClick={next}>Next</button>
      </div>

      <div className="viewMap-top">
        <div className="viewMap-flag">
          <img
            src={current.flags?.png || current.flags?.svg}
            alt={`${current.name.common} flag`}
          />

          <div className="side-info">
            <h4>Country Facts</h4>

            {current.capital && (
              <p>
                <strong>Capital:</strong> {current.capital[0]}
              </p>
            )}

            <p>
              <strong>Neighboring Countries:</strong>{" "}
              {current.borders?.length || 0}
            </p>

            {current.borders?.length > 0 && (
              <p>
                <strong>Sharing Border: {current.borders.join(", ")}</strong>
              </p>
            )}

            {current.languages && Object.keys(current.languages).length > 0 && (
              <p>
                <strong>Languages:</strong>{" "}
                {Object.values(current.languages).filter(Boolean).join(", ")}
              </p>
            )}

            {current.currencies &&
              Object.keys(current.currencies).length > 0 && (
                <p>
                  <strong>Currency:</strong>{" "}
                  {Object.values(current.currencies)
                    .filter((c) => c && c.name)
                    .map((c) => c.name)
                    .filter(Boolean)
                    .join(", ") || "N/A"}
                </p>
              )}
          </div>
        </div>

        <div className="viewMap-content">
          <div className="viewMap-frame">
            <iframe
              title={current.name.common}
              src={`https://www.google.com/maps?q=${query}&output=embed`}
              style={{ width: "100%", height: "350px", border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;
