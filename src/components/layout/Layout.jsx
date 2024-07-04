import { Box, Container, CssBaseline } from "@mui/material";
import Search from "../Search";
import Main from "../Main";
import { useState, useEffect } from "react";
import { iconMapping, iconDefaults } from '../../constants';
import ReactAnimatedWeather from 'react-animated-weather';
import { DateTime } from 'luxon';

const Layout = ({ region, setRegion, fetchWeather, currentWeather, currentForecast, searchedLocationWeather, searchedLocationForecast, mode }) => {

  const [bgImage, setBgImage] = useState("black")
  

  useEffect(() => {
    if (currentWeather && currentWeather.length) {
      switch (currentWeather[0].main) {
        case "Rain":
          setBgImage("#ff0000");
          break;
        case "Clouds":
          setBgImage("#0000ff");
          break;
        default:
          setBgImage("#0000ff");
      }
    }

    console.log(forecastData.map(forecast =>
      [forecast.forecast_time, DateTime.fromISO(forecast.forecast_time).hour, DateTime.fromISO(forecast.forecast_time).month, DateTime.fromISO(forecast.forecast_time).day]
    ))
  }, [currentWeather, searchedLocationForecast])



  const forecastData = mode === "search" ? searchedLocationForecast : currentForecast;

  let previousDay = null;


  return (
    <>
      <CssBaseline />
      <Container sx={{ background: bgImage, minHeight: '100vh', padding: 2 }}>
        <Box sx={{ display:'flex',justifyContent: 'space-between' }}>
          <Search region={region} setRegion={setRegion} fetchWeather={fetchWeather} />
          <Box sx={{  display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <h4>Tokyo</h4> <h4>Fukuoka</h4> <h4>Omuta</h4>
          </Box>
        </Box>
        <Box p={2} color="white">
          <Box height="25vh" mb={24} textAlign='center'>
            <Main currentWeather={currentWeather} searchedLocationWeather={searchedLocationWeather} mode={mode} />
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'none', overflowX: 'scroll' }}>
            {
              forecastData.map(forecast => {
                const currentDay = DateTime.fromISO(forecast.forecast_time).day;
                const shouldDisplayDay = currentDay !== previousDay;
                previousDay = currentDay;

                return (
                  <Box key={forecast.id} display="flex" sx={{ height: 200, width: 80, padding: 1, backgroundColor: "rgba(255,255,255,0.2)", color: 'white', alignItems: 'center', justifyContent: 'space-evenly', textAlign: 'center', flexDirection: 'column' }}>
                    {shouldDisplayDay ? (
                      <Box key={forecast.id} display="flex" sx={{ height: 20, width: 80, padding: 2, color: 'white', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                        {currentDay}日
                      </Box>
                    ) :
                    <Box key={forecast.id} display="flex" sx={{ height: 20, width: 80, padding: 2, color: 'white', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>

                  </Box>
}
                    {DateTime.fromISO(forecast.forecast_time).hour}
                    <ReactAnimatedWeather
                      icon={iconMapping[forecast.icon] ?? 'CLEAR_DAY'}
                      color={iconDefaults.color}
                      size={30}
                      animate={iconDefaults.animate}
                    /><br />
                    {Math.round(forecast.min_temp)}℃
                    <br />
                  </Box>
                );
              })
            }
          </Box>

        </Box>
      </Container>
    </>
  );
};

export default Layout;
