import { useContext, useState} from "react";
// import ReactDOM from "react-dom";

import { Avatar } from "@mui/joy";
import {  Container, Button,Stack,Divider, Typography, Grid } from "@mui/material";
import ScoreChanger from "./ScoreChanger";
import { Delete, Edit } from "@mui/icons-material";
import {YouTag} from "./YouTag";
import { CommentContext } from "../commentContext";
import {ConfirmDelete} from "./ConfirmDelete";
import { ModalDelete } from "./ModalDelete";
import RepliesSection from "./RepliesSection";
import replyArrow from "../images/icon-reply.svg";



export const Comment=({data}) =>{

  const { id, content, createdAt, score, replies, user } = data;
  const { IMG, deleteComment } = useContext(CommentContext);
  const userName = user.username; 
  const ava = IMG[`${userName}`];

  const [clicked, setClicked] = useState(false);
  const [editingComm, setEditingComm] = useState(false);
  const [commentText, setCommentText] = useState(content);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Container sx={{width:'60%'}}>
    <div style={{
    justifyContent:'center' }}>
      <div style={{height:'60px'}}></div>
      {/* <Paper sx={{ padding: "40px 20px" }}> */}
      {/* <ErrorBoundary> */}
      <ConfirmDelete onOpen={openModal} onClose={handleClose} id={id} />
      {/* </ErrorBoundary> */}
        <Grid style={{backgroundColor:'white',borderRadius:6}} container /* wrap="nowrap" */ spacing={4}>
          <Grid item xs={'auto'} sx={{width:'30px'}}>
            <ScoreChanger onScore={score} />
          </Grid>
          {/* <Grid  item xs={1}>
            <Avatar alt="juliusomo" src={ava} />
           
                  
          </Grid> */}
          <Grid item xs>

            {/* <Typography variant="h6" style={{display:'inline', margin: 0, textAlign: "left" }}>{userName} </Typography> 
            {userName === "juliusomo" &&  <YouTag />}
            <Typography style={{display:'inline', textAlign: "left", color: "hsl(211, 10%, 45%)" }}>{createdAt}</Typography>
            {userName === "juliusomo" ? (
                  // <Stack direction="row" spacing={1}>
                  <div style={{display:'inline', justifyContent:'right'}}>
                    
                    <button
                      
                      style={{
                        display:'inline',
                        border:'0px',
                        backgroundColor:'white',
                        color: "hsl(358, 79%, 66%)",
                        fontWeight: 500,
                        textTransform: "capitalize",
                        fontFamily:'https://fonts.google.com/specimen/Rubik'
                      }}
                      onClick={() => {
                        handleOpen();
                      }}
                    >
                      <Delete/>DELETE
                      
                    </button>
                    <button
                      // variant="text"
                      disabled={editingComm}
                      style={{
                      */}
                <Stack spacing={2} direction="row" alignItems="center">
                  <Avatar src={ava}></Avatar>
                  <Typography
                    fontWeight="bold"
                    sx={{ color: "neutral.darkBlue" }}
                  >
                    {userName}
                  </Typography>
                {userName === "juliusomo" && <YouTag />}
                  <Typography sx={{ color: "neutral.grayishBlue" }}>
                    {createdAt}
                  </Typography>
                </Stack>
                {userName === "juliusomo" ? (
                  <Stack direction="row" spacing={1}>
                    <Button
                      startIcon={<Delete />}
                      sx={{
                        color: "custom.softRed",
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                      onClick={() => {
                        handleOpen();
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="text"
                      disabled={editingComm}
                      sx={{
                        fontWeight: 500,
                        textTransform: "capitalize",
                        color: "custom.moderateBlue",
                      }}
                      startIcon={<Edit />}
                      onClick={() => setEditingComm(!editingComm)}
                    >
                      Edit
                    </Button>
                  </Stack>
                ) : (
                  <Button
                    onClick={() => {
                      setClicked(!clicked);
                    }}
                    variant="text"
                    sx={{
                      fontWeight: 500,
                      textTransform: "capitalize",
                      color: "custom.moderateBlue",
                    }}
                    startIcon={<img src={replyArrow} alt="reply sign" />}
                  >
                    Reply
                  </Button>
                )}
          
            <Typography style={{ textAlign: "left" }}>
              {content}
            </Typography> 
          </Grid>
          
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      
      {/* </Paper> */}
    </div>
    {replies && (
        <RepliesSection
          onReplies={replies}
          onClicked={clicked}
          onTar={userName}
        />
      )}
    </Container>
  );
}

