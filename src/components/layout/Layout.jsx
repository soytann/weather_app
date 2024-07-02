import { Grid, Box, Container, CssBaseline } from "@mui/material";
import Search from "../Search";
import Main from "../Main";
import { useState, useEffect } from "react";
import { iconMapping, iconDefaults } from '../../constants'
import ReactAnimatedWeather from 'react-animated-weather';
import { DateTime } from 'luxon'

const Layout = ({ region, setRegion, fetchWeather, currentWeather, currentForecast, searchedLocationWeather, searchedLocationForecast, mode }) => {

  const [bgImage, setBgImage] = useState("black")

  useEffect(() => {
    if (currentWeather && currentWeather.length) {
      switch (currentWeather[0].main) {
        case "Rain":
          setBgImage("#ff0000");
          break;
        case "Clouds":
          setBgImage("#00ff00");
          break;
        default:
          setBgImage("#0000ff");
      }
    }

  }, [currentWeather])

  return (
    <>
      <CssBaseline />
      <Container sx={{ background: bgImage, minHeight: '100vh', padding: 2 }}>
        <Search region={region} setRegion={setRegion} fetchWeather={fetchWeather} />
        <Box bgcolor="transparent" p={2} flexGrow={1} color="white">
          <Box height="25vh" mb={24} textAlign='center'>
            <Main currentWeather={currentWeather} searchedLocationWeather={searchedLocationWeather} mode={mode} />
          </Box>

          <Grid container spacing={4} textAlign='center'>
            {
              searchedLocationForecast.map(forecast =>
                <Grid item key={forecast.id} xs={4}>
                  <Box sx={{ height: 240, padding: 2, backgroundColor: "rgba(255,255,255,0.2)", color: 'white' }}>

                    <ReactAnimatedWeather
                      icon={iconMapping[forecast.icon] ?? 'CLEAR_DAY'}
                      color={iconDefaults.color}
                      size={30}
                      animate={iconDefaults.animate}
                    /><br />
                    {forecast.main}<br />
                    {forecast.max_temp}℃
                    <br />
                    {
                      DateTime.fromISO(forecast.forecast_time).toRelative({ unit: 'hour' })
                    }
                  </Box>
                </Grid>

              )
            }
          </Grid>

        </Box>
      </Container>
    </>
  );
};

export default Layout;
