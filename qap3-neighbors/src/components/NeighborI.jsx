function NeighborsI({ countries }) {
  return (
    <div>
      <h2>Filter Neighboring Countries Via Border</h2>

      {countries.map((country, index) => (
        <div key={index}>
          <h4>{country.name?.common || country.name?.official}</h4>

          <p>Capital: {country.capital?.[0] || "N/A"}</p>

          <img
            src={country.flags?.png || country.flags?.svg}
            alt="flag"
            width="100"
          />

          <p>Neighbors: {country.borders?.join(", ") || "None"}</p>
        </div>
      ))}
    </div>
  );
}
export default NeighborsI;
