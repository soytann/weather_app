import { useEffect } from "react";
import { Box } from "@mui/material";
const Main = ({currentWeather,searchedLocationWeather}) => {
  useEffect(() => {
    console.log("currentWeather in Main:", currentWeather);
    console.log("searchedLocationWeather in Main:", searchedLocationWeather);
  }, [currentWeather, searchedLocationWeather]);

   // データが存在するかどうかをチェック
   if (!currentWeather || currentWeather.length === 0) {
    return <p>No weather data available</p>;
  }
   if (!searchedLocationWeather || searchedLocationWeather.length === 0) {
    return <p>No weather data available</p>;
  }

  // データが存在する場合のみアクセス
  console.log(searchedLocationWeather)

  const weatherData = currentWeather[0];
  const lastItem = (searchedLocationWeather.length )- 1
  const searchedWeatherData = searchedLocationWeather[lastItem];
  console.log(searchedWeatherData)
  console.log(searchedLocationWeather.length)

  return (
    <>
      <p>{console.log(weatherData)}</p>
      <h1>{searchedWeatherData.region}</h1>
      <h2>{searchedWeatherData.main}</h2>
      <h1>
        <img src={`https://openweathermap.org/img/w/${searchedWeatherData.icon}.png`} alt="Weather Icon" />
      </h1>
      <h3>{searchedWeatherData.weather_description }</h3>
      <Box>
        
      </Box>
      
      {/* <p>{current_weather.map((current) => (
        current.region
      ))}</p> */}
    </>
  );
}

export default Main;
