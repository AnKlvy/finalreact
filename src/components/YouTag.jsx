import {  } from "@mui/joy";
import { Chip } from "@mui/material";
import React from "react";

export const YouTag = () => {
  return (
    
      <Chip
        label="you"
        variant="filled"
        size="small"
        sx={{
          backgroundColor: "hsl(238, 40%, 52%)",
          color: "#FFF",
          fontWeight: 500,
          // borderRadius: "5px",
        }}
      />
  );
};


