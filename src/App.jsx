import { useEffect, useState } from "react";
import { supabase } from "../utils/createClient";
import Main from "./components/Main";
import Layout from "./components/layout/Layout";
import { Box, Grid, Paper, Container } from "@mui/material";
import Search from "./components/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider,CssBaseline } from '@mui/material';

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

function App() {
  const [current_weather, setCurrent_weather] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState();
  const [currentLongitude, setCurrentLongitude] = useState();
  const [currentRegion, setCurrentRegion] = useState();
  const [region, setRegion] = useState(''); //Searchから

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#72c1bb',
      },
      secondary: {
        main: '#f50057',
      },

      text: {
        primary: '#ffffff',
        secondary: 'rgba(131,234,231,0.6)',
        disabled: 'rgba(65,103,239,0.38)',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: 'linear-gradient(to right, #a85a07, #bf430b)',
            color: '#ffffff',
          },
        },
      },
    },
  });

  useEffect(() => {
    getWeather();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error("No Geolocation");
    }
  }, []);

  async function getWeather() {
    const { data } = await supabase.from("current_weather").select();
    setCurrent_weather(data);
    console.log(data);
    console.log(current_weather)
  }

  async function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCurrentLatitude(latitude);
    setCurrentLongitude(longitude);
    console.log(latitude, longitude);
    fetchRegion(latitude, longitude);
  }

  function errorCallback(error) {
    console.error(error);
  }

  async function fetchRegion(latitude, longitude) {
    fetch('https://fugcodmjyhkkdknlywko.supabase.co/functions/v1/fetch-region', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({ latitude, longitude }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.Feature[0].Property.Address);
        setCurrentRegion(data.Feature[0].Property.Address);
      })
      .catch(error => console.error('Error:', error));
  }
  async function fetchWeather(region) {
    try {
      const response = await fetch('http://localhost:5678/form/93ff03d5-d36c-49ea-aedf-9530948e6e01', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ region }),
      });

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }


  return (
    <>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Layout region={region} setRegion={setRegion} fetchWeather={fetchWeather} current_weather={current_weather} >
                <Main />
              </Layout>} />
            {/* <ul>
                    {current_weather.map((weather) => (
                      <li key={weather.id}>
                        {weather.region} - {weather.temperature}°C -
                        <img src={weather.icon} alt="weather icon" onError={(e) => e.target.style.display='none'} />
                      </li>
                    ))}
                  </ul>
                  <p>Latitude: {currentLatitude}</p>
                  <p>Longitude: {currentLongitude}</p>
                  <p>Region: {currentRegion}</p> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
