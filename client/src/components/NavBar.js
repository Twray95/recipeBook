import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  AppBar,
  CssBaseline,
  Toolbar,
  TextField,
  Button,
} from "@mui/material";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import allStyles from "../styles";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState({
    searchField: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextSearchTerm = {
      ...searchTerm,
      [name]: value,
    };
    setSearchTerm(nextSearchTerm);
    console.log(searchTerm);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" sx={{ display: "flex" }}>
        <Toolbar>
          <DinnerDiningIcon sx={allStyles.icon} />
          <Typography variant="h6">Recipe Book</Typography>
          <Link
            to="/results"
            state={{ searchName: `${searchTerm.searchField}` }}
          >
            <Button variant="primary" sx={{ marginLeft: "auto" }}>
              Search
            </Button>
          </Link>
          <TextField
            variant="outlined"
            label="Search Recipes"
            onChange={handleChange}
            name="searchField"
            value={searchTerm.searchField}
            sx={({ marginLeft: "auto" }, { width: 300 })}
          ></TextField>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
