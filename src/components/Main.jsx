import { Box } from "@mui/material";
const Main = ({current_weather}) => {

   // データが存在するかどうかをチェック
   if (!current_weather || current_weather.length === 0) {
    return <p>No weather data available</p>;
  }

  // データが存在する場合のみアクセス
  const weatherData = current_weather[0];

  return (
    <>
      
      <p>{console.log(current_weather)}</p>
      <h1>{weatherData.region}</h1>
      <h2>{weatherData.main}</h2>
      <h1>
        <img src={`https://openweathermap.org/img/w/${weatherData.icon}.png`} alt="Weather Icon" />
      </h1>
      <h3>{weatherData.weather_description }</h3>
      <Box>
        
      </Box>
      
      {/* <p>{current_weather.map((current) => (
        current.region
      ))}</p> */}
    </>
  );
}

export default Main;
