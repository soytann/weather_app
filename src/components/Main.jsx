import { useEffect } from "react";
import { Box } from "@mui/material";
import ReactAnimatedWeather from 'react-animated-weather';

const Main = ({ currentWeather, searchedLocationWeather }) => {

  const iconMapping = {
    '01d': 'CLEAR_DAY',
    '01n': 'CLEAR_NIGHT',
    '02d': 'PARTLY_CLOUDY_DAY',
    '02n': 'PARTLY_CLOUDY_NIGHT',
    '03d': 'CLOUDY',
    '03n': 'CLOUDY',
    '04d': 'CLOUDY',
    '04n': 'CLOUDY',
    '09d': 'RAIN',
    '09n': 'RAIN',
    '10d': 'RAIN',
    '10n': 'RAIN',
    '11d': 'RAIN',
    '11n': 'RAIN',
    '13d': 'SNOW',
    '13n': 'SNOW',
    '50d': 'FOG',
    '50n': 'FOG',
  };

  // ReactAnimatedWeatherのデフォルト設定
  const defaults = {
    color: 'goldenrod',
    size: 80,
    animate: true
  };
  
  
  // データが存在するかどうかをチェック
  if (!currentWeather || currentWeather.length === 0) {
    return <p>No weather data available</p>;
  }
  if (!searchedLocationWeather || searchedLocationWeather.length === 0) {
    return <p>No weather data available</p>;
  }
  
  // データが存在する場合のみアクセス
  
  const weatherData = currentWeather[0];
  const searchedWeatherData = searchedLocationWeather[0];
  console.log(searchedWeatherData)
  console.log(searchedLocationWeather.length)
  
  const animatedIcon = iconMapping[searchedWeatherData.icon] || 'CLEAR_DAY';
  return (
    <>
      <p>{console.log(weatherData)}</p>
      <h1>{searchedWeatherData.region}</h1>
      <ReactAnimatedWeather
        icon={animatedIcon}
        color={defaults.color}
        size={defaults.size}
        animate={defaults.animate}
      /><br />
      <h3>{searchedWeatherData.weather_description}</h3>
      <Box>

      </Box>

      {/* <p>{current_weather.map((current) => (
        current.region
      ))}</p> */}
    </>
  );
}

export default Main;
