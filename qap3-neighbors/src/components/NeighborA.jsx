function NeighborsA({ countries }) {
  return (
    <div>
      {/* Main heading for the country filter section */}
      <h2>Filter Neighboring Countries Via Border</h2>

      {/* Loop through each country in the countries array and render its details */}
      {countries.map((country, index) => (
        <div key={index}>
          {/* Display country name - tries common name first, falls back to official name */}
          <h4>{country.name?.common || country.name?.official}</h4>

          {/* Display capital city - uses first capital from array, shows "N/A" if none exists */}
          <p>Capital: {country.capital?.[0] || "N/A"}</p>

          {/* Display country flag - tries PNG format first, falls back to SVG */}
          <img
            src={country.flags?.png || country.flags?.svg}
            alt="flag"
            width="100"
          />

          {/* Display neighboring countries by border codes - joins array with commas, shows "None" if no borders */}
          <p>Neighbors: {country.borders?.join(",") || "None"}</p>
        </div>
      ))}
    </div>
  );
}

export default NeighborsA;
