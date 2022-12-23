import { Chip } from "@mui/joy";
import {  } from "@mui/material";
import React from "react";

const YouTag = () => {
  return (
    
      <Chip
        label="you"
        variant="filled"
        size="small"
        sx={{
          backgroundColor: "hsl(238, 40%, 52%)",
          color: "#FFF",
          fontWeight: 500,
          borderRadius: "5px",
        }}
      />
  );
};

export default YouTag;
