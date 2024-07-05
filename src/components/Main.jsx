import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ReactAnimatedWeather from 'react-animated-weather';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { iconMapping, iconDefaults } from '../constants';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

const Main = ({ currentWeather, searchedLocationWeather, mode }) => {
  const [sunriseTime, setSunriseTime] = useState('');
  const [sunsetTime, setSunsetTime] = useState('');

  const weatherData = mode === "search" ? searchedLocationWeather[0] : currentWeather[0];

  useEffect(() => {
    if (weatherData && weatherData.sunrise && weatherData.sunset) {
      const sunriseTimestamp = weatherData.sunrise;
      const sunsetTimestamp = weatherData.sunset;

      setSunriseTime(convertUnixTimestampToTime(sunriseTimestamp));
      setSunsetTime(convertUnixTimestampToTime(sunsetTimestamp));
    } else {
      console.error("No sunset or sunrise data");
    }
  }, [weatherData]);


  function convertUnixTimestampToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // ミリ秒に変換
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  // データが存在するかどうかをチェック
  if (mode === 'current' && (!currentWeather || currentWeather.length === 0)) {
    return <p>No current weather data available</p>;
  }
  if (mode === 'search' && (!searchedLocationWeather || searchedLocationWeather.length === 0)) {
    return <p>No weather data available</p>;
  }

  const animatedIcon = iconMapping[weatherData.icon] ?? 'CLEAR_DAY';

  return (
    <>
      <h1>{weatherData.region},&nbsp;{weatherData.country}</h1>
      <ReactAnimatedWeather
        icon={animatedIcon}
        color={iconDefaults.color}
        size={iconDefaults.size}
        animate={iconDefaults.animate}
      />
      <h2>{Math.round(weatherData.temperature)}℃</h2>
      <h3>{weatherData.weather_description}</h3>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1,
        m: 1
      }}>
        <Box>
          <List sx={{ width: '50%', maxWidth: 360 }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WbSunnyRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Sunrise" secondary={sunriseTime} />
            </ListItem>
          </List>
        </Box>
        <Box>
          <List sx={{ width: '50%', maxWidth: 360 }}>
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
