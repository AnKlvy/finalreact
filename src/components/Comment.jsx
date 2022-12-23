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

                <Stack spacing={2} direction="row" alignItems="center">
                  <Avatar src={ava}></Avatar>
                  <Typography
                    fontWeight="bold"
                    sx={{ color: "" }}
                  >
                    {userName}
                  </Typography>
                {userName === "juliusomo" && <YouTag />}
                  <Typography sx={{ color: "" }}>
                    {createdAt}
                  </Typography>
                </Stack>
                {userName === "juliusomo" ? (
                  <Stack direction="row" spacing={1}>
                    <Button
                      startIcon={<Delete />}
                      sx={{
                        color: "",
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
                        color: "",
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
                      color: "",
                    }}
                    startIcon={<img src={replyArrow} alt="reply sign" />}
                  >
                    Reply
                  </Button>
                )}
          
            <Typography style={{ textAlign: "left" }}>
              {content}
            </Typography> 
            <div style={{height:'40px'}}></div>
          </Grid>
          
        </Grid>
        
        <div style={{height:'20px'}}></div>
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

