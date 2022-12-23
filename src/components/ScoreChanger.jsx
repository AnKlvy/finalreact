import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {CommentContext} from "../commentContext";
import { IconButton } from "@mui/joy";

const ScoreChanger = ({ onScore }) => {
  
  const [score, setScore] = useState(onScore);

  const { comments } = useContext(CommentContext);
  return (
    <div>
      <IconButton sx={{}}
        // disableRipple
        aria-label="increase score"
        onClick={() => {
          setScore(score + 1);
        }}
      >
        <AddIcon sx={{ height: "20px", width: " 20px", color: "" }} />
      </IconButton>
      <Typography style={{ color: "hsl(238, 40%, 52%)", fontWeight: 500,textAlign: "center"}}>
        {score}
      </Typography>
      <IconButton
        // disableRipple
        aria-label="decrease score"
        onClick={() => {
          setScore(score - 1);
        }}
      >
        <RemoveIcon sx={{ height: "20px", width: " 20px", color: "" }} />
      </IconButton>
    </div>
  );
};

export default ScoreChanger;
