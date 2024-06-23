import { useEffect, useState } from "react";
import { supabase } from "../utils/createClient";
import DashBoard from "./components/Search";
import Layout from "./components/layout/Layout";

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

function App() {
  const [current_weather, setCurrent_weather] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState();
  const [currentLongitude, setCurrentLongitude] = useState();
  const [currentRegion, setCurrentRegion] = useState();

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
//Search
  const [region, setRegion] = useState('');
  
  return (
    <>
      <Layout>
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
      </Layout>
    </>
  );
}

export default App;
