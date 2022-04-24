import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const CustomAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
        >
          To Do App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
