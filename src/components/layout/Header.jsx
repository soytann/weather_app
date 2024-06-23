import { Box, Grid } from "@mui/material"

const Header = () => {
  return (
    <Grid item xs={12}>
    <Box
      width="100%"
        height="100px"
        padding={2}
      sx={{ backgroundColor: "lightblue", fontSize: "2.5rem", alignItems:"center"}}
    >
      header
    </Box>
  </Grid>
  )
}

export default Header