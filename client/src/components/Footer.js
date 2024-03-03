import React from "react";
import { Typography } from "@mui/material";

function Footer() {
  return (
    <>
      <footer>
        <Typography variant="h6" align="center" gutterBottom>
          Recipe Book
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Thank you for visiting this site.
        </Typography>
      </footer>
    </>
  );
}

export default Footer;
