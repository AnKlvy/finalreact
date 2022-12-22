import React from "react";
import ReactDOM from "react-dom";

import { Divider, Avatar, Grid } from "@mui/joy";
import { Container, Paper } from "@mui/material";
import ScoreChanger from "./ScoreChanger";
import { auto } from "@popperjs/core";

// import "./styles.css";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export const Comment=({data}) =>{

  const { id, content, createdAt, score, replies, user } = data;
  const userName = user.username;

  return (
    <Container sx={{width:'60%'}}>
    <div style={{
    justifyContent:'center' }}>
      {/* <Paper sx={{ padding: "40px 20px" }}> */}
      
        <Grid style={{backgroundColor:'white',borderRadius:6}} container /* wrap="nowrap" */ spacing={2}>
          <Grid xs={'auto'} sx={{width:'30px'}}>
            <ScoreChanger onScore={score} />
          </Grid>
          <Grid xs={1}>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid xs>
<div>
            <h4 style={{ margin: 0, textAlign: "left" }}>{userName} </h4> <p style={{ textAlign: "left", color: "gray" }}>{createdAt}</p>
            </div>
            <p style={{ textAlign: "left" }}>
              {content}
            </p> 
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      
      {/* </Paper> */}
    </div>
    </Container>
  );
}

