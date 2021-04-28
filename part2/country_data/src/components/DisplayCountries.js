import React, { useEffect } from "react";
import axios from "axios";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const DisplayCountryName = ({ country, setDetailedCountry }) => {
  return (
    <li>
      {country.name}{" "}
      <Button
        handleClick={() => setDetailedCountry(country)}
        text="Show Details"
      />
    </li>
  );
};

const DisplayLanguageName = ({ language }) => {
  return <li>{language.name}</li>;
};

const DisplayDetailedCountry = ({ country, weatherData, setWeatherData }) => {
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => {
        setWeatherData(response.data);
        console.log(weatherData);
      });
  }, [api_key, country.capital]);

  console.log(weatherData);
  if (weatherData.length !== 0) {
    return (
      <div>
        <h3>{country.name}</h3>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <div>Top Languages</div>
        <ul>
          {country.languages.map((language) => (
            <DisplayLanguageName key={language.name} language={language} />
          ))}
        </ul>
        <img src={country.flag} alt="Flag of individual country found"></img>
        <h4>Weather in {country.name}</h4>
        <div>Temperature: {weatherData.current.temperature}(c)</div>
        <img
          src={weatherData.current.weather_icons[0]}
          alt="Weather Icon"
        ></img>
        <div>
          Wind: {weatherData.current.wind_speed}
          {weatherData.current.wind_dir}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h3>{country.name}</h3>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <div>Top Languages</div>
        <ul>
          {country.languages.map((language) => (
            <DisplayLanguageName key={language.name} language={language} />
          ))}
        </ul>
        <img src={country.flag} alt="Flag of individual country found"></img>
      </div>
    );
  }
};

const DisplayMultipleCountries = ({ countries, setDetailedCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <DisplayCountryName
          key={country.name}
          country={country}
          setDetailedCountry={setDetailedCountry}
        />
      ))}
    </ul>
  );
};

const DisplayCountries = ({
  countries,
  countryFilter,
  detailedCountry,
  setDetailedCountry,
  weatherData,
  setWeatherData,
}) => {
  const countriesToShow =
    countryFilter === ""
      ? countries
      : countries.filter((element) =>
          element.name.toLowerCase().includes(countryFilter.toLowerCase())
        );

  if (detailedCountry !== "") {
    //Details of a specific country requested
    return (
      <DisplayDetailedCountry
        country={detailedCountry}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
    );
  } else if (countriesToShow.length > 10) {
    // More than ten matches so ask for a more detailed filter
    return <div>Too many matches, specify another filter</div>;
  } else if (countriesToShow.length === 1) {
    // Single country matched, display detailed info
    return (
      <DisplayDetailedCountry
        country={countriesToShow[0]}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
    );
  } else {
    // 2 to 10 Countries matched. Display their names with a button next to them for detailed info
    return (
      <DisplayMultipleCountries
        countries={countriesToShow}
        setDetailedCountry={setDetailedCountry}
      />
    );
  }
};

export default DisplayCountries;
