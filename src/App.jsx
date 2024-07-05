import { useEffect, useState, useCallback } from "react";
import { supabase } from "../utils/createClient";
import Main from "./components/Main";
import Layout from "./components/layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import ReactAnimatedWeather from 'react-animated-weather';

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

function App() {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [currentForecast, setCurrentForecast] = useState([]);
  const [searchedLocationWeather, setSearchedLocationWeather] = useState([]);
  const [searchedLocationForecast, setSearchedLocationForecast] = useState([]);
  const [currentRegion, setCurrentRegion] = useState();
  const [region, setRegion] = useState(''); // Searchから
  const [mode, setMode] = useState('current'); // 表示モード

  const theme = createTheme({
    palette: {
      mode: 'light',
      text: {
        primary: '#ffffff',
        secondary: 'rgba(202, 175, 144, 0.6)',
        disabled: 'rgba(65,103,239,0.38)',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            color: '#ffffff',
          },
        },
      },
    },
  });

  useEffect(() => {
    // getCurrentWeather();

    try {
      fetch("https://ipapi.co/latlong").then(result => result.text()).then((result => {
        const [latitude, longitude] = result.split(',')
        fetchRegion(latitude, longitude);
      }))

    } catch (e) {
      console.error("No Geolocation");

    }

  }, []);



  // 現在地住所取得(Supabase Edge FunctionでCORS設定)
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
        const cityName = data.Feature[0].Property.AddressElement.find(element => element.Level === "city")?.Name ??
          data.Feature[0].Property.AddressElement[0].Name
        // console.log('address element city', cityName)
        if (cityName) {
          setCurrentRegion(cityName);
          fetchCurrentLocationWeather(cityName);
          fetchCurrentFivedaysWeather(cityName);
        } else {
          console.error(" from fetchRegion.");
        }
      })
      .catch(error => console.error('Error fetching region:', error));
  }

  // 現在地をもとにn8nで天気情報取得、DBに追加
  async function fetchCurrentLocationWeather(currentRegion) {
    try {
      // console.log("fetchCurrentLocationWeather called:", currentRegion);
      const response = await fetch('http://localhost:5678//webhook//fetch-currentlocation-weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('Nishida:Kvv5RXm7fhySPFh'),
        },
        body: JSON.stringify({ currentRegion }),
      });
      const data = await response.json();
      // console.log("Fetched current location weather data:", data);

      setCurrentWeather(data);

    } catch (error) {
      console.error("Error fetching current location weather:", error);
    }
  }
    // 現在地をもとにn8nで天気情報取得、DBに追加-Forecast
  async function fetchCurrentFivedaysWeather(currentRegion) {
    try {
      const response = await fetch('http://localhost:5678//webhook//fetch-currentlocation-weather-fivedays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('Nishida:Kvv5RXm7fhySPFh'),
        },
        body: JSON.stringify({ currentRegion }),
      });
      const data = await response.json();
      // console.log("Fetched current fivedays location weather data:", currentRegion, data);

      setCurrentForecast(data);
    } catch (error) {
      console.error("Error fetching current location weather:", error);
    }
  }

  // 検索された住所をもとにn8nで天気取得
  const fetchWeather = useCallback(async () => {
    try {
      const data = await fetch('http://localhost:5678//webhook//fetchweather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('Nishida:Kvv5RXm7fhySPFh'),
        },
        body: JSON.stringify({ region }),
      });

      const result = await data.json();

      // console.log("set searched location fetchWeather", region, result)
      setSearchedLocationWeather(prev => [...result, ...prev])

      setMode('search')
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }, [region])



  // 検索された住所をもとにn8nで天気取得-Forecast
  async function fetchFivedaysWeather(region) {
    try {
      const response = await fetch('http://localhost:5678//webhook//fetchweatherfivedays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('Nishida:Kvv5RXm7fhySPFh'),
        },
        body: JSON.stringify({ region }),
      });

      const result = await response.json();

      // console.log("fetch fivedays weather", region, result)
      setSearchedLocationForecast(prev => [...result, ...prev])
      setMode('search')
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }

  function searchForCity(region) {
    fetchWeather(region)
    fetchFivedaysWeather(region)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout
              region={region}
              setRegion={setRegion}
              fetchWeather={searchForCity}
              currentWeather={currentWeather}
              currentForecast={currentForecast}
              searchedLocationWeather={searchedLocationWeather}
              searchedLocationForecast={searchedLocationForecast}
              mode={mode}
              setMode={setMode}
              setSearchedLocationWeather={setSearchedLocationWeather}
              setSearchedLocationForecast={setSearchedLocationForecast}
            >
              <Main />
            </Layout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
