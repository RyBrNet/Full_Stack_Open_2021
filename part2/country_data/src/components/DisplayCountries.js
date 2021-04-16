import React from "react";

const Button = ({handleClick, text}) => (
  <button 
    onClick={handleClick}>
    {text}
  </button>
)

const DisplayCountryName = ({ country, setDetailedCountry }) => {
  return (
    <li>
      {country.name} <Button handleClick={() => setDetailedCountry(country)} text="Show Details" />
    </li>
  )
};

const DisplayLanguageName = ({ language }) => {
  return (
    <li>
      {language.name}
    </li>
  )
};

const DisplayDetailedCountry = ({ country }) => {
  return (
    <div>
      <h3>
        {country.name}
      </h3>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <div>Top Languages</div>
      <ul>
        {
          country.languages.map((language) => (
            <DisplayLanguageName key={language.name} language={language} />))
        }
      </ul>
      <img src={country.flag} alt='Flag of individual country found'></img>
    </div>
  )
};

const DisplayMultipleCountries = ({ countries, setDetailedCountry }) => {
  return (
    <ul>
        { 
          countries.map((country) => (
            <DisplayCountryName key={country.name} country={country} setDetailedCountry={setDetailedCountry} />))
        }
    </ul>
  )
};

const DisplayCountries = ({ countries, countryFilter, detailedCountry, setDetailedCountry }) => {
  const countriesToShow =
  countryFilter === ""
      ? countries
      : countries.filter((element) =>
          element.name.toLowerCase().includes(countryFilter.toLowerCase())
        );

  if(detailedCountry !== '') {
    //Details of a specific country requested
    return <DisplayDetailedCountry country={detailedCountry}/>

  } else if (countriesToShow.length > 10) {
    // More than ten matches so ask for a more detailed filter
    return <div>Too many matches, specify another filter</div>

  } else if (countriesToShow.length === 1) {
    // Single country matched, display detailed info
    return <DisplayDetailedCountry country={countriesToShow[0]}/>

  } else {
    // 2 to 10 Countries matched. Display their names with a button next to them for detailed info
    return <DisplayMultipleCountries countries={countriesToShow} setDetailedCountry={setDetailedCountry} />

  }
};

export default DisplayCountries;
