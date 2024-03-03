import React from "react";
import { Typography, AppBar, CssBaseline, Toolbar } from "@mui/material";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import allStyles from "../styles";

function NavBar() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <DinnerDiningIcon sx={allStyles.icon} />
          <Typography variant="h6">Recipe Book</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
