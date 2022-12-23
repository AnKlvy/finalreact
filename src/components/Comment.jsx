import {useContext, useState} from "react";
import ReactDOM from "react-dom";

import { Avatar } from "@mui/joy";
import {  Container, Button,Stack,Divider, Grid, Typography } from "@mui/material";
import ScoreChanger from "./ScoreChanger";
import { Delete, Edit } from "@mui/icons-material";
import YouTag from "./YouTag";
import { CommentContext } from "../commentContext";

// import "./styles.css";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export const Comment=({data}) =>{

  const { id, content, createdAt, score, replies, user } = data;
  const { IMG } = useContext(CommentContext);
  const userName = user.username;
  const ava = IMG[`${userName}`];

  const [clicked, setClicked] = useState(false);
  const [editingComm, setEditingComm] = useState(false);
  const [commentText, setCommentText] = useState(content);
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container sx={{width:'60%'}}>
    <div style={{
    justifyContent:'center' }}>
      {/* <Paper sx={{ padding: "40px 20px" }}> */}
      
        <Grid style={{backgroundColor:'white',borderRadius:6}} container /* wrap="nowrap" */ spacing={4}>
          <Grid item xs={'auto'} sx={{width:'30px'}}>
            <ScoreChanger onScore={score} />
          </Grid>
          <Grid  item xs={1}>
            <Avatar alt="juliusomo" src={ava} />
            {userName === "juliusomo" && <YouTag />}
                  
          </Grid>
          <Grid item xs>
<div>
            <Typography variant="h6" style={{display:'inline', margin: 0, textAlign: "left" }}>{userName} </Typography> 
            <Typography style={{display:'inline', textAlign: "left", color: "hsl(211, 10%, 45%)" }}>{createdAt}</Typography>
            {userName === "juliusomo" ? (
                  // <Stack direction="row" spacing={1}>
                  <div style={{display:'inline', ml:'auto'}}>
                    <button
                      startIcon={<Delete />}
                      style={{
                        display:'inline',
                        // borderRadius:'5px',
                        color: "hsl(358, 79%, 66%)",
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                      onClick={() => {
                        handleOpen();
                      }}
                    >
                      Delete
                    </button>
                    <button
                      // variant="text"
                      disabled={editingComm}
                      style={{
                      /*   ml:'auto', */ display:'inline',
                        // borderRadius:'5px',
                        fontWeight: 500,
                        textTransform: "capitalize",
                        color: "hsl(238, 40%, 52%)",
                      }}
                      startIcon={<Edit />}
                      onClick={() => setEditingComm(!editingComm)}
                    >
                      Edit
                    </button>
                  </div>
                 
                ):<div></div>}
            </div>
            <Typography style={{ textAlign: "left" }}>
              {content}
            </Typography> 
          </Grid>
          
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      
      {/* </Paper> */}
    </div>
    </Container>
  );
}

