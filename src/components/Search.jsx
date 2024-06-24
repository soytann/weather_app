import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from "@mui/material";

const Search = ({ region, setRegion, fetchWeather }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("サブミットされた:", region);
    fetchWeather(region)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSearch(e);
    }
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
        onSubmit={handleSearch}
      >
        <TextField
          id="standard-basic"
          label="region"
          variant="standard"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          onKeyDown={handleKeyDown}
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
