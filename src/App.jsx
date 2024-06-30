import { useEffect, useState } from "react";
import { supabase } from "../utils/createClient";
import Main from "./components/Main";
import Layout from "./components/layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import ReactAnimatedWeather from 'react-animated-weather';

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

function App() {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [searchedLocationWeather, setSearchedLocationWeather] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState();
  const [currentLongitude, setCurrentLongitude] = useState();
  const [currentRegion, setCurrentRegion] = useState();
  const [region, setRegion] = useState(''); // Searchから

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
            color: '#ffffff',
          },
        },
      },
    },
  });

  useEffect(() => {
    getCurrentWeather();
    getSearchedWeather();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error("No Geolocation");
    }
  }, []);

  // `searchedLocationWeather` ステートが更新されたときにログを出力
  useEffect(() => {
    console.log("searchedLocationWeather updated:", searchedLocationWeather);
  }, [searchedLocationWeather]);


  // 現在地取得するための緯度経度取得
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

  // 現在地から取得された天気情報をDBから取得
  async function getCurrentWeather() {
    const { data, error } = await supabase.from("current_weather").select();
    if (error) {
      console.error("Error fetching current weather:", error);
      return;
    }
    setCurrentWeather(data);
    console.log("Current weather data:", data);
  }

  // 検索して取得された天気情報をDBから取得
  async function getSearchedWeather() {
    console.log("getSearchedWeather 呼び出し")
    const { data, error } = await supabase.from("searched_location_weather").select();
    if (error) {
      console.error("Error fetching SEARCHED weather:", error);
      return;
    }
    setSearchedLocationWeather(data);
    console.log("Searched weather data:", data);
  };

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
        console.log(data.Feature[0].Property.AddressElement[0]
      )
        if (data && data.Feature && data.Feature[0] && data.Feature[0].Property && data.Feature[0].Property.Address) {
          setCurrentRegion(data.Feature[0].Property.Address);
          fetchCurrentLocationWeather(data.Feature[0].Property.Address);
        } else {
          console.error(" from fetchRegion.");
        }
      })
      .catch(error => console.error('Error fetching region:', error));
  }

  // 現在地をもとにn8nで天気情報取得、DBに追加
  async function fetchCurrentLocationWeather(currentRegion) {
    try {
      console.log("fetchCurrentLocationWeather called:", currentRegion);
      const response = await fetch('http://localhost:5678//webhook//fetch-currentlocation-weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('Nishida:Kvv5RXm7fhySPFh'),
        },
        body: JSON.stringify({ currentRegion }),
      });
      const data = await response.json();
      console.log("Fetched current location weather data:", data);
      getCurrentWeather();
    } catch (error) {
      console.error("Error fetching current location weather:", error);
    }
  }
  async function fetchCurrentFivedaysWeather(currentRegion) {
    try {
      console.log("fetchCurrentLocationWeather called:", currentRegion);
      const response = await fetch('http://localhost:5678//webhook//fetch-currentlocation-weather-fivedays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('Nishida:Kvv5RXm7fhySPFh'),
        },
        body: JSON.stringify({ currentRegion }),
      });
      const data = await response.json();
      console.log("Fetched current location weather data:", data);
      getCurrentWeather();
    } catch (error) {
      console.error("Error fetching current location weather:", error);
    }
  }

  // 検索された住所をもとにn8nで天気取得
  async function fetchWeather(region) {
    try {
      console.log("fetchWeather called:", region);
      const response = await fetch('http://localhost:5678//webhook//fetchweather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('Nishida:Kvv5RXm7fhySPFh'),
        },
        body: JSON.stringify({ region }),
      });
      const data = await response.json();
      console.log("Fetched weather data:", data);
      getSearchedWeather();

    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }
  // 検索された住所をもとにn8nで天気取得
  async function fetchFivedaysWeather(region) {
    try {
      console.log("fetch5daysWeather called:", region);
      const response = await fetch('http://localhost:5678//webhook//fetchweatherfivedays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('Nishida:Kvv5RXm7fhySPFh'),
        },
        body: JSON.stringify({ region }),
      });
      const data = await response.json();
      console.log("Fetched weather data:", data);
      getSearchedWeather();

    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout region={region} setRegion={setRegion} fetchWeather={fetchWeather} currentWeather={currentWeather} searchedLocationWeather={searchedLocationWeather} >
              <Main />
            </Layout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
