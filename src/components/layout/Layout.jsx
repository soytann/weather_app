import { Grid, Paper, Box, Container } from "@mui/material";
import Header from "./Header";
import Search from "../Search";

const Layout = ({ props }) => {
  return (
    <>
      <Header />
      <Container >
      <Search />


        <Box bgcolor="white" p={2} flexGrow={1}>
          Main Content
          <Box height="25vh" bgcolor="pink" mb={4} textAlign='center'>{}</Box>

          <Grid container spacing={4} textAlign='center'>
            <Grid item xs={4}>
              <Paper style={{ height: 200, padding: 16 }}>hourly </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{ height: 200, padding: 16 }}>週間天気 </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: 16 }}>
            <Grid item xs={12}>
              <Paper style={{ height: 200, padding: 16 }}>Another Paper Content</Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Layout;
