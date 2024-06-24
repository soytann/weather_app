import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";

const Search = ({ region, setRegion, fetchWeather }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(region)
  }
  


  return (
    <>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="都市名"
          variant="standard"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          onSubmit={handleSearch}
          InputProps={{ 
            endAdornment: (
              <InputAdornment position='end' >
                <SearchIcon/>
              </InputAdornment>
            )
           }}/>          {console.log(region)}
      </Box>


    </>
  );
}

export default Search;
