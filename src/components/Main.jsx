import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ReactAnimatedWeather from 'react-animated-weather';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import Stack from '@mui/system/Stack';


const Main = ({ currentWeather, searchedLocationWeather }) => {
  const [sunriseTime, setSunriseTime] = useState('');
  const [sunsetTime, setSunsetTime] = useState('');

  useEffect(() => {
    const sunriseTimestamp = 1719775732;
    const sunsetTimestamp = 1719828060;

    setSunriseTime(convertUnixTimestampToTime(sunriseTimestamp));
    setSunsetTime(convertUnixTimestampToTime(sunsetTimestamp));
  }, []);

  function convertUnixTimestampToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // ミリ秒に変換
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  

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

      

      <Box sx={{ display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1 }}>


        <Box>
          <List sx={{ width: '50%', maxWidth: 360,  }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WbSunnyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Sunrise" secondary={sunriseTime} />
            </ListItem>
          </List>
        </Box>
        <Box>
          <List sx={{ width: '50%', maxWidth: 360,  }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WbTwilightIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Sunset" secondary={sunsetTime} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
}

export default Main;
