import {useState, useContext} from 'react';
import {CommentContext} from './../commentContext'

import Grid from '@mui/material/Unstable_Grid2';

import { Box, Button, Avatar, Textarea} from '@mui/joy';


export default function TextareaValidator() {
  
  
  

  const {IMG} = useContext(CommentContext);
  return (
    <div style={{display:'flex', 
    justifyContent:'center'}}>
      
      <Grid container spacing={5} 
      sx = {{
        backgroundColor:'white', 
        borderRadius:6, 
        position:'fixed',
        bottom:'80px',
        width:'60%'
        }}>   
        <Grid xs zeroMinWidth>
        <Avatar
              src={IMG.juliusomo}
              variant="rounded"
              alt="user-avatar"
            />
        </Grid>
      <Grid xs={9} sx={{justifyContent:'left'}}>
      <Textarea
        placeholder="Add a comment..."
        minRows={3}
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              // gap: 'var(--Textarea-paddingBlock)',
              // pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
            
          </Box>
        }
        
        sx={{
          minWidth: 400,
          
          
        }}
      />
      </Grid>
      <Grid xs='auto'>
     
      <Button sx={{
        backgroundColor:'hsl(238, 40%, 52%)', 
        width:'110px', 
        height:'50px',
        fontSize:'18px'}}>SEND</Button>
    
      </Grid>
      </Grid>
    </div>
    
    
  );
}
