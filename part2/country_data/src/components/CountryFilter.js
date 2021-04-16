import React from "react";

const CountryFilter = ({ countryFilter, setCountryFilter, setDetailedCountry }) => {
  const handleCountryFilter = (event) => {
    setCountryFilter(event.target.value);
    setDetailedCountry('')
  };

  return (
    <div>
      Country Name: <input value={countryFilter} onChange={handleCountryFilter} />
    </div>
  );
};

export default CountryFilter;