import React, { useEffect, useState } from "react";

interface WeatherForcast {
  date: string;
  temperature: string;
  description: string;
  icon: string;
}

const europeCities = [
  "Amsterdam",
  "Rotterdam",
  "Utrecht",
  "The Hague",
  "London",
  "Paris",
  "Berlin",
  "Madrid",
  "Rome",
  "Padua",
  "Lisbon",
  "Vienna",
  "Prague",
  "Budapest",
];

export const WeatherForecastComponent = () => {
  const [weatherForecast, setWeatherForecast] = useState<
    WeatherForcast[] | null
  >(null);

  const [city, setCity] = useState("Amsterdam");
  //   const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const apiKey = "ed6d09a07fc3de424a6e6ccea1879fec";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=60`;

    function timeConverter(UNIX_timestamp: number) {
      var a = new Date(UNIX_timestamp * 1000);
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var time = date + " " + month + " " + year;
      return time;
    }

    const fetchWeather = async () => {
      try {
        const response = await fetch(apiUrl);
        console.log("fetch data", response);
        const data = await response.json();
        console.log("json data", data);

        const weatherForcastData: WeatherForcast[] = [];
        let currentDate = ""; // To keep track of the current date

        data.list.forEach((item: any) => {
          const forecastDate = timeConverter(item.dt);

          if (forecastDate !== currentDate) {
            weatherForcastData.push({
              date: timeConverter(item.dt),
              temperature: item.main.temp,
              //   17 > now && now > 6 ? item.main.temp.day : item.main.temp.night,
              description: item.weather[0].description,
              icon: item.weather[0].icon,
            });
            currentDate = forecastDate;
          }
        });

        setWeatherForecast(weatherForcastData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchWeather();
  }, [city]);

  return (
    <div>
      <h2>{city}</h2>
      <select
        placeholder="Select different city.."
        onChange={(e) => setCity(e.target.value)}
      >
        <option value={""}>--- Select a City ---</option>
        {europeCities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div id="weather-forecast-data">
        {weatherForecast?.length ? (
          <div className="weather-container">
            {weatherForecast.map((forecast, index) => (
              <div key={index}>
                <p>{forecast.date}</p>
                <p>Avg Temp: {Math.floor(Number(forecast.temperature))}°C</p>
                <p>Description: {forecast.description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                  alt="weather-icon"
                ></img>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading forecast data for {city}</p>
        )}
      </div>
    </div>
  );
};
