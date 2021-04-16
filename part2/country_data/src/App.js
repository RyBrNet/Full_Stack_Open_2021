import React, { useState, useEffect } from "react";
import axios from 'axios'
import CountryFilter from "./components/CountryFilter.js";
import DisplayCountries from "./components/DisplayCountries.js";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [detailedCountry, setDetailedCountry] = useState("");

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Country Finder</h2>
      <CountryFilter countryFilter={countryFilter} setCountryFilter={setCountryFilter} setDetailedCountry={setDetailedCountry} />

      <h3>Countries Found</h3>
      <DisplayCountries countries={countries} countryFilter={countryFilter} 
        detailedCountry={detailedCountry} setDetailedCountry={setDetailedCountry} />
    </div>
  );
};

export default App;
