import { Box, Container } from "@mui/material";
import Search from "../Search";
import Main from "../Main";
import { useState, useEffect } from "react";
import { iconMapping, iconDefaults } from '../../constants';
import ReactAnimatedWeather from 'react-animated-weather';
import { DateTime } from 'luxon';
import { supabase } from "../../../utils/createClient";
import { grey,pink} from "@mui/material/colors";

const Layout = ({ region, setRegion, fetchWeather, currentWeather, currentForecast, searchedLocationWeather, searchedLocationForecast, mode,setMode, setSearchedLocationWeather, setSearchedLocationForecast}) => {

  const [bgImage, setBgImage] = useState(grey[400]);
  const [selectedCity, setSelectedCity] = useState("");
  const [locationID, setLocationID] = useState("");


  useEffect(() => {
    if (currentWeather && currentWeather.length) {
      setBgImage(pink[400]);
      }
  }, [currentWeather]);

  const handleCityClick = (city, cityID) => {
    setSelectedCity(city);
    setLocationID(cityID);
  };

  useEffect(() => {
    // console.log('Selected City in useEffect:', selectedCity);
    if (selectedCity && locationID) {
      getPresetWeather(selectedCity);
      getPresetForecast(locationID);
    }
  }, [selectedCity, locationID]);

  const getPresetWeather = async (selectedCity) => {
    try {
      const { data, error } = await supabase.from("preset_location").select().eq("region", selectedCity);
      if (error) {
        throw error;
      }
      // console.log('Data received from Supabase:', data);
      setSearchedLocationWeather(data);
      setMode('search');
    } catch (error) {
      console.error("Error fetching preset weather:", error);
    }
  };

  const getPresetForecast = async (locationID) => {
    try {
      const { data, error } = await supabase.from("preset_location_forecast").select().eq("location_id", locationID);
      if (error) {
        throw error;
      }
      // console.log('Data received from Supabase:', data);
      setSearchedLocationForecast(data);
      setMode('search');
    } catch (error) {
      console.error("Error fetching preset weather:", error);
    }
  };

  const forecastData = mode === "search" ? searchedLocationForecast : currentForecast;

  let previousDay = null;

  return (
    <>
      {/* <CssBaseline /> */}
      <Container sx={{ background: bgImage, minHeight: '100vh', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Search region={region} setRegion={setRegion} fetchWeather={fetchWeather} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>

            <Box sx={{ cursor: 'pointer' }} >
              <h4  onClick={() => handleCityClick('Tokyo', '1850144')}>Tokyo</h4>
            </Box>
            <Box sx={{ cursor: 'pointer' }} >
              <h4 onClick={() => handleCityClick('New York', '5128581')}>New York</h4>
            </Box>
            <Box sx={{ cursor: 'pointer' }} >
              <h4 onClick={() => handleCityClick('London', '2643743')}>London</h4>
            </Box >
            <Box sx={{ cursor: 'pointer' }}>
              <h4 onClick={() => handleCityClick('Paris', '2988507')}>Paris</h4>
            </Box>
          </Box>
        </Box>

        <Box sx={{ cursor: 'pointer' }} >
              <h4 onClick={() =>window.location.reload()}>📍CURRENT</h4>
            </Box >

        <Box p={2}>
          <Box height="25vh" mb={24} textAlign='center'>
            <Main 
              currentWeather={currentWeather} 
              searchedLocationWeather={searchedLocationWeather} 
              mode={mode} 
            />
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'none', overflowX: 'scroll' }}>
            {
              forecastData.map(forecast => {
                const currentDay = DateTime.fromISO(forecast.forecast_time).day;
                const shouldDisplayDay = currentDay !== previousDay;
                previousDay = currentDay;

                return (
                  <Box key={forecast.id} display="flex" sx={{ height: 200, width: 80, padding: 1, backgroundColor: "rgba(255,255,255,0.2)", alignItems: 'center', justifyContent: 'space-evenly', textAlign: 'center', flexDirection: 'column' }}>
                    {shouldDisplayDay ? (
                      <Box key={forecast.id} display="flex" sx={{ height: 20, width: 80, padding: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                        {currentDay}日
                      </Box>
                    ) :
                    <Box key={forecast.id} display="flex" sx={{ height: 20, width: 80, padding: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>

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
