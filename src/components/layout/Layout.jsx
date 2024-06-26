import { Grid, Paper, Box, Container, CssBaseline } from "@mui/material";
import Search from "../Search";
import Main from "../Main";

const Layout = ({ region, setRegion, fetchWeather, currentWeather, searchedLocationWeather }) => {
  return (
    <>
      <CssBaseline />
      <Container sx={{ background: 'linear-gradient(to right, #a95c0a, #bf430b)', minHeight: '100vh', padding: 2 }}>
        <Search region={region} setRegion={setRegion} fetchWeather={fetchWeather}  />
        <Box bgcolor="transparent" p={2} flexGrow={1} color="white">
          Main Content
          <Box height="25vh" mb={4} textAlign='center'>
            <Main currentWeather={currentWeather} searchedLocationWeather={searchedLocationWeather}/>
          </Box>

          <Grid container spacing={4} textAlign='center'>
            <Grid item xs={4}>
              <Paper sx={{ height: 200, padding: 2, background: 'linear-gradient(to right, #a85a07, #bf430b)', color: 'white' }}>
                hourly
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{ height: 200, padding: 2, background: 'linear-gradient(to right, #a85a07, #bf430b)', color: 'white' }}>
                週間天気
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <Paper sx={{ height: 200, padding: 2, background: 'linear-gradient(to right, #a85a07, #bf430b)', color: 'white' }}>
                Another Paper Content
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Layout;
