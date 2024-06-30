import { Grid, Box, Container, CssBaseline } from "@mui/material";
import Search from "../Search";
import Main from "../Main";
import { useState, useEffect } from "react";

const Layout = ({ region, setRegion, fetchWeather, currentWeather, searchedLocationWeather }) => {

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
            <Main currentWeather={currentWeather} searchedLocationWeather={searchedLocationWeather} />
          </Box>

          <Grid container spacing={4} textAlign='center'>
            <Grid item xs={4}>
              <Box sx={{ height: 240, padding: 2, backgroundColor: "rgba(255,255,255,0.2)", color: 'white' }}>
                hourly
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ height: 240, padding: 2, backgroundColor: "rgba(255,255,255,0.2)", color: 'white' }}>
                週間天気
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Container>
    </>
  );
};

export default Layout;
